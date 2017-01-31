var clicked = Number(0);
chrome.browserAction.onClicked.addListener(function(tab){
  clicked = 1-clicked;
  switch (clicked) {
    case 1:
    chrome.browserAction.setIcon({path: 'light.png'});
      break;
    case 0:
    chrome.browserAction.setIcon({path: 'dark.png'});
      break;
  }
  chrome.tabs.sendMessage(tab.id,{clicked:clicked});
});
