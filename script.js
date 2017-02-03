chrome.runtime.onMessage.addListener(function(msg,sender){
  var a = document.getElementsByTagName("a");
  if(msg.clicked == 1){
    for(var i = 0;i<a.length;i++){
      if(!a[i].hasAttribute("target")){
        a[i].setAttribute("target","_blank");
        a[i].className += " 0335ff33654533bd68d644e1ff0fd1ff";  //md5 hash of my name, hope no one uses it as a class name
      }
    }
  } else if (msg.clicked == 0) {
    for(var i = 0;i<a.length;i++){
      if(a[i].classList.contains("0335ff33654533bd68d644e1ff0fd1ff")){
        a[i].classList.remove("0335ff33654533bd68d644e1ff0fd1ff");
        a[i].removeAttribute("target");
      }
    }
  }
});
