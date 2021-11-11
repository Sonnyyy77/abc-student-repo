console.log("wrong")
let button = document.getElementById("button2");
let container = document.getElementById("bigdiv2");
// let secretInput = document.getElementById("secret");

// button2.addEventListener("click", ()=>{
  // console.log("click");
  // let secret = secretInput.value;
  // console.log("secret:", secret);
  // window.location.href = "/secret?word=" + secret;
// })

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
