console.log("i am a background script");

let counter = 0;

chrome.storage.local.get(['counterInStorage'], function(result){
  console.log("got this from storage", result);
  console.log('Value currently is ' + result.counterInStorage);
  if (result.counterInStorage == undefined){
    counter = 0;
    chrome.storage.local.set({counterInStorage: counter}, ()=>{
      console.log("Saved", counter, "to local storage");
    })
  }
  counter = result.counterInStorage;
})

function handleMessage(request, sender, sendResponse) {
  // console.log("Message from the content script: " + request.greeting);
  // console.log(request);
  if(request.type == "increaseCounter"){
    counter++;
    console.log("counter in background script", counter);
    chrome.storage.local.set({counterInStorage: counter}, ()=>{
      console.log("Saved", counter, "to local storage");
    })
  }else if(request.type == "getCount"){
    sendResponse(counter)
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
