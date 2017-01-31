var color = [];
chrome.runtime.onMessage.addListener(function(msg,sender){
  console.log("dsd");
  var a = document.getElementsByTagName("a");
  if(msg.clicked == 1){
    console.log("clicked:",msg.clicked);
    for(var i = 0;i<a.length;i++){
      color[i] = a[i].getAttribute("color");
      a[i].setAttribute("target","_blank");
      a[i].style.setProperty("color","grey");
      a[i].className += " newtab";
    }
  } else if (msg.clicked == 0) {
    console.log("clicked:",msg.clicked);
    for(var i = 0;i<a.length;i++){
      if(a[i].classList.contains("newtab")){
        console.log("yes");
        a[i].classList.remove("newtab");
        a[i].style.setProperty("color",color[i]);
        a[i].removeAttribute("target");
      }
    }
  }
});
