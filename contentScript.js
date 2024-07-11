
let md5 = require('js-md5');

function convert(text) {
  let hash = md5(text)
  return "Aa0=" + hash.substr(0, 8)
}

function forInput(element) {
  element.value = convert(element.value)
  element.dispatchEvent(new Event('input'))
  element.dispatchEvent(new Event('change'));
}

function forEditable(element) {
  element.textContent = convert(element.textContent) 
  element.dispatchEvent(new Event('input'))
}

function forTextBox(element) {
  if (element) {
    if (element.tagName === 'INPUT') {
      let type = ["text", "search", "password"]
      if(type.indexOf(element.type)) forInput(element)
    } else if (element.tagName === 'TEXTAREA') {
      forInput(element)
    } else if (element.contentEditable === "true") {
      forEditable(element)
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  forTextBox(document.activeElement)
})
