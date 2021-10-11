// console.log("hello");
//
// function repl(find, replace){
//   console.log("replacing", find, "with", replace)
//   // info on the regular expression here: https://www.designcise.com/web/tutorial/how-to-replace-all-occurrences-of-a-word-in-a-javascript-string
//   var finder = new RegExp(find,"g");
//   // we replace the entire website's content with itself, but replace every occurence of
//   // the word that "finder" carries with the word that "replace" carries
//   // e.g. repl("Moon", "Potato")
//   document.body.innerHTML = document.body.innerHTML.replace(finder, replace);
// }
//
// function gotMessage(request, sender, sendResponse){
//   console.log(request);
//   let findWord = request.find;
//   let replaceWord = request.replace;
//   repl(findWord, replaceWord);
// }
//
// chrome.runTime.onMessage.addListener(gotMessage);

// setTimeout(()=>{
//   repl("Nears", "Leon");
// }, 3000)


function repl(find, replace){
  // info on the regular expression here: https://www.designcise.com/web/tutorial/how-to-replace-all-occurrences-of-a-word-in-a-javascript-string
  var finder = new RegExp(find,"g");
  // we replace the entire website's content with itself, but replace every occurence of
  // the word that "finder" carries with the word that "replace" carries
  // e.g. repl("Moon", "Potato")
  document.body.innerHTML = document.body.innerHTML.replace(finder, replace);
}


// funtion to execute when any message arrives
function gotMessage(request, sender, sendResponse){
  // request includes the actual message
  console.log(request);

  // use our replacement function to replace words as instructed by the popup page
  repl(request.find, request.replace)

  // sender lets us know who the message is fro (ie from our popup page)
  // sendResponse is a function and allows us to reply to the sender (our popup page)
  // sendResponse({message: "successfully replaced words!"});

}

// listening for messages:
chrome.runtime.onMessage.addListener(gotMessage);
