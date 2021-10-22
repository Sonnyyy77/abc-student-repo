console.log("i am a background script");

let counter1 = 0;
let counter2 = 0;
let count1;
let count2;

chrome.storage.local.get(['counter1InStorage'], function(result){
  console.log("got this from storage", result);
  console.log('Value currently is ' + result.counter1InStorage);
  counter1 = result.counter1InStorage
  if (result.counter1InStorage == undefined){
    counter1 = 0;
    chrome.storage.local.set({counter1InStorage: counter1}, ()=>{
      console.log("Saved", counter1, "to local storage");
    })
  }
  // counter1 = result.counter1InStorage;
})

function secondsToString(seconds){
  // from: https://stackoverflow.com/a/25279340
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

chrome.storage.local.get(['counter2InStorage'], function(result){
  console.log("got this from storage", result);
  console.log('Value currently is ' + result.counter2InStorage);
  counter2 = result.counter2InStorage;
  if (result.counter2InStorage == undefined){
    counter2 = 0;
    chrome.storage.local.set({counter2InStorage: counter2}, ()=>{
      console.log("Saved", counter2, "to local storage");
    })
  }
  // counter2 = result.counter2InStorage;
})

function handleMessage(request, sender, sendResponse) {
  // console.log("Message from the content script: " + request.greeting);
  // console.log(request);
  if(request.type == "increaseCounter1"){
    counter1++;
    // count1 = setInterval(()=>{
    //   let text1 = secondsToString(counter1);
    //   // let message = {type: "increaseCounter1"};
    //   // chrome.runtime.sendMessage(message);
    //   document.getElementById(time1).innerHTML=text1;
    //   counter1+=1;
    // }, 1000)
    console.log("counter in background script", counter1);
    chrome.storage.local.set({counter1InStorage: counter1}, ()=>{
      console.log("Saved", counter1, "to local storage");
    })
  }
  else if(request.type == "getCount1"){
    sendResponse(counter1)
  }else if(request.type == "pauseCounter1"){
    counter1+=0;
    clearInterval(count1);
    chrome.storage.local.set({counter1InStorage: counter1}, ()=>{
      console.log("Saved", counter1, "to local storage");
    })
  }else if(request.type == "resetCounter1"){
    counter1=0;
    chrome.storage.local.set({counter1InStorage: counter1}, ()=>{
      console.log("Saved", counter1, "to local storage");
    })
  }

  if(request.type == "increaseCounter2"){
    counter2++;
    // count2 = setInterval(()=>{
    //   let text2 = secondsToString(counter2);
    //   // let message = {type: "increaseCounter1"};
    //   // chrome.runtime.sendMessage(message);
    //   document.getElementById(time2).innerHTML=text2;
    //   counter2+=1;
    // }, 1000)
    console.log("counter in background script", counter2);
    chrome.storage.local.set({counter2InStorage: counter2}, ()=>{
      console.log("Saved", counter2, "to local storage");
    })
  }
  else if(request.type == "getCount2"){
    sendResponse(counter2)
  }else if(request.type == "pauseCounter2"){
    counter2+=0;
    clearInterval(count2);
    chrome.storage.local.set({counter2InStorage: counter2}, ()=>{
      console.log("Saved", counter2, "to local storage");
    })
  }else if(request.type == "resetCounter2"){
    counter2=0;
    chrome.storage.local.set({counter2InStorage: counter2}, ()=>{
      console.log("Saved", counter2, "to local storage");
    })
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
