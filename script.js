var lowerPart = document.querySelector(".lower-part");
var time = document.querySelector(".time");
var toint = parseInt(document.querySelector(".time").textContent);
var bValue = document.querySelector(".lower-part");
var hit = document.querySelector(".hit");
var score = document.querySelector(".score");
var bubbles = document.querySelector(".b-value");
var pAgain = document.querySelector("#pagain");
var counter = 60;
var newScore = 0;
var rn;
var pName;


function onload(){
  pName = prompt("Enter Your Name").trim();
}


function makeBubble() {
  var clutter = "";
  for (i = 0; i < 120; i++) {
    let val = Math.floor(Math.random() * 11);
    clutter += `<div class="bubble">
            <div class="b-value">${val}</div>
            </div>`;
  }
  lowerPart.innerHTML = clutter;
}

makeBubble();

// console.log(toint);

function runTimer() {
  var int = setInterval(() => {
    if (counter == 1) {
      clearInterval(int);
      bValue.innerHTML = `<h1>Your Score is: ${newScore}</h1><button id="pagain">Play Again</button><button onclick="displayLeaderboard()" id="leaderboard">Leaderboard</button>`;
    }
    time.textContent = toint - 1;
    toint-=1;
    counter -= 1;
  }, 10000);
}



runTimer();

function hitval() {
  rn = Math.floor(Math.random() * 10);
  hit.textContent = rn;
}

hitval();

// console.log(bValue.target);

function increaseScore() {
  newScore += rn;
  score.textContent = newScore;
}

bValue.addEventListener("click", function (e) {
  // console.log(e.target.textContent)
  if (Number(e.target.textContent) === rn) {
    increaseScore();
    makeBubble();
    hitval();
  }
  if(e.target.id=="pagain"){
    score.textContent = 0;
    newScore = 0;
    counter = 60;
    toint = 60;
    makeBubble();
    runTimer();
    hitval();
  }
  if(e.target.id=="leaderboard"){
    window.location.href = "leaderboard.html";
  }
})


setTimeout(function(){
  let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  if(!pName)
    return;
  
  leaderboardData.push({ name: pName, score: newScore });
    leaderboardData.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
},63000)






