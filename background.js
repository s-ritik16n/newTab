chrome.browserAction.onClicked.addListener(function(tab){
  chrome.storage.local.get('click',function(result){
    console.log("click value(onClicked): "+result.click);
    if(result.click == 0){
        chrome.storage.local.set({"click":1},function(){
          mainProc(tab.id,1);
        });
    } else if (result.click == 1) {
        chrome.storage.local.set({"click":0},function(){
          mainProc(tab.id,0);
        });
    } else {
      chrome.storage.local.set({"click":1},function(){
        mainProc(tab.id,1);
      });
    }
  })
});
chrome.tabs.onActivated.addListener(function(activeInfo){
  chrome.storage.local.get("click",function(result){
    console.log("click value(onActivated): "+result.click);
    if(result.click == 1){
      mainProc(activeInfo.tabId,result.click);
    } else if (result.click == 0) {
      mainProc(activeInfo.tabId,result.click)
    }
  })
})

chrome.tabs.onUpdated.addListener(function(tabid,changeInfo,tab) {
  if(changeInfo.status == "complete"){
    chrome.storage.local.get("click",function(result){
      console.log("click value(onUpdated): "+result.click);
      setTimeout(function(){
        mainProc(tabid,result.click);
      },2000);
    })
  } else if (changeInfo.status == "loading") {
    mainProc(tabid,0);
  }
})

chrome.tabs.onReplaced.addListener(function(addedTabId,removedTabId){
  chrome.storage.local.get("click",function(result){
    console.log("click value(onReplaced): "+result.click);
    mainProc(addedTabId,result.click);
  })
})


chrome.management.onInstalled.addListener(function(extInfo){
  console.log("installed");
  chrome.storage.local.clear()
})

chrome.management.onEnabled.addListener(function(extInfo){
  console.log("enabled");
  chrome.storage.local.clear()
})

chrome.management.onUninstalled.addListener(function(extId){
  console.log("uninstalled");
  chrome.storage.local.remove("click");
  chrome.storage.local.clear();
})

chrome.management.onDisabled.addListener(function(extInfo){
  console.log("disabled");
  chrome.storage.local.remove("click");
  chrome.storage.local.clear();
})

function mainProc(id,click){
  changeIcon(click);
  chrome.tabs.sendMessage(id,{clicked:click});
}

function changeIcon(click){
  if(click == 1){
    chrome.browserAction.setIcon({path: {"38":"lights.png"}});
  }else if (click == 0) {
    chrome.browserAction.setIcon({path: {"38":"dark.png"}});
  }
}
