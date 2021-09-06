console.log();
let range = document.getElementById("myRange").innerHTML;
let text = document.getElementById("text").innerHTML;
console.log("text", text);

let letters = text.split(“”);
// console.log(letters);
let spanLetters = [];
let randomMultipliers = [];
for (let i=0; i<letters.length; i++){
  let currentLetter = letters[i];
  let spanElement = "<span>"+currentLetter+"</span>"
  // console.log("<span>"+currentLetter+"</span>")
  spanLetters.push(spanElement)

  let randomMultipliers = Math.random()*3;
  randomMultipliers.push(randomMultipliers);
}

console.log(spanLetters);

// console.log(spanLetters.join(""));
let constructedString = spanLetters.join("");
// text = spanLetters.join("");
text.innerHTML = constructedString;

let spanTags = document.getElementById("span");

function inputHappened(){
  let value =range.value;
  console.log("range value changed to ", value);
  for (let i=0; i<spanTags.length;i++){
    let currentSpan = spanTags[i];
    let multiplier = randomMultipliers[i];
    currentSpan.style.top = value*multiplier + "px";
  }
}

range.addEventListener("input", inputHappened);
