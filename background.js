
chrome.browserAction.onClicked.addListener(function(tab){
  clickListener(tab.id);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  activate(activeInfo.tabId);
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(changeInfo.status == "complete"){
    activate(tabid);
  } else {
    activate(tabid);
  }
})

function changeColor(clicked){
  if(clicked == 1){
    chrome.browserAction.setIcon({path: 'light.png'});
  }else {
    chrome.browserAction.setIcon({path: 'dark.png'});
  }
}

function activate(id){
  chrome.storage.local.get("click",function(result){
    if(result.click == 1){
      mainProc(id,result.click);
    }
  })
}

function clickListener(id){
  chrome.storage.local.get("click",function(result){
    if (result.click == 0) {
      chrome.storage.local.set({"click":1},function(){
        mainProc(id,result.click);
      });
    } else if (result.click == 1) {
      chrome.storage.local.set({"click":0},function(){
        mainProc(id,result.click);
      });
    } else if (result.click == null) {
      chrome.storage.local.set({"click":1},function(){
        mainProc(id,result.click);
      });
    } else if (result.click == undefined) {
      chrome.storage.local.set({"click":1},function(){
        mainProc(id,result.click);
      });
    }
  })
}

function mainProc(id,click){
  changeColor(click);
  chrome.tabs.sendMessage(id,{clicked:click});
}
