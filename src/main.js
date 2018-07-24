const supportsLocalStorage = 'localStorage' in window;
const modeTextMap = {
  'dark-1': 'White mode',
  'dark-0': 'Dark mode',
  'en-1': 'CN',
  'en-0': 'EN'
};

function addEventToElement (selector, eventType, callback) {
  const ele = document.querySelector(selector);
  if (ele) {
    ele.addEventListener(eventType, callback);
  }
}

function initMode (modeName, callback) {
  if (supportsLocalStorage && localStorage.getItem(modeName)) {
    callback();
  }
}

function switchMode (mode, buttonSelector) {
  return function () {
    const on = document.body.classList.toggle(mode + '-mode');
    if (supportsLocalStorage) {
      on ? localStorage.setItem(mode +'Mode', true) : localStorage.removeItem(mode + 'Mode');
      const ele = document.querySelector(buttonSelector);
      ele.innerText = modeTextMap[mode + '-' + (+on)];
    }
  }
}

addEventToElement('.js-toggle-dark-mode', 'click', switchMode('dark', '.js-toggle-dark-mode'));
addEventToElement('.js-toggle-lang-mode', 'click', switchMode('en', '.js-toggle-lang-mode'));
initMode('darkMode', switchMode('dark', '.js-toggle-dark-mode'));
initMode('enMode', switchMode('en', '.js-toggle-lang-mode'));
