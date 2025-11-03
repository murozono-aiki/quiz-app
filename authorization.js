function authorization(redirectURL) {
  const state = self.crypto.randomUUID();
  localStorage.setItem("quiz-app-auth-state", state);
  sessionStorage.setItem("quiz-app-redirect-URL", redirectURL);
  window.location = "https://accounts.google.com/o/oauth2/v2/auth?client_id=686329872435-t8vnffd6h1q8i45i1e2eu9fel3h5nndc.apps.googleusercontent.com&redirect_uri=https://murozono-aiki.github.io/quiz-app/authorization.html&response_type=token&scope=https://www.googleapis.com/auth/spreadsheets.currentonly&state=" + state;
}