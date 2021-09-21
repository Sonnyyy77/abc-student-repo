let timeleft = 11;
let tx = document.getElementById("text");
let downloadTimer = setInterval(function(){
  timeleft--;
  console.log(timeleft);
  if (timeleft>=10){
    tx.textContent = "00:00:"+timeleft;
  }
  if (timeleft<10){
    tx.textContent = "00:00:0"+timeleft;
  }
  if(timeleft <= -1){
    clearInterval(downloadTimer);
    timeleft = 0;
  }
  },1000);
