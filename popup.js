
let {convert} = require('./hash')

let pass = document.createElement("input")
pass.type = "password"
document.body.appendChild(pass)

let button = document.createElement("button")
button.textContent = "Enter"
document.body.appendChild(button)

let succ = document.createElement("div")
succ.textContent = "copy succ"
succ.hidden = true
document.body.appendChild(succ)

async function writeClipboard(text){
  let password = convert(text)
  await window.navigator.clipboard.writeText(password)
  succ.hidden = false
}

button.onclick = () => {
  writeClipboard(pass.value)
}

pass.onkeypress = (e) => {
  if(e.key === "Enter"){
    writeClipboard(pass.value)
  } else {
    succ.hidden = true
  }
}
