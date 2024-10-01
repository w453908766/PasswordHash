
let {convert} = require('./hash')

let pass = document.createElement("input")
pass.type = "password"
document.body.appendChild(pass)

let button = document.createElement("button")
button.textContent = "Enter"
document.body.appendChild(button)

let tips = document.createElement("div")
document.body.appendChild(tips)

let clear = document.createElement("button")
clear.textContent = "clear clipboard"
document.body.appendChild(clear)
clear.hidden = true

pass.focus()


async function writeClipboard(text){
  let password = await convert(text)
  await window.navigator.clipboard.writeText(password)

  if(chrome.runtime){
    chrome.runtime.sendMessage({ kind: "clear" }, () => {});
    tips.textContent = "copy success, please paste within 30 seconds"
  } else {
    tips.textContent = "copy success, please clear clipboard later"
    clear.hidden = false
  }
}

button.onclick = () => {
  writeClipboard(pass.value)
}

pass.onkeyup = (e) => {
  if(e.key === "Enter"){
    writeClipboard(pass.value)
  } else {
    tips.textContent = ""
  }
}

clear.onclick = async () => {
  await window.navigator.clipboard.writeText("")
  tips.textContent = "clear success"
}