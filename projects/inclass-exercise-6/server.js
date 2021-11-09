// console.log("this is a server file");
const express = require('express')
const app = express()
const port = 3000

function ifSomeoneAskForRoot(req, res){
  console.log(req);
  res.sendFile("hello world.")
}

app.get('/', ifSomeoneAskForRoot )

app.get('/leon', (req, res) =>{
  res.send("oh, it's just you. never mind")
})

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})
