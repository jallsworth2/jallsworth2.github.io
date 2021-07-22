// Define UI elements
var score;
var color = '';
var data;


let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),

    reset: document.getElementById('reset'),
    redFlag: document.getElementById('redFlag'),
    blueFlag: document.getElementById('blueFlag'),
    add3: document.getElementById('add3'),
    add2: document.getElementById('add2'),
    add1: document.getElementById('add1'),
    sub3: document.getElementById('sub3'),
    sub2: document.getElementById('sub2'),
    sub1: document.getElementById('sub1'),



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
  
  
    

  

ui.redFlag.onclick = function () {
      ui.redFlag.style.display = 'none';
      ui.blueFlag.style.display = 'none';
      //color split     

      var redListener = firebase.database().ref('redPirate'); 
      redListener.on('value', function(snapshot) {
      
      score = snapshot.val();
      ui.score.innerText = score;
      });

      data = 'redPirate'
      ui.score.style.color = "red";
      }

ui.blueFlag.onclick = function () {
      ui.redFlag.style.display = 'none';
      ui.blueFlag.style.display = 'none';
      //color split

      var blueListener = firebase.database().ref('bluePirate'); 
      blueListener.on('value', function(snapshot) {
      
      score = snapshot.val();
      ui.score.innerText = score;
      });

      data = 'bluePirate'
      ui.score.style.color = "blue";
      }

ui.add3.onclick = function () {
      score += 3;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.add2.onclick = function () {
      score += 2;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.add1.onclick = function () {
      score += 1;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }      

ui.sub3.onclick = function () {
      score -= 3;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.sub2.onclick = function () {
      score -= 2;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.sub1.onclick = function () {
      score -= 1;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }


//





