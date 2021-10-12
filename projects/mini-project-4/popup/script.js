let button = document.getElementById("button");

button.addEventListener("click", ()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = true;
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
  console.log("done!");
})
