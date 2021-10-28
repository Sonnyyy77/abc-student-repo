let button = document.querySelector('#button');
let button2 = document.querySelector('#button2');

function display(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {type: "display"});
  })
  // let message = {type: "display"};
  // chrome.runtime.sendMessage(message);
  console.log("message");
}

function disapear(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {type: "disapear"});
  })
  console.log("message");
}

button.addEventListener("click", display);
button2.addEventListener("click", disapear);
