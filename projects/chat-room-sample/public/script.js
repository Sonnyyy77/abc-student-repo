console.log("hi");

let socket = io();
let keyInput = [];
let namebox = document.getElementById("name");
let chatbox = document.getElementById("chat");
let messagebox = document.getElementById("message");
let sendbutton = document.getElementById("send");

sendbutton.addEventListener("click", ()=>{
  console.log("clicked");
  let name = namebox.value.trim();
  if(name == ""){
    name = "anonymous";
    namebox.value = ""
  }
  // let message = messagebox.value.trim();
  let message = keyInput.join("")
  keyInput = [];
  let message1 = event.key;
  if(message != ""){
    let data = {name: name, message: message};
    socket.emit('message', data);
    console.log(data);
    // console.log(keyInput);
  }
  messagebox.value = "";
})


messagebox.addEventListener("keyup", ()=>{
  let keysOfInterest = " abcdefghijklmnopqrstuvwxyz0123456789"
  // console.log("value", messagebox.value)
  let x = event.key;
  console.log(x)
  if(keysOfInterest.includes(x.toLowerCase())){
    keyInput.push(x);
    console.log(keyInput.join(""));
  }else if(x == "ArrowRight"){
    keyInput.push("→");
  }else if(x == "ArrowLeft"){
    keyInput.push("←");
  }else if(x == "Tab"){
    keyInput.push("⇥");
  }

  if(messagebox.value == ""){
    keyInput = []
  }
  console.log(keyInput)

  // if (x != "Backspace"){
  //   document.getElementById("key").innerHTML += x;
  //   keyInput.push(x);
  //   console.log(keyInput.join(""));
  // }
  // if (x == "Backspace"){
  //   keyInput.pop();
  //   // keyInput.pop();
  //   // document.getElementById("key").innerHTML -= x;
  // }
  // if (x == "Enter"){
  //   keyInput.splice(0, keyInput.length);
  //   keyInput=[];
  // }
  // else if (x != "Enter"){
  //   document.getElementById("key").innerHTML += x;
  //   keyInput.push(x);
  //   console.log(keyInput.join(""));
  // }
  // if (x != "Backspace" || x != "Enter" || x != "CapsLock" || x != "Shift" || x != "Tab"){
  //   document.getElementById("key").innerHTML += x;
  //   keyInput.push(x);
  //   console.log(keyInput.join(""));
  // }

  if (event.keyCode === 13){
    sendbutton.click();
  }
})

socket.on("incoming", (data)=>{
  console.log(data);
  let name = data.name;
  let message = data.message;
  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = "<span class='sender'>"+name+":</span>"+message
  li.appendChild(p);
  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
})

// messagebox.addEventListener("keyup", function(event){
//   if (event.keyCode === 13){
//     sendbutton.click();
//   }
// })
