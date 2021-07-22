// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;
var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

var adder = false;

var endSound = new Audio('laugh.mp3');
var endGame2 = new Audio('space_ghost.mp3');
var endGame = new Audio('movie_1.mp3');
var oneMin = new Audio('1minLeft.mp3');
var What = new Audio('WhatAreYouDoing.mp3');
var heyNow = new Audio('heyNow2.mp3');
var temple = new Audio('Temple.mp3');
var sid = new Audio('Sid.mp3');

let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    redScore: document.getElementById('redScore'),
    reset: document.getElementById('reset'),

    rightPlus: document.getElementById('rightPlus'),
    rightMinus: document.getElementById('rightMinus'),

    leftPlus: document.getElementById('leftPlus'),
    leftMinus: document.getElementById('leftMinus'),
    redAdd: document.getElementById('redAdd'),
    blueAdd: document.getElementById('blueAdd')

};


ui.redAdd.style.display= 'none';
        ui.blueAdd.style.display= 'none';
        ui.rightMinus.style.display = 'none';
        ui.rightPlus.style.display = 'none';
        ui.leftMinus.style.display = 'none';
        ui.leftPlus.style.display = 'none';

//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    databaseURL: "https://scoreboard2383.firebaseio.com/",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  var redListener = firebase.database().ref('redPirate'); 
  redListener.on('value', function(snapshot) {
  red = snapshot.val();
  redScore.innerText = red;
    });

  var offListener = firebase.database().ref('offPirate'); 
  offListener.on('value', function(snapshot) {
  off = snapshot.val();
    });

  

  var timeListener = firebase.database().ref('timePirate'); 
  timeListener.on('value', function(snapshot) {
  time = snapshot.val();
  timer.innerText = time;
    });

ui.timerStart.onclick = function () {
    if(off)
    {

    var startSound = new Audio('startSound.mp3');
    startSound.play();
    firebase.database().ref('offPirate').set(false);
    off = false
    var now = new Date().getTime();
    seconds = Math.floor((now % (1000 * 60)) / 1000);
    minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    secondsDistance = seconds + 30;
    minutesDistance =  minutes + 1;
    
    ui.timer.innerText = time;
    timeDestroyer();
    }
  
}

var timeDestroyer = function(){
    var now = new Date().getTime();
    seconds = Math.floor((now % (1000 * 60)) / 1000);
    minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    seconds = secondsDistance - seconds;
    minutes = minutesDistance - minutes;
    
    if(seconds < 0)
    {
      seconds += 60;
      minutes--;
    }

    if(seconds <1 && minutes <1){
      temple.play();
    	ui.timer.style.color = "red";
      ui.timer.innerText = "0:00";
      clearTimeout(ti);
    }

    

    else {
      if(seconds < 10)
      {
      time = minutes +":0" + seconds;
        if (seconds == 01 && minutes == 1)
        {
           oneMin.play();
        }  
      }

      else
      {
      time = minutes +":" + seconds;
        if (seconds == 33 && minutes <1)
            {
              endGame2.play();
            }  
        else if (seconds == 44 && minutes <1) 
            {
              heyNow.play();
            }   
      }
      firebase.database().ref('timePirate').set(time);
    	ui.timer.innerText = time;
      ti = setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

ui.reset.onclick = function () {
    firebase.database().ref('offPirate').set(true);
    off = true;
    clearTimeout(ti);
    ui.timer.style.color = "red";
    firebase.database().ref('timePirate').set('1:30');
    firebase.database().ref('redPirate').set(0);
    firebase.database().ref('bluePirate').set(0);
}

ui.leftPlus.onclick = function () {
    if(red < 9990)
        {
        red += parseInt(ui.redAdd.value, 1);
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
      }

ui.leftMinus.onclick = function () {
    if(red > -9990)
        {
        red -= parseInt(ui.redAdd.value , 10);
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
      }




document.addEventListener('keydown', function(event) {
    if(event.keyCode == 49) {
        if(red < 9990)
        {
        red += 1;
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
    }

    if(event.keyCode == 50) {
      if(red < 9990)
      {
      red += 2;
      firebase.database().ref('redPirate').set(red);
      ui.redScore.innerText = red;
      }
  }

  if(event.keyCode == 51) {
    if(red < 9990)
    {
    red += 3;
    firebase.database().ref('redPirate').set(red);
    ui.redScore.innerText = red;
    }
}

if(event.keyCode == 81) {
  if(red < 9990)
  {
  red -= 1;
  firebase.database().ref('redPirate').set(red);
  ui.redScore.innerText = red;
  }
}

if(event.keyCode == 87) {
  if(red < 9990)
  {
  red -= 2;
  firebase.database().ref('redPirate').set(red);
  ui.redScore.innerText = red;
  }
}

if(event.keyCode == 69) {
  if(red < 9990)
  {
  red -= 3;
  firebase.database().ref('redPirate').set(red);
  ui.redScore.innerText = red;
  }
}


    else if(event.keyCode == 65) {
        if(!adder)
        {
        ui.redAdd.style.display= 'none';
        ui.blueAdd.style.display= 'none';
        ui.rightMinus.style.display = 'none';
        ui.rightPlus.style.display = 'none';
        ui.leftMinus.style.display = 'none';
        ui.leftPlus.style.display = 'none';

        adder = !adder;
        }

        else
        {
        ui.redAdd.style.display= 'block';
        ui.blueAdd.style.display= 'block';

        ui.rightMinus.style.display = 'block';
        ui.rightPlus.style.display = 'block';

        ui.leftMinus.style.display = 'block';
        ui.leftPlus.style.display = 'block';

        adder = !adder;
        }

    }
}
);
//





