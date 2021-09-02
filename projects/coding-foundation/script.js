function isPressed(){
  document.getElementById("mySquare").innerHTML = "";
  let n = document.getElementById("squareNum").value;
  for(let i = 0; i < n; i++){
    let sqrs = document.createElement('div');
    // set the class name property
    sqrs.className = 'sqr';
    // add new generated squares into the div
    document.getElementById("mySquare").appendChild(sqrs);
  }
};
