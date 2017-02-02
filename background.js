var clicked = Number(0)
chrome.browserAction.onClicked.addListener(function(tab){
  clickListener();
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  activate();
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(changeInfo.status == "complete"){
    activate();
  } else {
    activate();
  }
})

function changeColor(clicked){
  if(clicked == 1){
    chrome.browserAction.setIcon({path: 'light.png'});
  }else {
    chrome.browserAction.setIcon({path: 'dark.png'});
  }
}

function activate(){
  chrome.storage.local.get("click",function(result){
    if(result.click == 1){
      sendMessage(result.click);
      changeColor(result.click);
    }
  })
}

function clickListener(){
  chrome.storage.local.get("click",function(result){
    if (result.click == 0) {
      chrome.storage.local.set({"click":1});
    } else if (result.click == 1) {
      chrome.storage.local.set({"click":0});
    } else if (result.click == null) {
      chrome.storage.local.set({"click":1});
    } else if (result.click == undefined) {
      chrome.storage.local.set({"click":1});
    }
    sendMessage(result.click);
    changeColor(result.click);
  })
}

function sendMessage(click){
  chrome.tabs.sendMessage(activeInfo.tabId,{clicked:click});
}
