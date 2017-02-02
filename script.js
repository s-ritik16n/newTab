chrome.runtime.onMessage.addListener(function(msg,sender){
  var a = document.getElementsByTagName("a");
  if(msg.clicked == 1){
    console.log("clicked:",msg.clicked);
    for(var i = 0;i<a.length;i++){
      a[i].setAttribute("target","_blank");
      a[i].className += " newtab";
    }
  } else if (msg.clicked == 0) {
    console.log("clicked:",msg.clicked);
    for(var i = 0;i<a.length;i++){
      if(a[i].classList.contains("newtab")){
        a[i].classList.remove("newtab");
        a[i].removeAttribute("target");
      }
    }
  }
});
