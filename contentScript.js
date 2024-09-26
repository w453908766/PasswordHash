
let {convert} = require('./hash')

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
      if(type.indexOf(element.type) != -1) forInput(element)
    } else if (element.tagName === 'TEXTAREA') {
      forInput(element)
    } else if (element.contentEditable === "true") {
      forEditable(element)
    }
  }
}

function clear(){
  var textArea = document.createElement("textarea")
  textArea.value = " "
  textArea.style.position = "fixed"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  var successful = document.execCommand('copy')
  var msg = successful ? 'success' : 'fail';
  console.log('clear ' + msg);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.kind === "convert"){
    forTextBox(document.activeElement)
  } else if(message.kind === "clear") {
    clear()
  }
})
