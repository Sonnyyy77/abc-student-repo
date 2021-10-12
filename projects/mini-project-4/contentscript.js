console.log("hello");

let n = false;

let p = document.getElementsByTagName("p");
let d = document.getElementsByTagName("div");

// let start = setInterval(changeColor, 100);

function changeColor(){
  let p = document.getElementsByTagName("p");
  if (!n){
    document.body.style.backgroundColor = "black";
    //document.body.div.style.backgroundColor = "black";
    for(let i = 0; i < p.length; i++){
      p[i].style.color = "white";
    }
    for(let i = 0; i < d.length; i++){
      d[i].style.backgroundColor = "black";
    }
    n = true;
  }
  else {
    document.body.style.backgroundColor = "white";
    // document.body.div.style.backgroundColor = "white";
    for(let i = 0; i < p.length; i++){
      p[i].style.color = "black";
    }
    for(let i = 0; i < d.length; i++){
      d[i].style.backgroundColor = "white";
    }
    n = false;
  }
}

function stop(request, sender, sendResponse){
  console.log("this is " + request);
  if (request){
    clearInterval(start);
    document.body.style.backgroundColor = "red";
    for(let i = 0; i < p.length; i++){
      p[i].style.color = "#DE0000";
    }
    for(let i = 0; i < d.length; i++){
      d[i].style.backgroundColor = "red";
    }
    // chrome.tabs.reload();
  }
}

chrome.runtime.onMessage.addListener(stop);



//
//
// function move(tabId, moveInfo){
//   document.body.style.backgroundColor = "white";
// }


// chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
//   // console.log("Tab " + tabId + " moved from " + moveInfo.fromIndex + " to " + moveInfo.toIndex);
//   document.body.style.backgroundColor = "white";
//   console.log("moved");
// });
