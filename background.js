
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "passwordHash",
    title: "convert password to hash",
    contexts: ["editable"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "passwordHash") {
    chrome.tabs.sendMessage(tab.id, {})
  }
})

chrome.commands.onCommand.addListener((command, tab) => {
  if(command === "hash-password"){
    chrome.tabs.sendMessage(tab.id, {})
  }
})
