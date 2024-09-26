
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "passwordHash",
    title: "convert password to hash",
    contexts: ["editable"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "passwordHash") {
    chrome.tabs.sendMessage(tab.id, {kind: "convert"})
  }
})

chrome.commands.onCommand.addListener((command, tab) => {
  if(command === "hash-password"){
    chrome.tabs.sendMessage(tab.id, {kind: "convert"})
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.kind === "clear") {
    setTimeout(async ()=>{
      let queryOptions = { active: true, lastFocusedWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      await chrome.tabs.sendMessage(tab.id, message)
    }, 30000)
  }
  return true;
})
