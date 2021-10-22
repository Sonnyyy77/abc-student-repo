console.log("popped up just now");

// let hour1 = 0;
// let minute1 = 0;
// let second1 = 0;
// let hour2 = 0;
// let minute2 = 0;
// let second2 = 0;

let button1 = document.querySelector('#study1');
let button2 = document.querySelector('#study2');
let button3 = document.querySelector('#study3');
let button4 = document.querySelector('#rest1');
let button5 = document.querySelector('#rest2');
let button6 = document.querySelector('#rest3');

let t1 = document.getElementById("time1");
let t2 = document.getElementById("time2");

// let button1 = document.getElementById('study1');
// let button2 = document.getElementById('study2');
// let button3 = document.getElementById('study3');
// let button4 = document.getElementById('rest1');
// let button5 = document.getElementById('rest2');
// let button6 = document.getElementById('rest3');

let count1;
let count2;

let counter1 = 1;
let counter2 = 1;

let message1 = {type: "getCount1"};
chrome.runtime.sendMessage(message1, (response)=>{
  counter1 = response;
  let txt1 = secondsToString(counter1);
  time1.innerHTML = txt1;
})

let message2 = {type: "getCount2"};
chrome.runtime.sendMessage(message2, (response)=>{
  counter2 = response;
  let txt2 = secondsToString(counter2);
  time2.innerHTML = txt2;
})


function secondsToString(seconds){
  // from: https://stackoverflow.com/a/25279340
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function start1(){
  let message = {type: "increaseCounter1"};
  // counter1 = 1;
  counter1++;
  count1 = setInterval(()=>{
    let text1 = secondsToString(counter1);
    // let message = {type: "increaseCounter1"};
    chrome.runtime.sendMessage(message);
    t1.innerHTML=text1;
    counter1+=1;
  }, 1000)
}

function pause1(){
  let message = {type: "pauseCounter1"};
  chrome.runtime.sendMessage(message);
  clearInterval(count1);
  counter1+=0;
}

function reset1(){
  let message = {type: "resetCounter1"};
  counter1 = 0;
  let text1 = secondsToString(counter1);
  chrome.runtime.sendMessage(message);
  clearInterval(count1);
  t1.innerHTML=text1;
}

function start2(){
  let message = {type: "increaseCounter2"};
  // counter2 = 1;
  counter2++;
  count2 = setInterval(()=>{
    let text2 = secondsToString(counter2);
    // let message = {type: "increaseCounter2"};
    chrome.runtime.sendMessage(message);
    t2.innerText=text2;
    counter2+=1;
  }, 1000)
}

function pause2(){
  let message = {type: "pauseCounter2"};
  chrome.runtime.sendMessage(message);
  clearInterval(count2);
  counter2+=0;
}

function reset2(){
  let message = {type: "resetCounter2"};
  counter2 = 0;
  let text2 = secondsToString(counter2);
  chrome.runtime.sendMessage(message);
  clearInterval(count2);
  t2.innerHTML=text2;
}

button1.addEventListener("click", start1);
button2.addEventListener("click", pause1);
button3.addEventListener("click", reset1);
button4.addEventListener("click", start2);
button5.addEventListener("click", pause2);
button6.addEventListener("click", reset2);


/*
function start1() {
  pause1();
  count1 = setInterval(() => { timer1(); }, 1000);
}

function pause1() {
  clearInterval(count1);
}

function reset1() {
  hour1 = 0;
  minute1 = 0;
  second1 = 0;
  document.getElementById('hour1').innerText = '00';
  document.getElementById('minute1').innerText = '00';
  document.getElementById('second1').innerText = '00';
}

function timer1() {
  if (second1 == 60) {
    second1 = 0;
    minute1++;
  }
  if (minute1 == 60) {
    minute1 = 0;
    hour1++;
  }
  document.getElementById('hour1').innerText = returnData(hour1);
  document.getElementById('minute1').innerText = returnData(minute1);
  document.getElementById('second1').innerText = returnData(second1);
}

function start2() {
  pause2();
  count2 = setInterval(() => { timer2(); }, 1000);
}

function pause2() {
  clearInterval(count2);
}

function reset2() {
  hour2 = 0;
  minute2 = 0;
  second2 = 0;
  document.getElementById('hour2').innerText = '00';
  document.getElementById('minute2').innerText = '00';
  document.getElementById('second2').innerText = '00';
}

function timer2() {
  if (second2 == 60) {
    second2 = 0;
    minute2++;
  }
  if (minute2 == 60) {
    minute2 = 0;
    hour2++;
  }
  document.getElementById('hour2').innerText = returnData(hour2);
  document.getElementById('minute2').innerText = returnData(minute2);
  document.getElementById('second2').innerText = returnData(second2);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}
*/
