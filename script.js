let questionData;
let sameChars;
let notNextChars;

const hiragana = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "が", "ぎ", "ぐ", "げ", "ご",
  "さ", "し", "す", "せ", "そ",
  "ざ", "じ", "ず", "ぜ", "ぞ",
  "た", "ち", "つ", "て", "と", "っ",
  "だ", "ぢ", "づ", "で", "ど",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ば", "び", "ぶ", "べ", "ぼ",
  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
  "ま", "み", "む", "め", "も",
  "や", "ゆ", "よ", "ゃ", "ゅ", "ょ",
  "ら", "り", "る", "れ", "ろ",
  "わ", "を", "ん"
];
const katakana = [
  "ア", "イ", "ウ", "エ", "オ", "ヴ",
  "ァ", "ィ", "ゥ", "ェ", "ォ",
  "カ", "キ", "ク", "ケ", "コ",
  "ガ", "ギ", "グ", "ゲ", "ゴ",
  "サ", "シ", "ス", "セ", "ソ",
  "ザ", "ジ", "ズ", "ゼ", "ゾ",
  "タ", "チ", "ツ", "テ", "ト", "ッ",
  "ダ", "ヂ", "ヅ", "デ", "ド",
  "ナ", "ニ", "ヌ", "ネ", "ノ",
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "バ", "ビ", "ブ", "ベ", "ボ",
  "パ", "ピ", "プ", "ペ", "ポ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ユ", "ヨ", "ャ", "ュ", "ョ",
  "ラ", "リ", "ル", "レ", "ロ",
  "ワ", "ヲ", "ン", "ー"
];
const alphabet_small = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const alphabet_large = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
// 特殊
const hiragana_old = [
  "あ", "う", "お",
  "か", "き", "く", "け", "こ",
  "が", "ぎ", "ぐ", "げ", "ご",
  "さ", "し", "す", "せ", "そ",
  "ざ", "じ", "ず", "ぜ", "ぞ",
  "た", "ち", "つ", "て", "と", "っ",
  "だ", "ぢ", "づ", "で", "ど",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ば", "び", "ぶ", "べ", "ぼ",
  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
  "ま", "み", "む", "め", "も",
  "や", "ゐ", "ゆ", "ゑ", "よ", "ゃ", "ゅ", "ょ",
  "ら", "り", "る", "れ", "ろ",
  "わ", "を", "ん"
];
const katakana_old = [
  "ア", "ウ", "オ",
  "カ", "キ", "ク", "ケ", "コ",
  "ガ", "ギ", "グ", "ゲ", "ゴ",
  "サ", "シ", "ス", "セ", "ソ",
  "ザ", "ジ", "ズ", "ゼ", "ゾ",
  "タ", "チ", "ツ", "テ", "ト", "ッ",
  "ダ", "ヂ", "ヅ", "デ", "ド",
  "ナ", "ニ", "ヌ", "ネ", "ノ",
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "バ", "ビ", "ブ", "ベ", "ボ",
  "パ", "ピ", "プ", "ペ", "ポ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ヰ", "ユ", "ヱ", "ヨ", "ャ", "ュ", "ョ",
  "ラ", "リ", "ル", "レ", "ロ",
  "ワ", "ヲ", "ン"
];
// 別の文字に変換する文字
const convert = [
  ["あ", "ア"], ["い", "イ"], ["う", "ウ"], ["え", "エ"], ["お", "オ"],
  ["か", "カ"], ["き", "キ"], ["く", "ク"], ["け", "ケ"], ["こ", "コ"],
  ["が", "ガ"], ["ぎ", "ギ"], ["ぐ", "グ"], ["げ", "ゲ"], ["ご", "ゴ"],
  ["さ", "サ"], ["し", "シ"], ["す", "ス"], ["せ", "セ"], ["そ", "ソ"],
  ["ざ", "ザ"], ["じ", "ジ"], ["ず", "ズ"], ["ぜ", "ゼ"], ["ぞ", "ゾ"],
  ["た", "タ"], ["ち", "チ"], ["つ", "ツ"], ["て", "テ"], ["と", "ト"], ["っ", "ッ"],
  ["だ", "ダ"], ["ぢ", "ヂ"], ["づ", "ヅ"], ["で", "デ"], ["ど", "ド"],
  ["な", "ナ"], ["に", "ニ"], ["ぬ", "ヌ"], ["ね", "ネ"], ["の", "ノ"],
  ["は", "ハ"], ["ひ", "ヒ"], ["ふ", "フ"], ["へ", "ヘ"], ["ほ", "ホ"],
  ["ば", "バ"], ["び", "ビ"], ["ぶ", "ブ"], ["べ", "ベ"], ["ぼ", "ボ"],
  ["ぱ", "パ"], ["ぴ", "ピ"], ["ぷ", "プ"], ["ぺ", "ペ"], ["ぽ", "ポ"],
  ["ま", "マ"], ["み", "ミ"], ["む", "ム"], ["め", "メ"], ["も", "モ"],
  ["や", "ヤ"], ["ゐ", "ヰ"], ["ゆ", "ユ"], ["ゑ", "ヱ"], ["よ", "ヨ"], ["ゃ", "ャ"], ["ゅ", "ュ"], ["ょ", "ョ"],
  ["ら", "ラ"], ["り", "リ"], ["る", "ル"], ["れ", "レ"], ["ろ", "ロ"],
  ["わ", "ワ"], ["を", "ヲ"], ["ん", "ン"]
]
// 前の文字を参考にする文字
const symbols = ["ー", "-", "＝", "=", "・"];

    
const questionElement = document.getElementById("question");  // 問題を表示する要素
const answer1Element = document.getElementById("answer1");  // 解答を表示する要素
const answer2Element = document.getElementById("answer2");  // 解答（答えるとき）を表示する要素
const countdownElement = document.getElementById("countdown");  // プログレスバー
const countdownLabelElement = document.getElementById("countdown_label");  // プログレスバーの横の数字を表示する要素
const answerButton = document.getElementById("answer_button");  // 解答の入力を開始するボタン
const answerInputElement = document.getElementById("answer_input_cover");  // 解答入力欄
const answerInputShowElement = document.getElementById("answer_input_write");  // 入力された解答を表示する要素
const answerInputButton1 = document.getElementById("button1");  // 解答を入力するボタン1
const answerInputButton2 = document.getElementById("button2");  // 解答を入力するボタン2
const answerInputButton3 = document.getElementById("button3");  // 解答を入力するボタン3
const answerInputButton4 = document.getElementById("button4");  // 解答を入力するボタン4
const answerInputButton5 = document.getElementById("button5");  // 解答を入力するボタン5
const answerInputButton6 = document.getElementById("button6");  // 解答を入力するボタン6
const answerInputButton7 = document.getElementById("button7");  // 解答を入力するボタン7
const answerInputButton8 = document.getElementById("button8");  // 解答を入力するボタン8
const inputCountdownElement = document.getElementById("inputCountdown");  // 解答入力の際のカウントダウン
const correctElement = document.getElementById("correct");  // 正解のときの要素
const incorrectElement = document.getElementById("incorrect");  // 不正解のときの要素
const nextQuestionButton = document.getElementById("next_question");  // 次の問題を出題するボタン
const stopElement = document.getElementById("stopProcess");  // 一時停止ボタン
const startElement = document.getElementById("startProcess");  // 再開ボタン
let nowQuestion;  // 現在の問題（配列）
let nowShowWordCount = 0;  // 現在の問題の表示文字数
let countdown = 700;  // カウントダウンの秒数(100が1秒)
let intervalId;  // インターバルのid
let inputCountdown = 500;  // 解答入力のカウントダウンの秒数(100が1秒)
let inputIntervalId;  // 解答入力のインターバルのid
let continueProcess = true;  // カウントダウンを継続するか
let is_active = true; // 一時停止されていないか
let inputAnswer = "";  // 入力された解答
let inputAnswerCount = 0;  // 入力された解答の文字数
let inputtingAnswer = false;  // 解答の入力受付中かどうか
let answerButtonIndex = [0, 1, 2, 3];  // ボタンと選択肢の対応
let answerChoise = [];  // 解答の選択肢
let nowQuestionIndex;  // 現在の問題のインデックス
let lastQuestionIndex = [];  // 前回の問題のインデックス
let record = [];  // 正答数、出題数の記録
let record_session = [];  // 現在のセッションにおける正答数、出題数、前回出されてからの他の問題の出題数の記録

function main() {

  function getQuestionIndex() {
    let questionIndexList = [];

    let average = 0;
    for (let i = 0; i < questionData.length; i++) {
      average += questionData[i][7] || 0;
    }
    average = average / questionData.length;

    for (let i = 0; i < questionData.length; i++) {
      if (record_session[i]) {
        const rate_session = record_session[i][0] / record_session[i][1];
        if (rate_session < 0.7) {
          if (record_session[i][2] >=  (rate_session * 8) + 4) {
            return i;
          }
        }
      }

      if (questionData.length > lastQuestionIndex.length && lastQuestionIndex.includes(i)) continue;

      questionIndexList.push(i);
      let loopIndex_average = (average - questionData[i][7]) * 8/*問題の出やすさ*/;
      for (let j = 0; j < loopIndex_average; j++) {
        questionIndexList.push(i);
      }


      const correct = questionData[i][6] || 0;
      const total = questionData[i][7] || 0;

      const rate = (correct + 2) / (total + 3);

      let loopIndex_rate = Math.floor(((1 / rate) - 1) * 0.5/*問題の出やすさ*/);
      for (let j = 0; j < loopIndex_rate; j++) {
        questionIndexList.push(i);
      }
    }
    return questionIndexList[Math.floor(Math.random() * questionIndexList.length)];
  }

  function getChoice(questionData) {
    const numberOfChoice = 8;

    let correctAnswer = questionData[2];
    let includeAnswers = questionData[3].split("/");
    let notIncludeAnswers = questionData[4].split("/");

    // 正答を変換
    for (let convertString of convert) {
      correctAnswer = correctAnswer.replaceAll(convertString[0], convertString[1]);
      for (let i = 0; i < includeAnswers.length; i++) {
        includeAnswers[i] = includeAnswers[i].replaceAll(convertString[0], convertString[1]);
      }
      for (let i = 0; i < notIncludeAnswers.length; i++) {
        notIncludeAnswers[i] = notIncludeAnswers[i].replaceAll(convertString[0], convertString[1]);
      }
    }

    let result = [];
    for (let i = 0; i < correctAnswer.length; i++) {
      let correctChar = correctAnswer.slice(i, i + 1);
      let includeChars = [];
      let notIncludeChars = [];
      let choice = [correctChar];

      for (let includeAnswer of includeAnswers) {
        const char = includeAnswer.slice(i, i + 1);
        if (char != correctChar && !includeAnswers.includes(char) && char) includeChars.push(char);
      }
      for (let notIncludeAnswer of notIncludeAnswers) {
        const char = notIncludeAnswer.slice(i, i + 1);
        if (char != correctChar && !notIncludeChars.includes(char) && char) notIncludeChars.push(char);
      }

      while (choice.length < numberOfChoice) {
        if (includeChars.length == 0) break;
        const char = includeChars.splice(Math.floor(Math.random() * includeChars.length), 1)[0];
        if (!choice.includes(char) && !notIncludeChars.includes(char)) {
          choice.push(char);
        }
      }

      if (choice.length < numberOfChoice) {
        let chooseChars = [];
        for (let char of choice) {
          if (symbols.includes(char)) char = result[i - 1][0];

          if (hiragana.includes(char))  chooseChars = chooseChars.concat(hiragana);
          if (katakana.includes(char))  chooseChars = chooseChars.concat(katakana);
          if (alphabet_small.includes(char))  chooseChars = chooseChars.concat(alphabet_small);
          if (alphabet_large.includes(char))  chooseChars = chooseChars.concat(alphabet_large);
          if (number.includes(char))  chooseChars = chooseChars.concat(number);
          // 特殊
          if (chooseChars.length == 0) {
            if (hiragana_old.includes(char))  chooseChars = chooseChars.concat(hiragana_old);
            else if (katakana_old.includes(char))  chooseChars = chooseChars.concat(katakana_old);
          }
        }
        if (chooseChars.length == 0) {
          chooseChars = chooseChars.concat(hiragana);
          chooseChars = chooseChars.concat(katakana);
          chooseChars = chooseChars.concat(alphabet_small);
          chooseChars = chooseChars.concat(alphabet_large);
          chooseChars = chooseChars.concat(number);
        }

        notIncludeChars = notIncludeChars.concat(choice);
        for (let char of choice) {
          for (let sameChar of sameChars) {
            if (sameChar[0].includes(char)) {
              notIncludeChars = notIncludeChars.concat(sameChar[0].split(""));
            }
          }
        }
        if (i > 0) {
          for (let notNextChar of notNextChars) {
            if (notNextChar[0] == result[i - 1][0]) {
              notIncludeChars = notIncludeChars.concat(notNextChar[1].split(""));
            }
          }
        } else {
          for (let notNextChar of notNextChars) {
            if (notNextChar[0] == "（始め）") {
              notIncludeChars = notIncludeChars.concat(notNextChar[1].split(""));
            }
          }
        }

        chooseChars = chooseChars.filter(item => !notIncludeChars.includes(item));

        while (choice.length < numberOfChoice) {
          const char = chooseChars[Math.floor(Math.random() * chooseChars.length)];
          chooseChars = chooseChars.filter(item => char != item);
          for (let sameChar of sameChars) {
            if (sameChar[0].includes(char)) {
              chooseChars = chooseChars.filter(item => !sameChar[0].includes(item));
            }
          }
          choice.push(char);
        }
      }

      for (let j = 0; j < includeAnswers.length; j++) {
        if (includeAnswers[j].slice(i, i + 1) != correctChar) {
          includeAnswers.splice(j, 1);
          j--;
        }
      }
      for (let j = 0; j < notIncludeAnswers.length; j++) {
        if (notIncludeAnswers[j].slice(i, i + 1) != correctChar) {
          notIncludeAnswers.splice(j, 1);
          j--;
        }
      }
      result.push(choice);
    }
    return result;
  }



  // 初期値へ
  questionElement.innerHTML = "";
  answer1Element.textContent = "";
  answer2Element.textContent = "";
  nowShowWordCount = 0;
  countdown = 700;
  countdownElement.value = "700";
  countdownLabelElement.textContent = "7.00";
  inputCountdown = 500;
  inputCountdownElement.textContent = "5";
  inputCountdownElement.style.color = "green";
  nowQuestionIndex = getQuestionIndex();
  nowQuestion = questionData[nowQuestionIndex];
  inputAnswer = "";
  inputAnswerCount = 0;
  answerChoise = getChoice(nowQuestion);
  answerInputElement.style.display = "none";
  answerInputShowElement.textContent = "";
  answerButton.style.display = "";
  nextQuestionButton.style.display = "none";

  lastQuestionIndex.push(nowQuestionIndex);
  if (lastQuestionIndex.length > 20) lastQuestionIndex.shift();

  document.getElementById("makingQuestionLink").href = "https://script.google.com/macros/s/AKfycbxt6H7saDD4cD68IO-eYayjLcrJZMDNvQ-B8digshDX-K0oisBuXVnoRz2rGNeE3Cl_dQ/exec?page=makingQuestion&questionIndex=" + questionData[nowQuestionIndex][8];

  let requestID = 0;
  intervalId = setInterval(() => {
    if (continueProcess && document.visibilityState == "visible") {
      if (nowShowWordCount < nowQuestion[0].length) {
        const text = nowQuestion[0].slice(0, ++nowShowWordCount);
        requestAnimationFrame(() => questionElement.textContent = text);
      } else {
        clearInterval(intervalId);  // 問題の表示終了

        intervalId = setInterval(() => {
          if (continueProcess && document.visibilityState == "visible") {
            countdown--;
            if (countdown >= 0) {
              requestID = requestAnimationFrame(() => {
                cancelAnimationFrame(requestID);
                const countdownString = countdown.toString();
                countdownElement.value = countdownString;
                const countdownLabelString = "0".repeat(3 - countdownString.length) + countdownString;
                countdown_label.textContent = countdownLabelString.slice(0, 1) + "." + countdownLabelString.slice(1, 3);
              });
            } else {
              countdown = 0;
              // 不正解
              clearInterval(intervalId);
              /*inputAnswerCount = answerChoise.length;

              requestAnimationFrame(() => {
                incorrectElement.style.display = "";
              });
              setRecord(nowQuestionIndex, false);

              setTimeout(() => {
                requestAnimationFrame(() => {
                  incorrectElement.style.display = "none";
                });

                answer1Element.textContent = nowQuestion[1];
                answer2Element.textContent = nowQuestion[2];

                answerButton.style.display = "none";
                nextQuestionButton.style.display = "";
                nextQuestionButton.addEventListener('click', main_event);
              }, 2000);*/
            }
          }
        }, 10);
      }
    }
  }, 170);
}

function main_event(event) {
  event.target.removeEventListener('click', main_event);
  main();
}

function setRecord(questionIndex_onData, correct) {
  const questionIndex = questionData[questionIndex_onData][8];

  if (!record[questionIndex]) record[questionIndex] = [0, 0];
  record[questionIndex][1] += 1;
  if (correct) record[questionIndex][0] += 1;

  if (!record_session[questionIndex_onData]) record_session[questionIndex_onData] = [0, 0, 0];
  record_session[questionIndex_onData][1] += 1;
  if (correct) record_session[questionIndex_onData][0] += 1;
  for (let i = 0; i < record_session.length; i++) {
    if (record_session[i]) record_session[i][2]++;
  }
  record_session[questionIndex_onData][2] = 0;

  if (!questionData[questionIndex_onData][6]) questionData[questionIndex_onData][6] = 0;
  if (!questionData[questionIndex_onData][7]) questionData[questionIndex_onData][7] = 0;
  questionData[questionIndex_onData][7] += 1;
  if (correct) questionData[questionIndex_onData][6] += 1;
}

function getRandomAnswerButtonIndex() {
  let result = [];
  let array = [0, 1, 2, 3, 4, 5, 6, 7];
  while (array.length > 0) {
    result.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
  }
  if (inputAnswerCount >= 1) {
    for (let i = 0; i < result.length; i++) {
      if (answerChoise[inputAnswerCount][result[i]] == answerChoise[inputAnswerCount - 1][answerButtonIndex[i]] || (result[i] == 0 && answerButtonIndex[i] == 0)) {
        const indexCoice = [];
        for (let index of result) {
          if ((answerChoise[inputAnswerCount][result[i]] != answerChoise[inputAnswerCount - 1][answerButtonIndex[index]] && answerChoise[inputAnswerCount][result[index]] != answerChoise[inputAnswerCount - 1][answerButtonIndex[i]]) && (result[i] != 0 || answerButtonIndex[index] != 0)) {
            indexCoice.push(index);
          }
        }
        let replaceIndex = indexCoice[Math.floor(Math.random() * indexCoice.length)];
        if (replaceIndex >= result.length) replaceIndex = 0;

        let temp = result[replaceIndex];
        result[replaceIndex] = result[i];
        result[i] = temp;
      }
    }
  }
  return result;
}
function settingAnswerInputButton() {
  inputtingAnswer = true;
  answerButtonIndex = getRandomAnswerButtonIndex();
  answerInputButton1.textContent = answerChoise[inputAnswerCount][answerButtonIndex[0]];
  answerInputButton2.textContent = answerChoise[inputAnswerCount][answerButtonIndex[1]];
  answerInputButton3.textContent = answerChoise[inputAnswerCount][answerButtonIndex[2]];
  answerInputButton4.textContent = answerChoise[inputAnswerCount][answerButtonIndex[3]];
  answerInputButton5.textContent = answerChoise[inputAnswerCount][answerButtonIndex[4]];
  answerInputButton6.textContent = answerChoise[inputAnswerCount][answerButtonIndex[5]];
  answerInputButton7.textContent = answerChoise[inputAnswerCount][answerButtonIndex[6]];
  answerInputButton8.textContent = answerChoise[inputAnswerCount][answerButtonIndex[7]];

  answerInputButton1.disabled = true;
  answerInputButton2.disabled = true;
  answerInputButton3.disabled = true;
  answerInputButton4.disabled = true;
  answerInputButton5.disabled = true;
  answerInputButton6.disabled = true;
  answerInputButton7.disabled = true;
  answerInputButton8.disabled = true;

  setTimeout(() => {
    answerInputButton1.disabled = false;
    answerInputButton2.disabled = false;
    answerInputButton3.disabled = false;
    answerInputButton4.disabled = false;
    answerInputButton5.disabled = false;
    answerInputButton6.disabled = false;
    answerInputButton7.disabled = false;
    answerInputButton8.disabled = false;
  }, 300);

  inputCountdown = 500;
  inputCountdownElement.textContent = "5";
  inputIntervalId = setInterval(() => {
    inputCountdown--;
    inputCountdownElement.textContent = Math.ceil(inputCountdown / 100).toString();
    if (inputCountdown > 400) {
      inputCountdownElement.style.color = "purple";
    } else if (inputCountdown > 300) {
      inputCountdownElement.style.color = "green";
    } else if (inputCountdown > 200) {
      inputCountdownElement.style.color = "blue";
    } else if (inputCountdown > 100) {
      inputCountdownElement.style.color = "orange";
    } else {
      inputCountdownElement.style.color = "red";
    }

    if (inputCountdown <= 0) {
      // 不正解
      inputtingAnswer = false;
      clearInterval(inputIntervalId);
      clearInterval(intervalId);
      continueProcess = true;
      inputAnswerCount = answerChoise.length;

      button1.disabled = true;
      button2.disabled = true;
      button3.disabled = true;
      button4.disabled = true;
      button5.disabled = true;
      button6.disabled = true;
      button7.disabled = true;
      button8.disabled = true;

      requestAnimationFrame(() => {
        incorrectElement.style.display = "";
      });
      setRecord(nowQuestionIndex, false);

      setTimeout(() => {
        requestAnimationFrame(() => {
          incorrectElement.style.display = "none";
          answerInputElement.style.display = "none";
        });
        button1.disabled = false;
        button2.disabled = false;
        button3.disabled = false;
        button4.disabled = false;
        button5.disabled = false;
        button6.disabled = false;
        button7.disabled = false;
        button8.disabled = false;

        intervalId = setInterval(() => {
          if (nowShowWordCount < nowQuestion[0].length) {
            const text = nowQuestion[0].slice(0, ++nowShowWordCount);
            questionElement.textContent = text;
          } else {
            clearInterval(intervalId);  // 問題の表示終了

            setTimeout(() => {
              answer1Element.textContent = nowQuestion[1];
              answer2Element.textContent = nowQuestion[2];

              answerButton.style.display = "none";
              nextQuestionButton.style.display = "";
              nextQuestionButton.addEventListener('click', main_event);
            }, 300);
          }
        }, 50);
      }, 2000);

      answerInputElement.style.display = "none";
    }
  }, 10)
}
function onAnswerButtonClick() {
  if (continueProcess && inputAnswerCount < answerChoise.length) {
    continueProcess = false;
    answerInputElement.style.display = "";
    settingAnswerInputButton();
  }
}
function onAnswerInputButtonClick(button) {
  clearInterval(inputIntervalId);

  const answerIndex = answerButtonIndex[button];
  inputAnswer += answerChoise[inputAnswerCount][answerIndex];
  answerInputShowElement.textContent = inputAnswer;
  inputAnswerCount++;

  if (answerIndex != 0) {
    // 不正解
    inputtingAnswer = false;
    clearInterval(intervalId);
    continueProcess = true;
    inputAnswerCount = answerChoise.length;

    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
    button5.disabled = true;
    button6.disabled = true;
    button7.disabled = true;
    button8.disabled = true;

    requestAnimationFrame(() => {
      incorrectElement.style.display = "";
    });
    setRecord(nowQuestionIndex, false);

    setTimeout(() => {
      requestAnimationFrame(() => {
        incorrectElement.style.display = "none";
        answerInputElement.style.display = "none";
      });
      button1.disabled = false;
      button2.disabled = false;
      button3.disabled = false;
      button4.disabled = false;
      button5.disabled = false;
      button6.disabled = false;
      button7.disabled = false;
      button8.disabled = false;

      intervalId = setInterval(() => {
        if (nowShowWordCount < nowQuestion[0].length) {
          const text = nowQuestion[0].slice(0, ++nowShowWordCount);
          questionElement.textContent = text;
        } else {
          clearInterval(intervalId);  // 問題の表示終了

          setTimeout(() => {
            answer1Element.textContent = nowQuestion[1];
            answer2Element.textContent = nowQuestion[2];

            answerButton.style.display = "none";
            nextQuestionButton.style.display = "";
            nextQuestionButton.addEventListener('click', main_event);
          }, 300);
        }
      }, 50);
    }, 2000);

    if (!is_loading && record.length >= 1) {
      requestSetRecord(record, data => {
        record = [];
        questionData = data;
      });  // 記録を送信
    }
  } else if (inputAnswerCount >= answerChoise.length) {
    // 正解
    inputtingAnswer = false;
    clearInterval(intervalId);
    continueProcess = true;

    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
    button5.disabled = true;
    button6.disabled = true;
    button7.disabled = true;
    button8.disabled = true;

    requestAnimationFrame(() => {
      correctElement.style.display = "";
    });
    setRecord(nowQuestionIndex, true);

    setTimeout(() => {
      requestAnimationFrame(() => {
        correctElement.style.display = "none";
        answerInputElement.style.display = "none";
      });
      button1.disabled = false;
      button2.disabled = false;
      button3.disabled = false;
      button4.disabled = false;
      button5.disabled = false;
      button6.disabled = false;
      button7.disabled = false;
      button8.disabled = false;

      intervalId = setInterval(() => {
        if (nowShowWordCount < nowQuestion[0].length) {
          const text = nowQuestion[0].slice(0, ++nowShowWordCount);
          questionElement.textContent = text;
        } else {
          clearInterval(intervalId);  // 問題の表示終了

          setTimeout(() => {
            answer1Element.textContent = nowQuestion[1];
            answer2Element.textContent = nowQuestion[2];

            answerButton.style.display = "none";
            nextQuestionButton.style.display = "";
            nextQuestionButton.addEventListener('click', main_event);
          }, 300);
        }
      }, 50);
    }, 2000);
  } else {
    settingAnswerInputButton();
  }
}
answerButton.addEventListener('click', onAnswerButtonClick);
answerInputButton1.addEventListener('click', event => onAnswerInputButtonClick(0));
answerInputButton2.addEventListener('click', event => onAnswerInputButtonClick(1));
answerInputButton3.addEventListener('click', event => onAnswerInputButtonClick(2));
answerInputButton4.addEventListener('click', event => onAnswerInputButtonClick(3));
answerInputButton5.addEventListener('click', event => onAnswerInputButtonClick(4));
answerInputButton6.addEventListener('click', event => onAnswerInputButtonClick(5));
answerInputButton7.addEventListener('click', event => onAnswerInputButtonClick(6));
answerInputButton8.addEventListener('click', event => onAnswerInputButtonClick(7));
document.addEventListener('keyup', event => {
  const key = event.key;
  if (!inputtingAnswer && key == " ") {
    onAnswerButtonClick();
  } else if (inputtingAnswer) {
    if (key == "1" || key == "f") {
      onAnswerInputButtonClick(0);
    }
    if (key == "2" || key == "g") {
      onAnswerInputButtonClick(1);
    }
    if (key == "3" || key == "h") {
      onAnswerInputButtonClick(2);
    }
    if (key == "4" || key == "j") {
      onAnswerInputButtonClick(3);
    }
    if (key == "5" || key == "v") {
      onAnswerInputButtonClick(4);
    }
    if (key == "6" || key == "b") {
      onAnswerInputButtonClick(5);
    }
    if (key == "7" || key == "n") {
      onAnswerInputButtonClick(6);
    }
    if (key == "8" || key == "m") {
      onAnswerInputButtonClick(7);
    }
  }
});

    
correctElement.style.display = "none";
incorrectElement.style.display = "none";
nextQuestionButton.style.display = "none";
    
answerInputElement.style.display = "none";
let localData;
try {
  localData = localStorage.getItem("data");
  if (localData) {
    localData = JSON.parse(localData);
    questionData  = localData.questions;
    sameChars  = localData.sameChars;
    notNextChars  = localData.notNextChars;
  }
} catch (error) {
  console.error(error);
}
let is_loading = true;
const startLoad = () => requestAnimationFrame(() => {
  document.getElementById("loading").style.display = "";
  is_loading = true;
});
const finishLoad = () => requestAnimationFrame(() => {
  document.getElementById("loading").style.display = "none";
  is_loading = false;
});
if (localData) {
  startElement.addEventListener('click', main_event);
  questionElement.textContent = "";
  requestGetData(data => {
    questionData  = data.questions;
    sameChars  = data.sameChars;
    notNextChars  = data.notNextChars;
    localStorage.setItem("data", JSON.stringify(data));
  })
} else {
  startElement.disabled = true;
  requestGetData(data => {
    questionData  = data.questions;
    sameChars  = data.sameChars;
    notNextChars  = data.notNextChars;
    startElement.addEventListener('click', main_event);
    questionElement.textContent = "";
    startElement.disabled = false;
    localStorage.setItem("data", JSON.stringify(data));
  }, () => {
    questionElement.textContent = "データの読み込みに失敗しました。"
  });
}

setInterval(() => {
  if (!is_loading && record.length >= 1 && is_active && document.visibilityState == "visible") {
    requestSetRecord(record, data => {
      record = [];
      questionData = data;
    });
  }
}, 60000);

stopElement.style.display = "none";
stopElement.addEventListener('click', event => {
  is_active = false;
  continueProcess = false;
  inputtingAnswer = false;

  answerInputElement.style.display = "none";
  clearInterval(inputIntervalId);

  stopElement.style.display = "none";
  startElement.style.display = "";

  document.body.style.userSelect = "auto";
  document.body.style.webkitUserSelect = "auto";


  if (!is_loading && record.length >= 1) {
    requestSetRecord(record, data => {
      record = [];
      questionData = data;
    })  // 記録を送信
  }

  document.getElementById("makingQuestionLink").style.display = "";

  if (document.fullscreenElement) document.exitFullscreen();
});
startElement.addEventListener('click', event => {
  is_active = true;
  continueProcess = true;
  
  startElement.style.display = "none";
  stopElement.style.display = "";

  document.body.style.userSelect = "";
  document.body.style.webkitUserSelect = "";
  
  document.getElementById("makingQuestionLink").style.display = "none";

  document.documentElement.requestFullscreen();
});
document.getElementById("answer_input_space").addEventListener('click', event => event.stopPropagation());
answerInputElement.addEventListener('click', event => {
  event.stopPropagation();
  stopElement.dispatchEvent(new Event('click'));
});

document.documentElement.addEventListener('fullscreenchange', event => {
  if (!document.fullscreenElement) {
    const buttonEvent = new Event('click');
    stopElement.dispatchEvent(buttonEvent);
  }
});


async function request(successHandler, failureHandler, method = "GET", body = undefined, parameters = "") {
  const url = "https://script.google.com/macros/s/AKfycbxt6H7saDD4cD68IO-eYayjLcrJZMDNvQ-B8digshDX-K0oisBuXVnoRz2rGNeE3Cl_dQ/exec" + parameters;

  startLoad();
  const response = await fetch(url, {method: method, body: body, headers: new Headers({"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"})});
  finishLoad();
  if (!response.ok) {
    if (failureHandler) failureHandler();
    throw new Error(`レスポンスステータス: ${response.status}`);
  }

  const json = await response.json();
  if (successHandler) successHandler(json);
}

function requestGetData(successHandler = undefined, failureHandler = undefined) {
  request(successHandler, failureHandler);
}
function requestSetRecord(record, successHandler = undefined, failureHandler = undefined) {
  request(successHandler, failureHandler, "POST", JSON.stringify({method:"setRecord", parameters:[record]}))
}