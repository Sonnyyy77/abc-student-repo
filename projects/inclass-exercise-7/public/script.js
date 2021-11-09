let counter = document.getElementsById('counter');
console.log(counter)
let n = 0;
counter.addEventListener("click", ()=>{
  console.log("hello")
  n++
  counter.innerHTML = n;
})
