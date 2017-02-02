var clicked = Number(0);
chrome.browserAction.onClicked.addListener(function(tab){
  clicked = 1-clicked;
  changeColor(clicked);
  chrome.tabs.sendMessage(tab.id,{clicked:clicked});
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  if(clicked == 1){
    chrome.tabs.sendMessage(activeInfo.tabId,{clicked:clicked});
  }
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(clicked == 1){
        chrome.tabs.sendMessage(tabid,{clicked:clicked});
    }
})

function changeColor(clicked){
  if(clicked == 1){
    chrome.browserAction.setIcon({path: 'light.png'});
  }else {
    chrome.browserAction.setIcon({path: 'dark.png'});
  }
}
