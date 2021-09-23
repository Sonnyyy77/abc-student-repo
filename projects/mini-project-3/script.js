let on = document.getElementById("on");
let off = document.getElementById("off");
let auto = document.getElementById("auto");
let key = [65.41, 69.30, 73.42, 77.78,
  82.41, 87.31, 92.50, 98.00,
  103.83, 110.00, 116.54, 123.47,
  130.81, 138.59, 146.83, 155.56,
  164.81, 174.61, 185.00, 196.00,
  207.65, 220.00, 233.08, 246.94,
  261.63, 277.18, 293.66, 311.13,
  329.63, 349.23, 369.99, 392.00,
  415.30, 440.00, 466.16, 493.88,
  523.25, 554.37, 587.33, 622.25,
  659.25, 698.46, 739.99, 783.99,
  830.61, 880.00, 932.33, 987.77,
  1046.50];



// selecting the two new inputs
let frequencyRange1 = document.getElementById("frequencyInput1");
let frequencyRange2 = document.getElementById("frequencyInput2");
let frequencyRange3 = document.getElementById("frequencyInput3");
let frequencyRange4 = document.getElementById("frequencyInput4");

let volumeRange = document.getElementById("volumeInput");

let context = new AudioContext();
let destination = context.destination;

let oscillator1 = context.createOscillator();
oscillator1.type = "triangle";
oscillator1.frequency.value = 440;

let oscillator2 = context.createOscillator();
oscillator2.type = "triangle";
oscillator2.frequency.value = 440;

let oscillator3 = context.createOscillator();
oscillator3.type = "triangle";
oscillator3.frequency.value = 440;

let oscillator4 = context.createOscillator();
oscillator4.type = "triangle";
oscillator4.frequency.value = 440;

let gain = context.createGain();

oscillator1.connect(gain);
oscillator2.connect(gain);
oscillator3.connect(gain);
oscillator4.connect(gain);
gain.connect(destination);

let oscillatorStarted = false;

// initialise the volume:
// we divide the value from the slider by 100 to bring it back to
// a value between 0 and 1
gain.gain.value = volumeInput.value/100;

// 65 and 1050 Hz
// let minHz = 65;
// let maxHz = 1050;

// function map(value, x1, y1, x2, y2){
//   return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
// }
// console.log(map(3, 0, 10, 0, 100))

let sliderValue1 = frequencyRange1.value;
let sliderValue2 = frequencyRange2.value;
let sliderValue3 = frequencyRange3.value;
let sliderValue4 = frequencyRange4.value;
// let mappedHertz1 = map(sliderValue1, 0, 100, 65, 1050);
// let mappedHertz2 = map(sliderValue2, 0, 100, 65, 1050);
// let mappedHertz3 = map(sliderValue3, 0, 100, 65, 1050);
// let mappedHertz4 = map(sliderValue4, 0, 100, 65, 1050);

// console.log("mapped hertz is", mappedHertz1)
// console.log("mapped hertz is", mappedHertz2)
// console.log("mapped hertz is", mappedHertz3)
oscillator1.frequency.value = 440;
oscillator2.frequency.value = 554.37;
oscillator3.frequency.value = 659.25;
oscillator4.frequency.value = 880;

console.log("mapped hertz is", key[sliderValue1])
console.log("mapped hertz is", key[sliderValue2])
console.log("mapped hertz is", key[sliderValue3])
console.log("mapped hertz is", key[sliderValue4])

// Great, we have set the initial values for volume and frequency
// let's quickly change on line in the on button function below:


// on button click event
on.addEventListener("click", ()=>{
  if(!oscillatorStarted){
    oscillator1.start(0);
    oscillator2.start(0);
    oscillator3.start(0);
    oscillator4.start(0);
    oscillatorStarted = true;
  }

  // instead of setting full volume:
  // gain.gain.value = 1;
  // let us stay true to the volume slider:
  gain.gain.value = volumeInput.value/100;

});



off.addEventListener("click", ()=>{
  gain.gain.value = 0;
});


// lastly we need to define what should happen when we use the sliders!
volumeRange.addEventListener("input", ()=>{
  gain.gain.value = volumeInput.value/100;
})
frequencyRange1.addEventListener("input", ()=>{
  oscillator1.frequency.value = key[frequencyRange1.value];
})
frequencyRange2.addEventListener("input", ()=>{
  oscillator2.frequency.value = key[frequencyRange2.value];
})
frequencyRange3.addEventListener("input", ()=>{
  oscillator3.frequency.value = key[frequencyRange3.value];
})
frequencyRange4.addEventListener("input", ()=>{
  oscillator4.frequency.value = key[frequencyRange4.value];
})
