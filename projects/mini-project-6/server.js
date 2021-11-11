const express = require('express')
const app = express()
const port = 3010  // glitch: const port = process.env.PORT
const answer = "SLYTHERIN";

// let gifts = [];

app.use(express.static('public'))

//https://fontmeme.com/harry-potter-font/


app.get('/answer', (request, response) => {
  // console.log(request);
  let query = request.query;
  let guess = query.word;
  console.log(query);
  if(guess == answer){
    console.log("welcome to my gallery");
    response.redirect("/right");
    // response.sendFile(__dirname + '/public/garden/index.html')
  }else{
    console.log("wrong answer");
    // response.sendFile(__dirname + '/public/fishy/index.html')
    response.redirect("/wrong");
  }
  console.log("--------")
  // res.sendFile(__dirname + '/index.html')
})


//
// app.get('/script.js', (req, res) => {
//   res.sendFile(__dirname + '/script.js')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
