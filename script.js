chrome.runtime.onMessage.addListener(function(msg,sender){
  console.log("dsd");
  if(msg.clicked){
    console.log("aasd");
    var a = document.getElementsByTagName("a");
    for(var i = 0;i<a.length;i++){
      a[i].setAttribute("target","_blank");
      a[i].style.setProperty("color","cyan")
    }
  }
});
