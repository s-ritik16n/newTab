
chrome.browserAction.onClicked.addListener(function(tab){
  chrome.storage.local.get('click',function(result){
    if(result.click == 0){
        chrome.storage.local.set({"click":1},function(){
        mainProc(tab.id,result.click);
        });
    } else if (result.click == 1) {
        chrome.storage.local.set({"click":0},function(){
        mainProc(tab.id,result.click);
        });
    } else if (result.click == undefined) {
      chrome.storage.local.set({"click":1},function(){
      mainProc(tab.id,result.click);
      });
    }
  })
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  chrome.storage.local.get("click",function(result){
    if(result.click == 1){
      mainProc(activeInfo.tabId,result.click);
    }
  })
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(changeInfo.status == "complete"){
    chrome.storage.local.get("click",function(result){
      if(result.click == 1){
      chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        mainProc(tabs[0].id,result.click);
      });
      }
    })
  }
})

chrome.tabs.onReplaced.addListener(function(addedTabId,removedTabId){
  chrome.storage.local.get("click",function(result){
    if(result.click == 1){
      mainProc(addedTabId,result.click);
    }
  })
})

function changeIcon(clicked){
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
  changeIcon(click);
  chrome.tabs.sendMessage(id,{clicked:click});
}
