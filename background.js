var clicked = Number(0);
chrome.browserAction.onClicked.addListener(function(tab){
  clicked = 1-clicked;
  changeColor(clicked);
  chrome.tabs.sendMessage(tab.id,{clicked:clicked});
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  console.log("tab changed, clicked: ",clicked);
  if(clicked == 1){
    chrome.tabs.sendMessage(activeInfo.tabid,{clicked:clicked});
  }
  else if(clicked == 0){
    chrome.tabs.sendMessage(activeInfo.tabid,{clicked:clicked});
  }
})

function changeColor(clicked){
  switch (clicked) {
    case 1:
    chrome.browserAction.setIcon({path: 'light.png'});
      break;
    case 0:
    chrome.browserAction.setIcon({path: 'dark.png'});
      break;
  }
}
