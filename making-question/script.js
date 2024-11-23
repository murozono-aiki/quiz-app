let questionData = JSON.parse(localStorage.getItem("data"));

const topPage = document.getElementById("top");
const questionPage = document.getElementById("questionList");
const editPage = document.getElementById("edit");
const coverElement = document.getElementById("cover");
const loadingElement = document.getElementById("loading");
const savingElement = document.getElementById("saving");

let currentQuestionIndex = parseInt(new URL(window.location.href).searchParams.get("questionIndex") || "-1");
let currentQuestionListName = "";
let currentQuestionListLength = 0;
let focusQuestionPageButton;
let topPageScroll = 0;
let questionPageScroll = 0;
let editSaved = true;

let questionListSorting = false;
let onQuestionButtonClick;
let sortQuestionRange = [];

function setTopPage() {
    requestAnimationFrame(() => {
        const list = [];
        for (let data of questionData) {
            const name = data[5].replace(/ #[0-9]+$/, "");
            if (name && !list.includes(name)) {
                list.push(name);
            }
        }
        list.sort();

        const parentElement = document.createElement('div');
        document.getElementById("topList").replaceWith(parentElement);
        parentElement.id = "topList";
        for (let i = 0; i < list.length; i++) {
            const name = list[i];
            const element = document.createElement('button');
            element.textContent = name;
            parentElement.appendChild(element);
            element.addEventListener('click', event => {
                coverElement.style.display = "";
                topPageScroll = window.scrollY;
                setQuestionListPage(name);
                topPage.style.display = "none";
                questionList.style.display = "";
                window.scrollTo(0, questionPageScroll);
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        coverElement.style.display = "none";
                    });
                }, 1);
            });
        }
    });
}
function setQuestionListPage(listName) {
    requestAnimationFrame(() => {
        currentQuestionListName = listName;
        document.getElementById("questionListPageName").textContent = currentQuestionListName;

        const list = [];
        currentQuestionListLength = 0;
        for (let i = 0; i < questionData.length; i++) {
            const questionIndex = i;
            const name = questionData[i][5].replace(/ #[0-9]+$/, "");
            const index = parseInt(questionData[i][5].split(" #").at(-1)) - 1;
            if (name == listName) {
                list[index] = {
                    sentence: questionData[i][0],
                    index: questionIndex
                };
                currentQuestionListLength++;
            }
        }

        const parentElement = document.createElement('div');
        document.getElementById("questionsList").replaceWith(parentElement);
        parentElement.id = "questionsList";
        let number = 1;
        for (let i = 0; i < list.length; i++) {
            if (!list[i]) continue;
            const sentence = list[i].sentence;
            const questionIndex = list[i].index;
            const element = document.createElement('button');
            const spanElement = document.createElement('span');
            spanElement.appendChild(document.createTextNode(number));
            element.appendChild(spanElement);
            element.appendChild(document.createTextNode(sentence));
            parentElement.appendChild(element);
            element.addEventListener('click', event => {
                if (!questionListSorting) {
                    coverElement.style.display = "";
                    questionPageScroll = window.scrollY;
                    focusQuestionPageButton = element;
                    setEditPage(questionIndex);
                    questionPage.style.display = "none";
                    editPage.style.display = "";
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            coverElement.style.display = "none";
                        });
                    }, 1);
                } else {
                    onQuestionButtonClick(questionIndex);
                }
            });
            if (currentQuestionIndex == questionIndex) focusQuestionPageButton = element;
            questionData[questionIndex][5] = listName + " #" + number;
            number++;
        }
    });
}
function setEditPage(questionIndex) {
    requestAnimationFrame(() => {
        const question = questionIndex >= 0 ? questionData[questionIndex] : ["", "", "", "", ""];
        currentQuestionIndex = questionIndex;
        document.getElementById("editPageName").textContent = (questionData[questionIndex] && questionData[questionIndex][5]) || (currentQuestionListName + " （新規）");
        
        document.getElementById("questionInput").value = question[0];
        document.getElementById("answer1Input").value = question[1];
        document.getElementById("answer2Input").value = question[2];
        const includeAnswers = question[3].split("/");
        const includeAnswersElement = document.createElement('div');
        document.getElementById("includeAnswersInputArea").replaceWith(includeAnswersElement);
        includeAnswersElement.id = "includeAnswersInputArea";
        for (let i = 0; i < includeAnswers.length; i++) {
            addIncludeAnswerInput().value = includeAnswers[i];
        }
        const notIncludeAnswers = question[4].split("/");
        const notIncludeAnswersElement = document.createElement('div');
        document.getElementById("notIncludeAnswersInputArea").replaceWith(notIncludeAnswersElement);
        notIncludeAnswersElement.id = "notIncludeAnswersInputArea";
        for (let i = 0; i < notIncludeAnswers.length; i++) {
            addNotIncludeAnswerInput().value = notIncludeAnswers[i];
        }

        checkEdit();
    });
}
function addIncludeAnswerInput() {
    const parentElement = document.getElementById("includeAnswersInputArea");

    const element = document.createElement('div');
    parentElement.appendChild(element);
    const input = document.createElement('input');
    element.appendChild(input);
    input.type = "text";
    input.className = "includeAnswer";
    input.pattern = "[^ ]*";
    input.addEventListener('input', checkEdit);
    const button = document.createElement('button');
    element.appendChild(button);
    button.textContent = "削除";
    button.addEventListener('click', event => {
        element.remove();
        checkEdit();
    });
    return input;
}
function addNotIncludeAnswerInput() {
    const parentElement = document.getElementById("notIncludeAnswersInputArea");

    const element = document.createElement('div');
    parentElement.appendChild(element);
    const input = document.createElement('input');
    element.appendChild(input);
    input.type = "text";
    input.className = "notIncludeAnswer";
    input.pattern = "[^ ]*";
    input.addEventListener('input', checkEdit);
    const button = document.createElement('button');
    element.appendChild(button);
    button.textContent = "削除";
    button.addEventListener('click', event => {
        element.remove();
        checkEdit();
    });
    return input;
}

function checkEdit() {
    const data = [];
    const pastData = currentQuestionIndex >= 0 ? questionData[currentQuestionIndex] : [];

    data[0] = document.getElementById("questionInput").value;
    data[1] = document.getElementById("answer1Input").value;
    data[2] = document.getElementById("answer2Input").value;
    data[3] = "";
    const includeAnswersElement = document.getElementsByClassName("includeAnswer");
    for (let i = 0; i < includeAnswersElement.length; i++) {
        const value = includeAnswersElement[i].value;
        if (value) {
            data[3] += value;
            if (i < includeAnswersElement.length - 1) {
                data[3] += "/";
            }
        }
    }
    data[4] = "";
    const notIncludeAnswersElement = document.getElementsByClassName("notIncludeAnswer");
    for (let i = 0; i < notIncludeAnswersElement.length; i++) {
        const value = notIncludeAnswersElement[i].value;
        if (value) {
            data[4] += value;
            if (i < notIncludeAnswersElement.length - 1) {
                data[4] += "/";
            }
        }
    }
    data[4] = data[4].replace(/\/+$/, "");
    
    if (data[0] != pastData[0] || data[1] != pastData[1] || data[2] != pastData[2] || data[3] != pastData[3] || data[4] != pastData[4]) {
        requestAnimationFrame(() => {
            document.getElementById("whetherSave").textContent = "未保存";
        });
        editSaved = false;
        return true;
    } else {
        requestAnimationFrame(() => {
            document.getElementById("whetherSave").textContent = "保存済";
        });
        editSaved = true;
        return false;
    }
}

document.getElementById("addIncludeAnswerInput").addEventListener('click', addIncludeAnswerInput);
document.getElementById("addNotIncludeAnswerInput").addEventListener('click', addNotIncludeAnswerInput);
document.getElementById("questionInput").addEventListener('input', checkEdit);
document.getElementById("answer1Input").addEventListener('input', checkEdit);
document.getElementById("answer2Input").addEventListener('input', checkEdit);
document.getElementById("saveChange").addEventListener('click', event => {
    event.preventDefault();

    const data = [];
    const pastData = currentQuestionIndex >= 0 ? questionData[currentQuestionIndex] : [];

    data[0] = document.getElementById("questionInput").value;
    data[1] = document.getElementById("answer1Input").value;
    data[2] = document.getElementById("answer2Input").value;
    data[3] = "";
    const includeAnswersElement = document.getElementsByClassName("includeAnswer");
    for (let i = 0; i < includeAnswersElement.length; i++) {
        const value = includeAnswersElement[i].value;
        if (value) {
            data[3] += value;
            if (i < includeAnswersElement.length - 1) {
                data[3] += "/";
            }
        }
    }
    data[4] = "";
    const notIncludeAnswersElement = document.getElementsByClassName("notIncludeAnswer");
    for (let i = 0; i < notIncludeAnswersElement.length; i++) {
        const value = notIncludeAnswersElement[i].value;
        if (value) {
            data[4] += value;
            if (i < notIncludeAnswersElement.length - 1) {
                data[4] += "/";
            }
        }
    }
    data[4] = data[4].replace(/\/+$/, "");
    
    if (data[0] != pastData[0] || data[1] != pastData[1] || data[2] != pastData[2] || data[3] != pastData[3] || data[4] != pastData[4]) {
        document.getElementById("whetherSave").textContent = "保存中";
        document.getElementById("saveChange").disabled = true;
        requestSetQuestion(data, currentQuestionIndex, currentQuestionListName, data => {
            document.getElementById("saveChange").disabled = false;
            questionData = data;
            setTopPage();
            setQuestionListPage(currentQuestionListName);
            if (currentQuestionIndex >= 0 && (questionData[currentQuestionIndex] && questionData[currentQuestionIndex][5])) {
                checkEdit();
                if (editSaved) {
                    coverElement.style.display = "";
                    editPage.style.display = "none";
                    questionPage.style.display = "";
                    if (focusQuestionPageButton) focusQuestionPageButton.focus();
                    currentQuestionIndex = -1;
                    window.scrollTo(0, questionPageScroll);
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            coverElement.style.display = "none";
                        });
                    }, 1);
                }
            } else if (currentQuestionIndex >= 0) {
                editPage.style.display = "none";
                topPage.style.display = "none";
                questionPage.style.display = "";
                currentQuestionIndex = -1;
                window.scrollTo(0, questionPageScroll);
            } else {
                editPage.style.display = "none";
                topPage.style.display = "none";
                questionPage.style.display = "";
                currentQuestionIndex = -1;
                requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight));
            }
        }, () => {
            document.getElementById("saveChange").disabled = false;
            checkEdit();
        })
        /*google.script.run.withSuccessHandler(data => {
            document.getElementById("saveChange").disabled = false;
            questionData = data;
            setTopPage();
            setQuestionListPage(currentQuestionListName);
            if (currentQuestionIndex >= 0 && (questionData[currentQuestionIndex] && questionData[currentQuestionIndex][5])) {
                checkEdit();
                if (editSaved) {
                    coverElement.style.display = "";
                    editPage.style.display = "none";
                    questionPage.style.display = "";
                    if (focusQuestionPageButton) focusQuestionPageButton.focus();
                    currentQuestionIndex = -1;
                    window.scrollTo(0, questionPageScroll);
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            coverElement.style.display = "none";
                        });
                    }, 1);
                }
            } else if (currentQuestionIndex >= 0) {
                editPage.style.display = "none";
                topPage.style.display = "none";
                questionPage.style.display = "";
                currentQuestionIndex = -1;
                window.scrollTo(0, questionPageScroll);
            } else {
                editPage.style.display = "none";
                topPage.style.display = "none";
                questionPage.style.display = "";
                currentQuestionIndex = -1;
                requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight));
            }
        }).withFailureHandler(error => {
            document.getElementById("saveChange").disabled = false;
            console.error(error.name + ": " + error.message);
            checkEdit();
        }).setQuestion(data, currentQuestionIndex, currentQuestionListName);*/
    }
});

// 問題の新規作成
document.getElementById("newQuestion").addEventListener('click', event => {
    setEditPage(-1);
    questionPage.style.display = "none";
    editPage.style.display = "";
    window.scrollTo(0, 0);
});
// 問題リストの新規作成
document.getElementById("newQuestionList").addEventListener('click', event => {
    document.getElementById("setNewQuestionListName").showModal();
});
document.getElementById("createQuestionList").addEventListener('click', event => {
    const questionListName = document.getElementById("questionListNameInput").value;
    if (questionListName) {
        document.getElementById("questionListNameInput").value = "";
        setQuestionListPage(questionListName);
        topPage.style.display = "none";
        questionPage.style.display = "";
    }
});
document.getElementById("cancelSettingQuestionList").addEventListener('click', event => {
    document.getElementById("setNewQuestionListName").close();
});

// 問題の並び替え
function decideSortStart(questionNumber) {
    sortQuestionRange[0] = parseInt(questionData[questionNumber][5].split(" #").at(-1));
    onQuestionButtonClick = decideSortEnd;
    document.getElementById("sortDialogMessage").textContent = "移動する範囲の終点となる問題をクリックしてください。（" + sortQuestionRange[0] + "～）";
}
function decideSortEnd(questionNumber) {
    sortQuestionRange[1] = parseInt(questionData[questionNumber][5].split(" #").at(-1));
    if (sortQuestionRange[0] > sortQuestionRange[1]) sortQuestionRange.push(sortQuestionRange.shift());
    onQuestionButtonClick = finishSort;
    document.getElementById("sort_last").style.display = "";
    document.getElementById("sortDialogMessage").textContent = "移動先の１つ後ろの問題をクリックしてください。（" + sortQuestionRange[0] + "～" + sortQuestionRange[1] + "を移動）";
}
function finishSort(questionNumber) {
    questionListSorting = false;
    document.getElementById("sortDialog").style.display = "none";
    document.getElementById("sort_last").style.display = "none";
    const sortPosition = questionNumber >= 0 ? parseInt(questionData[questionNumber][5].split(" #").at(-1)) : currentQuestionListLength + 1;
    if (sortPosition < sortQuestionRange[0] || sortQuestionRange[1] + 1 < sortPosition) {
        const sortQuestionLength = sortQuestionRange[1] - sortQuestionRange[0] + 1;
        const moveDistance = sortPosition > sortQuestionRange[0] ? sortPosition - sortQuestionRange[0] - 1 : sortPosition - sortQuestionRange[0];
        const orderData = [];
        for (let i = 0; i < questionData.length; i++) {
            if (questionData[i][5].replace(/ #[0-9]+$/, "") == currentQuestionListName) {
                const number = parseInt(questionData[i][5].split(" #").at(-1));
                if (sortQuestionRange[0] <= number && number <= sortQuestionRange[1]) {    // 移動する問題のとき
                    orderData[i] = [currentQuestionListName + " #" + (number + moveDistance)];
                } else {    // 移動しない問題のとき
                    if (number < sortQuestionRange[0] && number < sortPosition) {
                        orderData[i] = [currentQuestionListName + " #" + number];
                    } else if (number > sortQuestionRange[1] && number > sortPosition) {
                        orderData[i] = [currentQuestionListName + " #" + number];
                    } else if (sortPosition <= number && number < sortQuestionRange[0]) {
                        orderData[i] = [currentQuestionListName + " #" + (number + sortQuestionLength)];
                    } else if (sortQuestionRange[1] < number && number < sortPosition) {
                        orderData[i] = [currentQuestionListName + " #" + (number - sortQuestionLength)];
                    }
                }
            }
        }
        loadingElement.style.display = "";
        savingElement.style.display = "";
        requestSetOrder(orderData, data => {
            questionData = data;
            setQuestionListPage(currentQuestionListName);
            loadingElement.style.display = "none";
            savingElement.style.display = "none";
        }, () => {
            alert("変更に失敗しました。");
            loadingElement.style.display = "none";
            savingElement.style.display = "none";
        })
        /*google.script.run.withSuccessHandler(data => {
            questionData = data;
            setQuestionListPage(currentQuestionListName);
            loadingElement.style.display = "none";
            savingElement.style.display = "none";
        }).withFailureHandler(error => {
            console.error(error.name + ": " + error.message);
            alert("変更に失敗しました。");
            loadingElement.style.display = "none";
            savingElement.style.display = "none";
        }).setOrder(orderData);*/
    }
    document.getElementById("returnToTop").disabled = false;
    document.getElementById("editOrder").disabled = false;
    document.getElementById("newQuestion").disabled = false;
}
document.getElementById("editOrder").addEventListener('click', event => {
    questionListSorting = true;
    onQuestionButtonClick = decideSortStart;

    document.getElementById("returnToTop").disabled = true;
    document.getElementById("editOrder").disabled = true;
    document.getElementById("newQuestion").disabled = true;

    document.getElementById("sortDialogMessage").textContent = "移動する範囲の起点となる問題をクリックしてください。";
    document.getElementById("sortDialog").style.display = "";
});
document.getElementById("cancelSort").addEventListener('click', event => {
    questionListSorting = false;

    document.getElementById("returnToTop").disabled = false;
    document.getElementById("editOrder").disabled = false;
    document.getElementById("newQuestion").disabled = false;

    document.getElementById("sortDialog").style.display = "none";
    document.getElementById("sort_last").style.display = "none";
});
document.getElementById("sort_last").addEventListener('click', event => {
    if (questionListSorting) onQuestionButtonClick(-1);
});
document.getElementById("sortDialog").style.display = "none";
document.getElementById("sort_last").style.display = "none";

// 戻る
document.getElementById("returnToTop").addEventListener('click', event => {
    coverElement.style.display = "";
    questionPageScroll = 0;
    questionPage.style.display = "none";
    topPage.style.display = "";
    window.scrollTo(0, topPageScroll);
    setTimeout(() => {
        requestAnimationFrame(() => {
            coverElement.style.display = "none";
        });
    }, 1);
});
document.getElementById("returnToQuestionList").addEventListener('click', event => {
    if (editSaved || confirm("保存されていない変更があります。\n変更を破棄しますか。")) {
        coverElement.style.display = "";
        editPage.style.display = "none";
        questionPage.style.display = "";
        if (focusQuestionPageButton) focusQuestionPageButton.focus();
        currentQuestionIndex = -1;
        window.scrollTo(0, questionPageScroll);
        setTimeout(() => {
            requestAnimationFrame(() => {
                coverElement.style.display = "none";
            });
        }, 1);
    }
});

savingElement.style.display = "none";
loadingElement.style.display = "none";
requestGetAllQuestionData(data => {
    questionData = data;

    if (currentQuestionIndex < 0) {
        questionPage.style.display = "none";
        editPage.style.display = "none";
        setTopPage();
    } else {
        topPage.style.display = "none";
        questionPage.style.display = "none";
        setTopPage();
        setQuestionListPage(questionData[currentQuestionIndex][5].replace(/ #[0-9]+$/, ""));
        setEditPage(currentQuestionIndex);
    }
    setTimeout(() => {
        requestAnimationFrame(() => {
            coverElement.style.display = "none";
        });
    }, 1);
})


async function request(successHandler, failureHandler, method = "GET", body = undefined, parameters = "") {
    const url = "https://script.google.com/macros/s/AKfycbxt6H7saDD4cD68IO-eYayjLcrJZMDNvQ-B8digshDX-K0oisBuXVnoRz2rGNeE3Cl_dQ/exec" + parameters;

    const response = await fetch(url, {method: method, body: body, headers: new Headers({"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"})});
    if (!response.ok) {
        if (failureHandler) failureHandler();
        throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const json = await response.json();
    if (successHandler) successHandler(json);
}

function requestGetAllQuestionData(successHandler = undefined, failureHandler = undefined) {
    request(successHandler, failureHandler, "GET", undefined, "?option=Only-Question");
}
function requestSetQuestion(data, questionIndex, questionListName, successHandler = undefined, failureHandler = undefined) {
    request(successHandler, failureHandler, "POST", JSON.stringify({method:"setQuestion", parameters:[data, questionIndex, questionListName]}))
}
function requestSetOrder(data, successHandler = undefined, failureHandler = undefined) {
    request(successHandler, failureHandler, "POST", JSON.stringify({method:"setOrder", parameters:[data]}))
}