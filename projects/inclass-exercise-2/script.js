console.log("i am here");

let button = document.getElementById("button");
console.log(button);

function openWindow(){
  let openWindow = window.open("https://abc.leoneckert.com", "", "width=200,height=200");
  setTimeout(()=>{
    openWindow.close();
  }, 5000);
}

button.addEventListener("click", ()=>{
  console.log("click");
  window.open("https://abc.leoneckert.com", "", "width=200,height=200");
  openWindow();
})
