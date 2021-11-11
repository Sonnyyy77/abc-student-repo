console.log("Good Guess!")
let button = document.getElementById("button");
// let answerInput = document.getElementById("answer");
let container = document.getElementById("bigdiv");
button.addEventListener("click", ()=>{
  let arr = [];
  // let imgs = [].slice.call(container.getElementsByTagName("img"));
  // if(imgs.length){
  //   imgs.forEach( function( img ){
  //     var attrID = img.id;
  //     arr.push(attrID);
  //   });
  // }
  // console.log(size);
  console.log(container.childElementCount);
  // for
  for (i = 0; i < container.childElementCount; i++){
    let img = container.children[i].childNodes[0];
    // console.log(container.children[i].childElementCount);
    if (container.children[i].childElementCount>0){
      arr.push(img.id);
      console.log(container.children[i].childNodes[0].id);
    }
    // console.log(container.childNodes[0].id);
    // console.log(arr);
  }
  console.log("click");
  // let answer = answerInput.value;
  let answer = arr.join('');
  console.log("answer:", answer);
  window.location.href = "/answer?word=" + answer;
})

// function allowDrop(ev) {
//   ev.preventDefault();
// }
//
// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }
