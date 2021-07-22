// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;
var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    redScore: document.getElementById('redScore'),
    reset: document.getElementById('reset')
};

//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    databaseURL: "https://scoreboard2383.firebaseio.com/",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  var redListener = firebase.database().ref('red'); 
  redListener.on('value', function(snapshot) {
  red = snapshot.val();
  redScore.innerText = red;
    });

  var offListener = firebase.database().ref('off'); 
  offListener.on('value', function(snapshot) {
  off = snapshot.val();
    });

 

  var timeListener = firebase.database().ref('time'); 
  timeListener.on('value', function(snapshot) {
  time = snapshot.val();
  timer.innerText = time;
    });

ui.timerStart.onclick = function () {
    if(off)
    {

    var startSound = new Audio('startSound.mp3');
    startSound.play();
    firebase.database().ref('off').set(false);
    off = false
    var now = new Date().getTime();
    seconds = Math.floor((now % (1000 * 60)) / 1000);
    minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    secondsDistance = seconds;
    minutesDistance =  minutes + 2;
    
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
    	ui.timer.style.color = "red";
      ui.timer.innerText = "0:00";
      clearTimeout(ti);
    }
    else {
      if(seconds < 10)
      {
      time = minutes +":0" + seconds;
      }
      else
      {
      time = minutes +":" + seconds;
      }
      firebase.database().ref('time').set(time);
    	ui.timer.innerText = time;
      ti = setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

ui.reset.onclick = function () {
    firebase.database().ref('off').set(true);
    off = true;
    clearTimeout(ti);
    firebase.database().ref('time').set('1:30');
    firebase.database().ref('red').set('0');
    firebase.database().ref('blue').set('0');
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        if(red < 999)
        {
        red++;
        firebase.database().ref('red').set(red);
        ui.redScore.innerText = red;
        }
    }


    }

);
//





