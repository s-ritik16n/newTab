chrome.browserAction.onClicked.addListener(function(tab){
  chrome.storage.local.get('click',function(result){
    console.log("click value(onClicked): "+result.click);
    if(result.click == 0){
        chrome.storage.local.set({"click":1},function(){
          //console.log("click value - after click(onClicked): "+result.click);
          mainProc(tab.id,1);
        });
    } else if (result.click == 1) {
        chrome.storage.local.set({"click":0},function(){
          //console.log("click value - after click(onClicked): "+result.click);
          mainProc(tab.id,0);
        });
    } /*else if (result.click == undefined) {
      chrome.storage.local.set({"click":1},function(){
        //console.log("click value - after click(onClicked): "+result.click);
        mainProc(tab.id,result.click);
      });
    } else if (result.click == null) {
      chrome.local.get.set({"click":1},function(){
        //console.log("click value - after click(onClicked): "+result.click);
        mainProc(tab.id,result.click);
      })
    }*/
  })
});

chrome.management.onInstalled.addListener(function(extInfo){
  console.log("installed");
  chrome.storage.local.clear()
  //chrome.storage.local.set({"click":"0"});
})

chrome.management.onEnabled.addListener(function(extInfo){
  console.log("enabled");
  chrome.storage.local.clear()
  //chrome.storage.local.set({"click":"0"});
})

chrome.management.onUninstalled.addListener(function(extId){
  console.log("uninstalled");
  chrome.storage.local.clear();
})

chrome.management.onDisabled.addListener(function(extInfo){
  console.log("disabled");
  chrome.storage.local.clear();
})

chrome.tabs.onActivated.addListener(function(activeInfo){
  chrome.storage.local.get("click",function(result){
    console.log("click value(onActivated): "+result.click);
    //console.log("onActivated");
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
      //console.log("onUpdated");
      if(result.click == 1){
        mainProc(tabid,result.click);
      //chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      //});
    } else if (result.click == 0) {
      mainProc(tabid,result.click);
    }
    })
  }
})

chrome.tabs.onReplaced.addListener(function(addedTabId,removedTabId){
  chrome.storage.local.get("click",function(result){
    console.log("click value(onReplaced): "+result.click);
    mainProc(addedTabId,result.click);
  })
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
