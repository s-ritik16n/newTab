var clicked = Number(0);
chrome.browserAction.onClicked.addListener(function(tab){
  clicked = 1-clicked;
  console.log(clicked+"sd");
  chrome.tabs.sendMessage(tab.id,{clicked:clicked});
});
