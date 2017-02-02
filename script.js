var color = [];
chrome.runtime.onMessage.addListener(function(msg,sender){
  var a = document.getElementsByTagName("a");
  var btn = document.getElementsByTagName('button')
  if(msg.clicked == 1){
    console.log("clicked:",msg.clicked);
    for(var i = 0;i<a.length;i++){
      a[i].setAttribute("target","_blank");
      a[i].className += " newtab";
    }
    for(var i = 0;i<btn.length;i++){
      btn[i].setAttribute("target","_blank");
      btn[i].className += " newtab";
    }
  } else if (msg.clicked == 0) {
    console.log("clicked:",msg.click);
    for(var i = 0;i<a.length;i++){
      if(a[i].classList.contains("newtab")){
        a[i].classList.remove("newtab");
        a[i].removeAttribute("target");
      }
    }
    for(var i = 0;i<btn.length;i++){
      if(btn[i].classList.contains("newtab")){
        btn[i].classList.remove("newtab");
        btn[i].removeAttribute("target");
      }
    }
  }
});
