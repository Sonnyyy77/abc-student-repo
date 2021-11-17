console.log("hi");

let socket = io();
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
  let message = messagebox.value.trim();
  if(message != ""){
    let data = {name: name, message: message};
    socket.emit('message', data);
    console.log(data);
  }
  messagebox.value = "";
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

messagebox.addEventListener("keyup", function(event){
  if (event.keyCode === 13){
    sendbutton.click();
  }
})
