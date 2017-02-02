var clicked = Number(0)
chrome.browserAction.onClicked.addListener(function(tab){
  clickListener();
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  clickListener();
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(changeInfo.status == "complete"){
    clickListener();
  } else {
    clickListener();
  }
})

function changeColor(clicked){
  if(clicked == 1){
    chrome.browserAction.setIcon({path: 'light.png'});
  }else {
    chrome.browserAction.setIcon({path: 'dark.png'});
  }
}

function clickListener(){
  chrome.storage.local.get("click",function(result){
    if (result.click == 0) {
      chrome.storage.local.set({"click":1});
      changeColor(result.click);
    } else if (result.click == 1) {
      chrome.storage.local.set({"click":0});
      changeColor(result.click)
    } else if (result.click == null) {
      chrome.storage.local.set({"click":1});
      changeColor(result.click)
    } else if (result.click == undefined) {
      chrome.storage.local.set({"click":1});
      changeColor(result.click)
    }
    sendMessage(result.click);
  })
}

function sendMessage(click){
  chrome.tabs.sendMessage(activeInfo.tabId,{clicked:click});
}
