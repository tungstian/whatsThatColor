(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// TO DO:

/*
1. start the game
2. color question shows up
3. user answers y/n
4. once the user selects y/n, check if that is correct
5. if correct, +1 to score. if incorrect, do nothing, go to next color question
6. call randomizing function again
7. if array is finished, show user score / if timer is finished, show user score
*/

var app = {};

// create a function to show instructions
app.handleInstructions = function () {
  var instructions = document.getElementById('instructions');
  var howButton = document.getElementById('howToPlay');
  howButton.addEventListener('click', function () {
    // console.log('Clicked!');
    instructions.classList.remove('hidden');
  });
};

// function to close the instructions modal
app.handleModalClose = function () {
  var closeButton = document.getElementById('back');
  closeButton.addEventListener('click', function () {
    instructions.classList.add('hidden');
  });
};

app.instructionListeners = function () {
  app.handleInstructions();
  app.handleModalClose();
};

// create an array of color names
app.createArrayOfNames = function () {
  app.colors.forEach(function (n) {
    var colorName = n.name;
    app.colorNames.push(colorName);
  });
  // console.log(app.colorNames);
  return app.colorNames;
};

// create an array of color hex codes from the color array
app.createArrayOfHexCodes = function () {
  app.colors.forEach(function (c) {
    // get the value of the 'color' property
    var colorVal = c.color;
    app.colorValues.push(colorVal);
  });
  // this is the array of colors
  return app.colorValues;
};

// choose a color to display in the game
app.randomizeColor = function () {
  app.createArrayOfHexCodes();
  app.randomColor = app.colorValues[Math.floor(Math.random() * app.colorValues.length)];
};

// set the colour of the in-game div to the random colour
app.handleColorDisplay = function () {
  app.randomizeColor();
  // console.log(app.randomColor);
  var background = document.body;

  // set the div to be the random color
  background.style.backgroundColor = app.randomColor;
};

// get a random value from app.colorNames
app.randomizeColorNames = function () {
  app.createArrayOfNames();
  app.randomName = app.colorNames[Math.floor(Math.random() * app.colorNames.length)];
  // console.log(app.randomName);
  return app.randomName;
};

// link the color property and the name property
app.compareColorToName = function () {
  for (var i = 0; i < app.colors.length; i++) {
    if (app.randomColor === app.colorValues[i] && app.randomName === app.colorNames[i]) {
      console.log('the question is right');
      console.log(app.randomColor);
      console.log(app.colors[i].color);
      console.log(app.randomName);
      console.log(app.colors[i].name);
      app.comparison = true;
      // } else {
      // app.randomColor !== app.colors[i].color && app.randomName !== app.colors[i].name;
      // app.comparison = false;
    }
  }
};

// compare the index of the answer key array to the index of the user answers array

// set multiple attributes via a helper function
app.setAttributes = function (el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

// create a progress bar
app.createProgressBar = function () {
  app.setAttributes(app.progressBarWrapper, {
    'id': 'progress',
    'class': 'progress'
  });
  app.setAttributes(app.progressBar, {
    'id': 'progressBar',
    'class': 'progressBar'
  });
  app.progressBarWrapper.appendChild(app.progressBar);

  app.container.appendChild(app.progressBarWrapper);
};

// track how much time is left
app.showTimeLeft = function move() {
  app.createProgressBar();
  var elem = document.getElementById('progressBar');
  var width = 1;
  var id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
};

// setting up the question
app.createQuestion = function () {
  app.main.innerHTML = '';
  app.main.innerHTML = '\n    <h1>Is this <span>' + app.randomName + '?</span></h1>\n\n    <div class="buttonWrapper">\n      <button id ="no">No</button>\n      <button id ="yes">Yes</button>\n    </div>\n  ';
  app.handleLegibility();
};

// change the color of the main elements for legibility
app.handleLegibility = function () {
  if (app.randomColor === '#008B8B' || app.randomColor === '#708090' || app.randomColor === '#A52A2A' || app.randomColor === '#191970') {
    app.main.classList.add('darkBG');
    app.progressBar.classList.add('progressBarDarkBG');
    app.progressBarWrapper.classList.add('.progressBarWrapperDarkBG');
    // document.getElementById('h1').style.color = 'white';
    // console.log('color is dark');
  } else {
    app.main.classList.remove('darkBG');
    app.progressBar.classList.remove('progressBarDarkBG');
    app.progressBarWrapper.classList.remove('.progressBarWrapperDarkBG');
  }
};

/*
create the question:
1. check to see if the colour name matches the hex code
2. clear the <main> HTML elements
3. set the <main> HTML elements to the question
*/
app.handleQuestion = function () {
  app.compareColorToName();
  app.createQuestion();
};

// create the array for the correct answers (answer key)
app.createAnswerKey = function () {
  // app.compareColorToName();
  if (app.comparison === true) {
    app.answerKey.push(true);
  } else {
    app.answerKey.push(false);
  }
};

// we need to get the user's answer
app.handleUserAnswer = function () {
  var yes = document.getElementById('yes');
  var no = document.getElementById('no');

  var userYes = yes.addEventListener('click', function () {
    // set the app.userAnswer variable to "true"
    app.userAnswer = true;
    // add the answer to the userAnswers array
    app.userAnswers.push(true);
    // app.compareAnswers();
    app.newQuestion();
  });

  var userNo = no.addEventListener('click', function () {
    console.log('no');
    // set the app.userAnswer variable to "false"
    app.userAnswer = false;
    // add the answer to the userAnswers array
    app.userAnswers.push(false);
    app.newQuestion();
  });
  app.compareAnswers();
};

app.compareAnswers = function () {
  // console.log('compareAnswers: app.answerKey.length = ' + app.answerKey.length)
  if (app.comparison === app.userAnswer) {
    // console.log('point');
    app.userCorrect++;
  } else if (app.comparison !== app.userAnswer) {
    // app.userCorrect remains the same
    app.userCorrect;
  }
};

/*
to display the question:
1. randomize color names
2. create the question
3. store the correct answer
4. store the user's answer
*/
app.displayQuestion = function () {
  app.randomizeColorNames();
  app.handleQuestion();
  app.createAnswerKey();
  app.handleUserAnswer();
};

/*
display a new question
1. show a new color
2. show a new question
*/
app.newQuestion = function () {
  app.handleColorDisplay();
  app.displayQuestion();
};

// set the game to last 10 seconds
app.gameTimer = function () {
  setTimeout(function () {
    app.main.classList.remove('darkBG');
    // minus 1 from app.answerKey.length because a question flashes at the end before the user gets a chance to answer it
    var questionsAnswered = app.answerKey.length - 1;
    var score = app.userCorrect + '/' + questionsAnswered;
    app.main.innerHTML = '';
    document.body.style.backgroundColor = 'white';

    if (app.userCorrect > 0 && questionsAnswered > 0 && app.userCorrect === questionsAnswered) {
      app.main.innerHTML = '\n        <h1>Way to go! Your score is <span>' + score + '</span></h1>\n      ';
    } else {
      app.main.innerHTML = '\n          <h1>Nice try! Your score is <span>' + score + '</span></h1>\n        ';
    }

    //fade the restart button so that the user doesn't accidentally click it before seeing their score
    setTimeout(function () {
      var buttonWrapper = document.createElement('div');
      buttonWrapper.setAttribute('class', 'buttonWrapper');

      var button = document.createElement('button');
      var buttonText = document.createTextNode('Try again');
      button.setAttribute('id', 'restart');
      button.appendChild(buttonText);

      buttonWrapper.appendChild(button);

      buttonWrapper.classList.add('fade-in');
      app.main.appendChild(buttonWrapper);
      app.gameRestart();
    }, 1500);
    app.container.innerHTML = '';
  }, 10000);
};

app.gameRestart = function () {
  var restart = document.getElementById('restart');
  restart.addEventListener('click', function () {
    app.main.innerHTML = '\n        <h1>What\'s that<span>css colour?</span></h1>\n        <div class="buttonWrapper">\n          <button id ="howToPlay">How to play</button>\n          <button id ="start">Start!</button>\n        </div>\n      ';
    app.handleGameStart();
    app.instructionListeners();
    // reset the arrays for the answer key and the user's answers
    app.answerKey = [];
    app.userAnswers = [];
    app.colorNames = [];
    app.colorValues = [];
  });
};

app.handleGameStart = function () {
  var startButton = document.getElementById('start');
  startButton.addEventListener('click', function () {

    // show a color
    app.handleColorDisplay();
    // show a question
    app.displayQuestion();
    // run the timer
    app.gameTimer();
    app.showTimeLeft();

    // we have to reset app.userCorrect to 0 because the user's clicks log as "true" and affect the values of the count.
    app.userCorrect = 0;
  });
};

// Change the favicon
// Create array of icons
app.favicon = function () {
  var current = 0;
  var icons = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png'];
  // Every 1.5 seconds, switch icon
  setInterval(function () {
    // Determine the next icon
    var icon = ++current % icons.length;
    // Grab the URL to use
    var url = icons[icon];
    // Update the favicon
    document.getElementById('icon1').href = url;
    document.getElementById('icon2').href = url;
  }, 1500);
};

app.init = function () {
  // global variables
  app.colorValues = [];
  app.colorNames = [];
  app.buttonWrapper = document.getElementsByClassName('buttonWrapper');
  app.button = document.querySelector('button');
  app.main = document.querySelector('main');
  app.container = document.getElementById('container');
  app.progressBarWrapper = document.createElement('div');
  app.progressBar = document.createElement('div');
  app.answerKey = [];
  app.userAnswers = [];
  app.comparison;
  app.userAnswer;
  app.userCorrect;

  app.colors = [{
    color: '#F0F8FF',
    name: 'Alice blue'
  }, {
    color: '#708090',
    name: 'Slate grey'
  }, {
    color: '#DCDCDC',
    name: 'Gainsboro'
  }, {
    color: '#008B8B',
    name: 'Dark cyan'
  }, {
    color: '#7FFF00',
    name: 'Chartreuse'
  }, {
    color: '#A52A2A',
    name: 'Brown'
  }, {
    color: '#DAA520',
    name: 'Goldenrod'
  }, {
    color: '#FF6347',
    name: 'Tomato'
  }, {
    color: '#191970',
    name: 'Midnight blue'
  }, {
    color: '#FA8072',
    name: 'Salmon'
  }, {
    color: '#FFDAB9',
    name: 'Peach puff'
  }, {
    color: '#FFFFE0',
    name: 'Light yellow'
  }, {
    color: '#FF00FF',
    name: 'Fuschia'
  }, {
    color: '#DDA0DD',
    name: 'Plum'
  }];

  app.instructionListeners();
  app.handleGameStart();
  app.favicon();
};

document.addEventListener('DOMContentLoaded', function () {
  // console.log('ready!');
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBOzs7Ozs7Ozs7O0FBV0EsSUFBTSxNQUFNLEVBQVo7O0FBRUE7QUFDQSxJQUFJLGtCQUFKLEdBQXlCLFlBQU07QUFDN0IsTUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQUFyQjtBQUNBLE1BQU0sWUFBWSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEI7QUFDQSxZQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQVc7QUFDN0M7QUFDQSxpQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLFFBQTlCO0FBQ0QsR0FIRDtBQUlELENBUEQ7O0FBU0E7QUFDQSxJQUFJLGdCQUFKLEdBQXVCLFlBQU07QUFDM0IsTUFBTSxjQUFjLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFwQjtBQUNBLGNBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBVztBQUMvQyxpQkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCO0FBQ0QsR0FGRDtBQUdELENBTEQ7O0FBT0EsSUFBSSxvQkFBSixHQUEyQixZQUFNO0FBQy9CLE1BQUksa0JBQUo7QUFDQSxNQUFJLGdCQUFKO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksa0JBQUosR0FBeUIsWUFBTTtBQUM3QixNQUFJLE1BQUosQ0FBVyxPQUFYLENBQW1CLFVBQVMsQ0FBVCxFQUFZO0FBQzdCLFFBQU0sWUFBWSxFQUFFLElBQXBCO0FBQ0EsUUFBSSxVQUFKLENBQWUsSUFBZixDQUFvQixTQUFwQjtBQUNELEdBSEQ7QUFJQTtBQUNBLFNBQU8sSUFBSSxVQUFYO0FBQ0QsQ0FQRDs7QUFTQTtBQUNBLElBQUkscUJBQUosR0FBNEIsWUFBTTtBQUNoQyxNQUFJLE1BQUosQ0FBVyxPQUFYLENBQW1CLFVBQVMsQ0FBVCxFQUFZO0FBQzdCO0FBQ0EsUUFBTSxXQUFXLEVBQUUsS0FBbkI7QUFDQSxRQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBcUIsUUFBckI7QUFDRCxHQUpEO0FBS0E7QUFDQSxTQUFPLElBQUksV0FBWDtBQUNELENBUkQ7O0FBVUE7QUFDQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN6QixNQUFJLHFCQUFKO0FBQ0EsTUFBSSxXQUFKLEdBQWtCLElBQUksV0FBSixDQUFnQixLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxXQUFKLENBQWdCLE1BQTNDLENBQWhCLENBQWxCO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksa0JBQUosR0FBeUIsWUFBTTtBQUM3QixNQUFJLGNBQUo7QUFDQTtBQUNBLE1BQU0sYUFBYSxTQUFTLElBQTVCOztBQUVBO0FBQ0EsYUFBVyxLQUFYLENBQWlCLGVBQWpCLEdBQW1DLElBQUksV0FBdkM7QUFDRCxDQVBEOztBQVNBO0FBQ0EsSUFBSSxtQkFBSixHQUEwQixZQUFNO0FBQzlCLE1BQUksa0JBQUo7QUFDQSxNQUFJLFVBQUosR0FBaUIsSUFBSSxVQUFKLENBQWUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLElBQUksVUFBSixDQUFlLE1BQTFDLENBQWYsQ0FBakI7QUFDQTtBQUNBLFNBQU8sSUFBSSxVQUFYO0FBQ0QsQ0FMRDs7QUFPQTtBQUNBLElBQUksa0JBQUosR0FBeUIsWUFBTTtBQUM3QixPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksSUFBSSxNQUFKLENBQVcsTUFBL0IsRUFBdUMsR0FBdkMsRUFBNEM7QUFDMUMsUUFBSSxJQUFJLFdBQUosS0FBb0IsSUFBSSxXQUFKLENBQWdCLENBQWhCLENBQXBCLElBQTBDLElBQUksVUFBSixLQUFtQixJQUFJLFVBQUosQ0FBZSxDQUFmLENBQWpFLEVBQW9GO0FBQ2xGLGNBQVEsR0FBUixDQUFZLHVCQUFaO0FBQ0EsY0FBUSxHQUFSLENBQVksSUFBSSxXQUFoQjtBQUNBLGNBQVEsR0FBUixDQUFZLElBQUksTUFBSixDQUFXLENBQVgsRUFBYyxLQUExQjtBQUNBLGNBQVEsR0FBUixDQUFZLElBQUksVUFBaEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxJQUFJLE1BQUosQ0FBVyxDQUFYLEVBQWMsSUFBMUI7QUFDQSxVQUFJLFVBQUosR0FBaUIsSUFBakI7QUFDRjtBQUNFO0FBQ0E7QUFDRDtBQUNGO0FBQ0YsQ0FkRDs7QUFnQkE7O0FBRUE7QUFDQSxJQUFJLGFBQUosR0FBb0IsVUFBQyxFQUFELEVBQUssS0FBTCxFQUFlO0FBQ2pDLE9BQUksSUFBSSxHQUFSLElBQWUsS0FBZixFQUFzQjtBQUNwQixPQUFHLFlBQUgsQ0FBZ0IsR0FBaEIsRUFBcUIsTUFBTSxHQUFOLENBQXJCO0FBQ0Q7QUFDRixDQUpEOztBQU1BO0FBQ0EsSUFBSSxpQkFBSixHQUF3QixZQUFNO0FBQzVCLE1BQUksYUFBSixDQUNFLElBQUksa0JBRE4sRUFFRTtBQUNFLFVBQU0sVUFEUjtBQUVFLGFBQVM7QUFGWCxHQUZGO0FBT0EsTUFBSSxhQUFKLENBQ0UsSUFBSSxXQUROLEVBRUU7QUFDRSxVQUFNLGFBRFI7QUFFRSxhQUFTO0FBRlgsR0FGRjtBQU9BLE1BQUksa0JBQUosQ0FBdUIsV0FBdkIsQ0FBbUMsSUFBSSxXQUF2Qzs7QUFFQSxNQUFJLFNBQUosQ0FBYyxXQUFkLENBQTBCLElBQUksa0JBQTlCO0FBQ0QsQ0FsQkQ7O0FBdUJBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFNBQVMsSUFBVCxHQUFnQjtBQUNqQyxNQUFJLGlCQUFKO0FBQ0EsTUFBTSxPQUFPLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFiO0FBQ0EsTUFBSSxRQUFRLENBQVo7QUFDQSxNQUFJLEtBQUssWUFBWSxLQUFaLEVBQW1CLEdBQW5CLENBQVQ7QUFDQSxXQUFTLEtBQVQsR0FBaUI7QUFDZixRQUFJLFNBQVMsR0FBYixFQUFrQjtBQUNoQixvQkFBYyxFQUFkO0FBQ0QsS0FGRCxNQUVPO0FBQ0w7QUFDQSxXQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLFFBQVEsR0FBM0I7QUFDRDtBQUNGO0FBQ0YsQ0FiRDs7QUFnQkE7QUFDQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN6QixNQUFJLElBQUosQ0FBUyxTQUFULEdBQXNCLEVBQXRCO0FBQ0EsTUFBSSxJQUFKLENBQVMsU0FBVCxnQ0FFc0IsSUFBSSxVQUYxQjtBQVNBLE1BQUksZ0JBQUo7QUFDRCxDQVpEOztBQWVBO0FBQ0EsSUFBSSxnQkFBSixHQUF1QixZQUFNO0FBQzNCLE1BQUksSUFBSSxXQUFKLEtBQW9CLFNBQXBCLElBQ0EsSUFBSSxXQUFKLEtBQW9CLFNBRHBCLElBRUEsSUFBSSxXQUFKLEtBQW9CLFNBRnBCLElBR0EsSUFBSSxXQUFKLEtBQW9CLFNBSHhCLEVBSUk7QUFDRSxRQUFJLElBQUosQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLFFBQXZCO0FBQ0EsUUFBSSxXQUFKLENBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLG1CQUE5QjtBQUNBLFFBQUksa0JBQUosQ0FBdUIsU0FBdkIsQ0FBaUMsR0FBakMsQ0FBcUMsMkJBQXJDO0FBQ0E7QUFDQTtBQUNELEdBVkwsTUFVVztBQUNMLFFBQUksSUFBSixDQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsUUFBMUI7QUFDQSxRQUFJLFdBQUosQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsbUJBQWpDO0FBQ0EsUUFBSSxrQkFBSixDQUF1QixTQUF2QixDQUFpQyxNQUFqQyxDQUF3QywyQkFBeEM7QUFDRDtBQUNOLENBaEJEOztBQWtCQTs7Ozs7O0FBTUEsSUFBSSxjQUFKLEdBQXFCLFlBQU07QUFDekIsTUFBSSxrQkFBSjtBQUNBLE1BQUksY0FBSjtBQUNELENBSEQ7O0FBS0E7QUFDQSxJQUFJLGVBQUosR0FBc0IsWUFBTTtBQUMxQjtBQUNBLE1BQUksSUFBSSxVQUFKLEtBQW1CLElBQXZCLEVBQTZCO0FBQzNCLFFBQUksU0FBSixDQUFjLElBQWQsQ0FBbUIsSUFBbkI7QUFDRCxHQUZELE1BRU87QUFDTCxRQUFJLFNBQUosQ0FBYyxJQUFkLENBQW1CLEtBQW5CO0FBQ0Q7QUFDRixDQVBEOztBQVNBO0FBQ0EsSUFBSSxnQkFBSixHQUF1QixZQUFNO0FBQzNCLE1BQU0sTUFBTSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBWjtBQUNBLE1BQU0sS0FBSyxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsQ0FBWDs7QUFFQSxNQUFNLFVBQVUsSUFBSSxnQkFBSixDQUFxQixPQUFyQixFQUE4QixZQUFXO0FBQ3ZEO0FBQ0EsUUFBSSxVQUFKLEdBQWlCLElBQWpCO0FBQ0E7QUFDQSxRQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckI7QUFDQTtBQUNBLFFBQUksV0FBSjtBQUNELEdBUGUsQ0FBaEI7O0FBU0EsTUFBTSxTQUFTLEdBQUcsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBVztBQUNyRCxZQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0E7QUFDQSxRQUFJLFVBQUosR0FBaUIsS0FBakI7QUFDQTtBQUNBLFFBQUksV0FBSixDQUFnQixJQUFoQixDQUFxQixLQUFyQjtBQUNBLFFBQUksV0FBSjtBQUNELEdBUGMsQ0FBZjtBQVFBLE1BQUksY0FBSjtBQUNELENBdEJEOztBQXdCQSxJQUFJLGNBQUosR0FBcUIsWUFBTTtBQUN6QjtBQUNBLE1BQUksSUFBSSxVQUFKLEtBQW1CLElBQUksVUFBM0IsRUFBdUM7QUFDckM7QUFDQSxRQUFJLFdBQUo7QUFDRCxHQUhELE1BR08sSUFBSSxJQUFJLFVBQUosS0FBbUIsSUFBSSxVQUEzQixFQUF1QztBQUM1QztBQUNBLFFBQUksV0FBSjtBQUNEO0FBQ0YsQ0FURDs7QUFXQTs7Ozs7OztBQU9BLElBQUksZUFBSixHQUFzQixZQUFNO0FBQzFCLE1BQUksbUJBQUo7QUFDQSxNQUFJLGNBQUo7QUFDQSxNQUFJLGVBQUo7QUFDQSxNQUFJLGdCQUFKO0FBQ0QsQ0FMRDs7QUFPQTs7Ozs7QUFLQSxJQUFJLFdBQUosR0FBa0IsWUFBTTtBQUN0QixNQUFJLGtCQUFKO0FBQ0EsTUFBSSxlQUFKO0FBQ0QsQ0FIRDs7QUFNQTtBQUNBLElBQUksU0FBSixHQUFnQixZQUFNO0FBQ3BCLGFBQVcsWUFBVztBQUNwQixRQUFJLElBQUosQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLFFBQTFCO0FBQ0E7QUFDQSxRQUFNLG9CQUFvQixJQUFJLFNBQUosQ0FBYyxNQUFkLEdBQXFCLENBQS9DO0FBQ0EsUUFBTSxRQUFZLElBQUksV0FBaEIsU0FBK0IsaUJBQXJDO0FBQ0EsUUFBSSxJQUFKLENBQVMsU0FBVCxHQUFzQixFQUF0QjtBQUNBLGFBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsZUFBcEIsR0FBc0MsT0FBdEM7O0FBRUEsUUFBSSxJQUFJLFdBQUosR0FBa0IsQ0FBbEIsSUFBdUIsb0JBQW9CLENBQTNDLElBQWdELElBQUksV0FBSixLQUFvQixpQkFBeEUsRUFBNEY7QUFDMUYsVUFBSSxJQUFKLENBQVMsU0FBVCxxREFFdUMsS0FGdkM7QUFJRCxLQUxELE1BS087QUFDTCxVQUFJLElBQUosQ0FBUyxTQUFULHNEQUV3QyxLQUZ4QztBQUlEOztBQUVEO0FBQ0EsZUFBVyxZQUFXO0FBQ3BCLFVBQU0sZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtBQUNBLG9CQUFjLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsZUFBcEM7O0FBRUEsVUFBTSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsVUFBTSxhQUFhLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFuQjtBQUNBLGFBQU8sWUFBUCxDQUFvQixJQUFwQixFQUEwQixTQUExQjtBQUNBLGFBQU8sV0FBUCxDQUFtQixVQUFuQjs7QUFFQSxvQkFBYyxXQUFkLENBQTBCLE1BQTFCOztBQUVBLG9CQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsU0FBNUI7QUFDQSxVQUFJLElBQUosQ0FBUyxXQUFULENBQXFCLGFBQXJCO0FBQ0EsVUFBSSxXQUFKO0FBQ0QsS0FkRCxFQWNHLElBZEg7QUFlQSxRQUFJLFNBQUosQ0FBYyxTQUFkLEdBQTJCLEVBQTNCO0FBQ0QsR0FyQ0QsRUFxQ0csS0FyQ0g7QUFzQ0QsQ0F2Q0Q7O0FBeUNBLElBQUksV0FBSixHQUFrQixZQUFNO0FBQ3RCLE1BQU0sVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBaEI7QUFDQSxVQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQVc7QUFDM0MsUUFBSSxJQUFKLENBQVMsU0FBVDtBQVFGLFFBQUksZUFBSjtBQUNBLFFBQUksb0JBQUo7QUFDQTtBQUNBLFFBQUksU0FBSixHQUFnQixFQUFoQjtBQUNBLFFBQUksV0FBSixHQUFrQixFQUFsQjtBQUNBLFFBQUksVUFBSixHQUFpQixFQUFqQjtBQUNBLFFBQUksV0FBSixHQUFrQixFQUFsQjtBQUNDLEdBaEJEO0FBaUJELENBbkJEOztBQXNCQSxJQUFJLGVBQUosR0FBc0IsWUFBTTtBQUMxQixNQUFNLGNBQWMsU0FBUyxjQUFULENBQXdCLE9BQXhCLENBQXBCO0FBQ0EsY0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFXOztBQUUvQztBQUNBLFFBQUksa0JBQUo7QUFDQTtBQUNBLFFBQUksZUFBSjtBQUNBO0FBQ0EsUUFBSSxTQUFKO0FBQ0EsUUFBSSxZQUFKOztBQUVBO0FBQ0EsUUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0QsR0FaRDtBQWFELENBZkQ7O0FBaUJBO0FBQ0E7QUFDQSxJQUFJLE9BQUosR0FBYyxZQUFNO0FBQ2xCLE1BQUksVUFBVSxDQUFkO0FBQ0EsTUFBSSxRQUFRLENBQ1YsY0FEVSxFQUVWLGNBRlUsRUFHVixjQUhVLEVBSVYsY0FKVSxFQUtWLGNBTFUsRUFNVixjQU5VLEVBT1YsY0FQVSxFQVFWLGNBUlUsRUFTVixjQVRVLEVBVVYsZUFWVSxDQUFaO0FBWUE7QUFDQSxjQUFZLFlBQVk7QUFDcEI7QUFDQSxRQUFJLE9BQVEsRUFBRSxPQUFGLEdBQVksTUFBTSxNQUE5QjtBQUNBO0FBQ0EsUUFBSSxNQUFNLE1BQU0sSUFBTixDQUFWO0FBQ0E7QUFDQSxhQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsR0FBd0MsR0FBeEM7QUFDQSxhQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsR0FBd0MsR0FBeEM7QUFDSCxHQVJELEVBUUcsSUFSSDtBQVNELENBeEJEOztBQTRCQSxJQUFJLElBQUosR0FBVyxZQUFNO0FBQ2Y7QUFDQSxNQUFJLFdBQUosR0FBa0IsRUFBbEI7QUFDQSxNQUFJLFVBQUosR0FBaUIsRUFBakI7QUFDQSxNQUFJLGFBQUosR0FBb0IsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxDQUFwQjtBQUNBLE1BQUksTUFBSixHQUFhLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsTUFBSSxJQUFKLEdBQVcsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVg7QUFDQSxNQUFJLFNBQUosR0FBZ0IsU0FBUyxjQUFULENBQXdCLFdBQXhCLENBQWhCO0FBQ0EsTUFBSSxrQkFBSixHQUF5QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFDQSxNQUFJLFdBQUosR0FBa0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0EsTUFBSSxTQUFKLEdBQWdCLEVBQWhCO0FBQ0EsTUFBSSxXQUFKLEdBQWtCLEVBQWxCO0FBQ0EsTUFBSSxVQUFKO0FBQ0EsTUFBSSxVQUFKO0FBQ0EsTUFBSSxXQUFKOztBQUlBLE1BQUksTUFBSixHQUFhLENBQ1g7QUFDRSxXQUFPLFNBRFQ7QUFFRSxVQUFNO0FBRlIsR0FEVyxFQUtYO0FBQ0UsV0FBTyxTQURUO0FBRUUsVUFBTTtBQUZSLEdBTFcsRUFTWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQVRXLEVBYVg7QUFDRSxXQUFPLFNBRFQ7QUFFRSxVQUFNO0FBRlIsR0FiVyxFQWlCWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQWpCVyxFQXFCWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQXJCVyxFQXlCWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQXpCVyxFQTZCWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQTdCVyxFQWlDWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQWpDVyxFQXFDWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQXJDVyxFQXlDWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQXpDVyxFQTZDWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQTdDVyxFQWlEWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQWpEVyxFQXFEWDtBQUNFLFdBQU8sU0FEVDtBQUVFLFVBQU07QUFGUixHQXJEVyxDQUFiOztBQTJEQSxNQUFJLG9CQUFKO0FBQ0EsTUFBSSxlQUFKO0FBQ0EsTUFBSSxPQUFKO0FBQ0QsQ0FoRkQ7O0FBa0ZBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDckQ7QUFDRixNQUFJLElBQUo7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVE8gRE86XG5cbi8qXG4xLiBzdGFydCB0aGUgZ2FtZVxuMi4gY29sb3IgcXVlc3Rpb24gc2hvd3MgdXBcbjMuIHVzZXIgYW5zd2VycyB5L25cbjQuIG9uY2UgdGhlIHVzZXIgc2VsZWN0cyB5L24sIGNoZWNrIGlmIHRoYXQgaXMgY29ycmVjdFxuNS4gaWYgY29ycmVjdCwgKzEgdG8gc2NvcmUuIGlmIGluY29ycmVjdCwgZG8gbm90aGluZywgZ28gdG8gbmV4dCBjb2xvciBxdWVzdGlvblxuNi4gY2FsbCByYW5kb21pemluZyBmdW5jdGlvbiBhZ2FpblxuNy4gaWYgYXJyYXkgaXMgZmluaXNoZWQsIHNob3cgdXNlciBzY29yZSAvIGlmIHRpbWVyIGlzIGZpbmlzaGVkLCBzaG93IHVzZXIgc2NvcmVcbiovXG5cblxuY29uc3QgYXBwID0ge307XG5cbi8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRvIHNob3cgaW5zdHJ1Y3Rpb25zXG5hcHAuaGFuZGxlSW5zdHJ1Y3Rpb25zID0gKCkgPT4ge1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XG4gIGNvbnN0IGhvd0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3dUb1BsYXknKTtcbiAgaG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0NsaWNrZWQhJyk7XG4gICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9KTtcbn1cblxuLy8gZnVuY3Rpb24gdG8gY2xvc2UgdGhlIGluc3RydWN0aW9ucyBtb2RhbFxuYXBwLmhhbmRsZU1vZGFsQ2xvc2UgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2snKTtcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIH0pO1xufVxuXG5hcHAuaW5zdHJ1Y3Rpb25MaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIGFwcC5oYW5kbGVJbnN0cnVjdGlvbnMoKTtcbiAgYXBwLmhhbmRsZU1vZGFsQ2xvc2UoKTtcbn1cblxuLy8gY3JlYXRlIGFuIGFycmF5IG9mIGNvbG9yIG5hbWVzXG5hcHAuY3JlYXRlQXJyYXlPZk5hbWVzID0gKCkgPT4ge1xuICBhcHAuY29sb3JzLmZvckVhY2goZnVuY3Rpb24obikge1xuICAgIGNvbnN0IGNvbG9yTmFtZSA9IG4ubmFtZTtcbiAgICBhcHAuY29sb3JOYW1lcy5wdXNoKGNvbG9yTmFtZSk7XG4gIH0pO1xuICAvLyBjb25zb2xlLmxvZyhhcHAuY29sb3JOYW1lcyk7XG4gIHJldHVybihhcHAuY29sb3JOYW1lcyk7XG59XG5cbi8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjb2xvciBoZXggY29kZXMgZnJvbSB0aGUgY29sb3IgYXJyYXlcbmFwcC5jcmVhdGVBcnJheU9mSGV4Q29kZXMgPSAoKSA9PiB7XG4gIGFwcC5jb2xvcnMuZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgLy8gZ2V0IHRoZSB2YWx1ZSBvZiB0aGUgJ2NvbG9yJyBwcm9wZXJ0eVxuICAgIGNvbnN0IGNvbG9yVmFsID0gYy5jb2xvcjtcbiAgICBhcHAuY29sb3JWYWx1ZXMucHVzaChjb2xvclZhbCk7XG4gIH0pO1xuICAvLyB0aGlzIGlzIHRoZSBhcnJheSBvZiBjb2xvcnNcbiAgcmV0dXJuIGFwcC5jb2xvclZhbHVlcztcbn1cblxuLy8gY2hvb3NlIGEgY29sb3IgdG8gZGlzcGxheSBpbiB0aGUgZ2FtZVxuYXBwLnJhbmRvbWl6ZUNvbG9yID0gKCkgPT4ge1xuICBhcHAuY3JlYXRlQXJyYXlPZkhleENvZGVzKCk7XG4gIGFwcC5yYW5kb21Db2xvciA9IGFwcC5jb2xvclZhbHVlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuY29sb3JWYWx1ZXMubGVuZ3RoKV07XG59XG5cbi8vIHNldCB0aGUgY29sb3VyIG9mIHRoZSBpbi1nYW1lIGRpdiB0byB0aGUgcmFuZG9tIGNvbG91clxuYXBwLmhhbmRsZUNvbG9yRGlzcGxheSA9ICgpID0+IHtcbiAgYXBwLnJhbmRvbWl6ZUNvbG9yKCk7XG4gIC8vIGNvbnNvbGUubG9nKGFwcC5yYW5kb21Db2xvcik7XG4gIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5ib2R5O1xuXG4gIC8vIHNldCB0aGUgZGl2IHRvIGJlIHRoZSByYW5kb20gY29sb3JcbiAgYmFja2dyb3VuZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBhcHAucmFuZG9tQ29sb3I7XG59XG5cbi8vIGdldCBhIHJhbmRvbSB2YWx1ZSBmcm9tIGFwcC5jb2xvck5hbWVzXG5hcHAucmFuZG9taXplQ29sb3JOYW1lcyA9ICgpID0+IHtcbiAgYXBwLmNyZWF0ZUFycmF5T2ZOYW1lcygpO1xuICBhcHAucmFuZG9tTmFtZSA9IGFwcC5jb2xvck5hbWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFwcC5jb2xvck5hbWVzLmxlbmd0aCldO1xuICAvLyBjb25zb2xlLmxvZyhhcHAucmFuZG9tTmFtZSk7XG4gIHJldHVybiBhcHAucmFuZG9tTmFtZTtcbn1cblxuLy8gbGluayB0aGUgY29sb3IgcHJvcGVydHkgYW5kIHRoZSBuYW1lIHByb3BlcnR5XG5hcHAuY29tcGFyZUNvbG9yVG9OYW1lID0gKCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFwcC5jb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXBwLnJhbmRvbUNvbG9yID09PSBhcHAuY29sb3JWYWx1ZXNbaV0gJiYgYXBwLnJhbmRvbU5hbWUgPT09IGFwcC5jb2xvck5hbWVzW2ldKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhlIHF1ZXN0aW9uIGlzIHJpZ2h0Jyk7XG4gICAgICBjb25zb2xlLmxvZyhhcHAucmFuZG9tQ29sb3IpO1xuICAgICAgY29uc29sZS5sb2coYXBwLmNvbG9yc1tpXS5jb2xvcik7XG4gICAgICBjb25zb2xlLmxvZyhhcHAucmFuZG9tTmFtZSk7XG4gICAgICBjb25zb2xlLmxvZyhhcHAuY29sb3JzW2ldLm5hbWUpO1xuICAgICAgYXBwLmNvbXBhcmlzb24gPSB0cnVlO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyBhcHAucmFuZG9tQ29sb3IgIT09IGFwcC5jb2xvcnNbaV0uY29sb3IgJiYgYXBwLnJhbmRvbU5hbWUgIT09IGFwcC5jb2xvcnNbaV0ubmFtZTtcbiAgICAgIC8vIGFwcC5jb21wYXJpc29uID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbi8vIGNvbXBhcmUgdGhlIGluZGV4IG9mIHRoZSBhbnN3ZXIga2V5IGFycmF5IHRvIHRoZSBpbmRleCBvZiB0aGUgdXNlciBhbnN3ZXJzIGFycmF5XG5cbi8vIHNldCBtdWx0aXBsZSBhdHRyaWJ1dGVzIHZpYSBhIGhlbHBlciBmdW5jdGlvblxuYXBwLnNldEF0dHJpYnV0ZXMgPSAoZWwsIGF0dHJzKSA9PiB7XG4gIGZvcihsZXQga2V5IGluIGF0dHJzKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gIH1cbn1cblxuLy8gY3JlYXRlIGEgcHJvZ3Jlc3MgYmFyXG5hcHAuY3JlYXRlUHJvZ3Jlc3NCYXIgPSAoKSA9PiB7XG4gIGFwcC5zZXRBdHRyaWJ1dGVzKFxuICAgIGFwcC5wcm9ncmVzc0JhcldyYXBwZXIsXG4gICAge1xuICAgICAgJ2lkJzogJ3Byb2dyZXNzJyxcbiAgICAgICdjbGFzcyc6ICdwcm9ncmVzcydcbiAgICB9XG4gICk7XG4gIGFwcC5zZXRBdHRyaWJ1dGVzKFxuICAgIGFwcC5wcm9ncmVzc0JhcixcbiAgICB7XG4gICAgICAnaWQnOiAncHJvZ3Jlc3NCYXInLFxuICAgICAgJ2NsYXNzJzogJ3Byb2dyZXNzQmFyJ1xuICAgIH1cbiAgKTtcbiAgYXBwLnByb2dyZXNzQmFyV3JhcHBlci5hcHBlbmRDaGlsZChhcHAucHJvZ3Jlc3NCYXIpO1xuXG4gIGFwcC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwLnByb2dyZXNzQmFyV3JhcHBlcik7XG59XG5cblxuXG5cbi8vIHRyYWNrIGhvdyBtdWNoIHRpbWUgaXMgbGVmdFxuYXBwLnNob3dUaW1lTGVmdCA9IGZ1bmN0aW9uIG1vdmUoKSB7XG4gIGFwcC5jcmVhdGVQcm9ncmVzc0JhcigpO1xuICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzQmFyJyk7XG4gIGxldCB3aWR0aCA9IDE7XG4gIGxldCBpZCA9IHNldEludGVydmFsKGZyYW1lLCAxMDApO1xuICBmdW5jdGlvbiBmcmFtZSgpIHtcbiAgICBpZiAod2lkdGggPj0gMTAwKSB7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGgrKztcbiAgICAgIGVsZW0uc3R5bGUud2lkdGggPSB3aWR0aCArICclJztcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBzZXR0aW5nIHVwIHRoZSBxdWVzdGlvblxuYXBwLmNyZWF0ZVF1ZXN0aW9uID0gKCkgPT4ge1xuICBhcHAubWFpbi5pbm5lckhUTUwgPSAoJycpO1xuICBhcHAubWFpbi5pbm5lckhUTUwgPVxuICAoYFxuICAgIDxoMT5JcyB0aGlzIDxzcGFuPiR7YXBwLnJhbmRvbU5hbWV9Pzwvc3Bhbj48L2gxPlxuXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbldyYXBwZXJcIj5cbiAgICAgIDxidXR0b24gaWQgPVwibm9cIj5ObzwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBpZCA9XCJ5ZXNcIj5ZZXM8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCk7XG4gIGFwcC5oYW5kbGVMZWdpYmlsaXR5KCk7XG59XG5cblxuLy8gY2hhbmdlIHRoZSBjb2xvciBvZiB0aGUgbWFpbiBlbGVtZW50cyBmb3IgbGVnaWJpbGl0eVxuYXBwLmhhbmRsZUxlZ2liaWxpdHkgPSAoKSA9PiB7XG4gIGlmIChhcHAucmFuZG9tQ29sb3IgPT09ICcjMDA4QjhCJyB8fFxuICAgICAgYXBwLnJhbmRvbUNvbG9yID09PSAnIzcwODA5MCcgfHxcbiAgICAgIGFwcC5yYW5kb21Db2xvciA9PT0gJyNBNTJBMkEnIHx8XG4gICAgICBhcHAucmFuZG9tQ29sb3IgPT09ICcjMTkxOTcwJyApXG4gICAgICB7XG4gICAgICAgIGFwcC5tYWluLmNsYXNzTGlzdC5hZGQoJ2RhcmtCRycpO1xuICAgICAgICBhcHAucHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3NCYXJEYXJrQkcnKTtcbiAgICAgICAgYXBwLnByb2dyZXNzQmFyV3JhcHBlci5jbGFzc0xpc3QuYWRkKCcucHJvZ3Jlc3NCYXJXcmFwcGVyRGFya0JHJyk7XG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoMScpLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvbG9yIGlzIGRhcmsnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcC5tYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmtCRycpO1xuICAgICAgICBhcHAucHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LnJlbW92ZSgncHJvZ3Jlc3NCYXJEYXJrQkcnKTtcbiAgICAgICAgYXBwLnByb2dyZXNzQmFyV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCcucHJvZ3Jlc3NCYXJXcmFwcGVyRGFya0JHJyk7XG4gICAgICB9XG59XG5cbi8qXG5jcmVhdGUgdGhlIHF1ZXN0aW9uOlxuMS4gY2hlY2sgdG8gc2VlIGlmIHRoZSBjb2xvdXIgbmFtZSBtYXRjaGVzIHRoZSBoZXggY29kZVxuMi4gY2xlYXIgdGhlIDxtYWluPiBIVE1MIGVsZW1lbnRzXG4zLiBzZXQgdGhlIDxtYWluPiBIVE1MIGVsZW1lbnRzIHRvIHRoZSBxdWVzdGlvblxuKi9cbmFwcC5oYW5kbGVRdWVzdGlvbiA9ICgpID0+IHtcbiAgYXBwLmNvbXBhcmVDb2xvclRvTmFtZSgpO1xuICBhcHAuY3JlYXRlUXVlc3Rpb24oKTtcbn1cblxuLy8gY3JlYXRlIHRoZSBhcnJheSBmb3IgdGhlIGNvcnJlY3QgYW5zd2VycyAoYW5zd2VyIGtleSlcbmFwcC5jcmVhdGVBbnN3ZXJLZXkgPSAoKSA9PiB7XG4gIC8vIGFwcC5jb21wYXJlQ29sb3JUb05hbWUoKTtcbiAgaWYgKGFwcC5jb21wYXJpc29uID09PSB0cnVlKSB7XG4gICAgYXBwLmFuc3dlcktleS5wdXNoKHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGFwcC5hbnN3ZXJLZXkucHVzaChmYWxzZSk7XG4gIH1cbn1cblxuLy8gd2UgbmVlZCB0byBnZXQgdGhlIHVzZXIncyBhbnN3ZXJcbmFwcC5oYW5kbGVVc2VyQW5zd2VyID0gKCkgPT4ge1xuICBjb25zdCB5ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVzJyk7XG4gIGNvbnN0IG5vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vJyk7XG5cbiAgY29uc3QgdXNlclllcyA9IHllcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vIHNldCB0aGUgYXBwLnVzZXJBbnN3ZXIgdmFyaWFibGUgdG8gXCJ0cnVlXCJcbiAgICBhcHAudXNlckFuc3dlciA9IHRydWU7XG4gICAgLy8gYWRkIHRoZSBhbnN3ZXIgdG8gdGhlIHVzZXJBbnN3ZXJzIGFycmF5XG4gICAgYXBwLnVzZXJBbnN3ZXJzLnB1c2godHJ1ZSk7XG4gICAgLy8gYXBwLmNvbXBhcmVBbnN3ZXJzKCk7XG4gICAgYXBwLm5ld1F1ZXN0aW9uKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHVzZXJObyA9IG5vLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ25vJyk7XG4gICAgLy8gc2V0IHRoZSBhcHAudXNlckFuc3dlciB2YXJpYWJsZSB0byBcImZhbHNlXCJcbiAgICBhcHAudXNlckFuc3dlciA9IGZhbHNlO1xuICAgIC8vIGFkZCB0aGUgYW5zd2VyIHRvIHRoZSB1c2VyQW5zd2VycyBhcnJheVxuICAgIGFwcC51c2VyQW5zd2Vycy5wdXNoKGZhbHNlKTtcbiAgICBhcHAubmV3UXVlc3Rpb24oKTtcbiAgfSk7XG4gIGFwcC5jb21wYXJlQW5zd2VycygpO1xufVxuXG5hcHAuY29tcGFyZUFuc3dlcnMgPSAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKCdjb21wYXJlQW5zd2VyczogYXBwLmFuc3dlcktleS5sZW5ndGggPSAnICsgYXBwLmFuc3dlcktleS5sZW5ndGgpXG4gIGlmIChhcHAuY29tcGFyaXNvbiA9PT0gYXBwLnVzZXJBbnN3ZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncG9pbnQnKTtcbiAgICBhcHAudXNlckNvcnJlY3QrKztcbiAgfSBlbHNlIGlmIChhcHAuY29tcGFyaXNvbiAhPT0gYXBwLnVzZXJBbnN3ZXIpIHtcbiAgICAvLyBhcHAudXNlckNvcnJlY3QgcmVtYWlucyB0aGUgc2FtZVxuICAgIGFwcC51c2VyQ29ycmVjdDtcbiAgfVxufVxuXG4vKlxudG8gZGlzcGxheSB0aGUgcXVlc3Rpb246XG4xLiByYW5kb21pemUgY29sb3IgbmFtZXNcbjIuIGNyZWF0ZSB0aGUgcXVlc3Rpb25cbjMuIHN0b3JlIHRoZSBjb3JyZWN0IGFuc3dlclxuNC4gc3RvcmUgdGhlIHVzZXIncyBhbnN3ZXJcbiovXG5hcHAuZGlzcGxheVF1ZXN0aW9uID0gKCkgPT4ge1xuICBhcHAucmFuZG9taXplQ29sb3JOYW1lcygpO1xuICBhcHAuaGFuZGxlUXVlc3Rpb24oKTtcbiAgYXBwLmNyZWF0ZUFuc3dlcktleSgpO1xuICBhcHAuaGFuZGxlVXNlckFuc3dlcigpO1xufVxuXG4vKlxuZGlzcGxheSBhIG5ldyBxdWVzdGlvblxuMS4gc2hvdyBhIG5ldyBjb2xvclxuMi4gc2hvdyBhIG5ldyBxdWVzdGlvblxuKi9cbmFwcC5uZXdRdWVzdGlvbiA9ICgpID0+IHtcbiAgYXBwLmhhbmRsZUNvbG9yRGlzcGxheSgpO1xuICBhcHAuZGlzcGxheVF1ZXN0aW9uKCk7XG59XG5cblxuLy8gc2V0IHRoZSBnYW1lIHRvIGxhc3QgMTAgc2Vjb25kc1xuYXBwLmdhbWVUaW1lciA9ICgpID0+IHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBhcHAubWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrQkcnKTtcbiAgICAvLyBtaW51cyAxIGZyb20gYXBwLmFuc3dlcktleS5sZW5ndGggYmVjYXVzZSBhIHF1ZXN0aW9uIGZsYXNoZXMgYXQgdGhlIGVuZCBiZWZvcmUgdGhlIHVzZXIgZ2V0cyBhIGNoYW5jZSB0byBhbnN3ZXIgaXRcbiAgICBjb25zdCBxdWVzdGlvbnNBbnN3ZXJlZCA9IGFwcC5hbnN3ZXJLZXkubGVuZ3RoLTE7XG4gICAgY29uc3Qgc2NvcmUgPSAoYCR7YXBwLnVzZXJDb3JyZWN0fS8ke3F1ZXN0aW9uc0Fuc3dlcmVkfWApO1xuICAgIGFwcC5tYWluLmlubmVySFRNTCA9ICgnJyk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuXG4gICAgaWYgKGFwcC51c2VyQ29ycmVjdCA+IDAgJiYgcXVlc3Rpb25zQW5zd2VyZWQgPiAwICYmIGFwcC51c2VyQ29ycmVjdCA9PT0gcXVlc3Rpb25zQW5zd2VyZWQgKSB7XG4gICAgICBhcHAubWFpbi5pbm5lckhUTUwgPVxuICAgICAgKGBcbiAgICAgICAgPGgxPldheSB0byBnbyEgWW91ciBzY29yZSBpcyA8c3Bhbj4ke3Njb3JlfTwvc3Bhbj48L2gxPlxuICAgICAgYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5tYWluLmlubmVySFRNTCA9XG4gICAgICAgIChgXG4gICAgICAgICAgPGgxPk5pY2UgdHJ5ISBZb3VyIHNjb3JlIGlzIDxzcGFuPiR7c2NvcmV9PC9zcGFuPjwvaDE+XG4gICAgICAgIGApO1xuICAgIH1cblxuICAgIC8vZmFkZSB0aGUgcmVzdGFydCBidXR0b24gc28gdGhhdCB0aGUgdXNlciBkb2Vzbid0IGFjY2lkZW50YWxseSBjbGljayBpdCBiZWZvcmUgc2VlaW5nIHRoZWlyIHNjb3JlXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJ1dHRvbldyYXBwZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdidXR0b25XcmFwcGVyJyk7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgY29uc3QgYnV0dG9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUcnkgYWdhaW4nKTtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jlc3RhcnQnKTtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChidXR0b25UZXh0KTtcblxuICAgICAgYnV0dG9uV3JhcHBlci5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgICBidXR0b25XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2ZhZGUtaW4nKTtcbiAgICAgIGFwcC5tYWluLmFwcGVuZENoaWxkKGJ1dHRvbldyYXBwZXIpO1xuICAgICAgYXBwLmdhbWVSZXN0YXJ0KCk7XG4gICAgfSwgMTUwMCk7XG4gICAgYXBwLmNvbnRhaW5lci5pbm5lckhUTUwgPSAoJycpO1xuICB9LCAxMDAwMCk7XG59XG5cbmFwcC5nYW1lUmVzdGFydCA9ICgpID0+IHtcbiAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0Jyk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBhcHAubWFpbi5pbm5lckhUTUwgPVxuICAgICAgKGBcbiAgICAgICAgPGgxPldoYXQncyB0aGF0PHNwYW4+Y3NzIGNvbG91cj88L3NwYW4+PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbldyYXBwZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGlkID1cImhvd1RvUGxheVwiPkhvdyB0byBwbGF5PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBpZCA9XCJzdGFydFwiPlN0YXJ0ITwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGApO1xuICBhcHAuaGFuZGxlR2FtZVN0YXJ0KCk7XG4gIGFwcC5pbnN0cnVjdGlvbkxpc3RlbmVycygpO1xuICAvLyByZXNldCB0aGUgYXJyYXlzIGZvciB0aGUgYW5zd2VyIGtleSBhbmQgdGhlIHVzZXIncyBhbnN3ZXJzXG4gIGFwcC5hbnN3ZXJLZXkgPSBbXTtcbiAgYXBwLnVzZXJBbnN3ZXJzID0gW107XG4gIGFwcC5jb2xvck5hbWVzID0gW107XG4gIGFwcC5jb2xvclZhbHVlcyA9IFtdO1xuICB9KTtcbn1cblxuXG5hcHAuaGFuZGxlR2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gc2hvdyBhIGNvbG9yXG4gICAgYXBwLmhhbmRsZUNvbG9yRGlzcGxheSgpO1xuICAgIC8vIHNob3cgYSBxdWVzdGlvblxuICAgIGFwcC5kaXNwbGF5UXVlc3Rpb24oKTtcbiAgICAvLyBydW4gdGhlIHRpbWVyXG4gICAgYXBwLmdhbWVUaW1lcigpO1xuICAgIGFwcC5zaG93VGltZUxlZnQoKTtcblxuICAgIC8vIHdlIGhhdmUgdG8gcmVzZXQgYXBwLnVzZXJDb3JyZWN0IHRvIDAgYmVjYXVzZSB0aGUgdXNlcidzIGNsaWNrcyBsb2cgYXMgXCJ0cnVlXCIgYW5kIGFmZmVjdCB0aGUgdmFsdWVzIG9mIHRoZSBjb3VudC5cbiAgICBhcHAudXNlckNvcnJlY3QgPSAwO1xuICB9KTtcbn1cblxuLy8gQ2hhbmdlIHRoZSBmYXZpY29uXG4vLyBDcmVhdGUgYXJyYXkgb2YgaWNvbnNcbmFwcC5mYXZpY29uID0gKCkgPT4ge1xuICBsZXQgY3VycmVudCA9IDA7XG4gIGxldCBpY29ucyA9IFtcbiAgICAnaW1hZ2VzLzEucG5nJyxcbiAgICAnaW1hZ2VzLzIucG5nJyxcbiAgICAnaW1hZ2VzLzMucG5nJyxcbiAgICAnaW1hZ2VzLzQucG5nJyxcbiAgICAnaW1hZ2VzLzUucG5nJyxcbiAgICAnaW1hZ2VzLzYucG5nJyxcbiAgICAnaW1hZ2VzLzcucG5nJyxcbiAgICAnaW1hZ2VzLzgucG5nJyxcbiAgICAnaW1hZ2VzLzkucG5nJyxcbiAgICAnaW1hZ2VzLzEwLnBuZycsXG4gIF07XG4gIC8vIEV2ZXJ5IDEuNSBzZWNvbmRzLCBzd2l0Y2ggaWNvblxuICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIG5leHQgaWNvblxuICAgICAgbGV0IGljb24gPSAoKytjdXJyZW50ICUgaWNvbnMubGVuZ3RoKTtcbiAgICAgIC8vIEdyYWIgdGhlIFVSTCB0byB1c2VcbiAgICAgIGxldCB1cmwgPSBpY29uc1tpY29uXTtcbiAgICAgIC8vIFVwZGF0ZSB0aGUgZmF2aWNvblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24xJykuaHJlZiA9IHVybDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uMicpLmhyZWYgPSB1cmw7XG4gIH0sIDE1MDApO1xufVxuXG5cblxuYXBwLmluaXQgPSAoKSA9PiB7XG4gIC8vIGdsb2JhbCB2YXJpYWJsZXNcbiAgYXBwLmNvbG9yVmFsdWVzID0gW107XG4gIGFwcC5jb2xvck5hbWVzID0gW107XG4gIGFwcC5idXR0b25XcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnV0dG9uV3JhcHBlcicpO1xuICBhcHAuYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gIGFwcC5tYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBhcHAuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICBhcHAucHJvZ3Jlc3NCYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFwcC5wcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhcHAuYW5zd2VyS2V5ID0gW107XG4gIGFwcC51c2VyQW5zd2VycyA9IFtdO1xuICBhcHAuY29tcGFyaXNvbjtcbiAgYXBwLnVzZXJBbnN3ZXI7XG4gIGFwcC51c2VyQ29ycmVjdDtcblxuXG5cbiAgYXBwLmNvbG9ycyA9IFtcbiAgICB7XG4gICAgICBjb2xvcjogJyNGMEY4RkYnLFxuICAgICAgbmFtZTogJ0FsaWNlIGJsdWUnLFxuICAgIH0sXG4gICAge1xuICAgICAgY29sb3I6ICcjNzA4MDkwJyxcbiAgICAgIG5hbWU6ICdTbGF0ZSBncmV5J1xuICAgIH0sXG4gICAge1xuICAgICAgY29sb3I6ICcjRENEQ0RDJyxcbiAgICAgIG5hbWU6ICdHYWluc2Jvcm8nXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xvcjogJyMwMDhCOEInLFxuICAgICAgbmFtZTogJ0RhcmsgY3lhbidcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbG9yOiAnIzdGRkYwMCcsXG4gICAgICBuYW1lOiAnQ2hhcnRyZXVzZSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbG9yOiAnI0E1MkEyQScsXG4gICAgICBuYW1lOiAnQnJvd24nXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xvcjogJyNEQUE1MjAnLFxuICAgICAgbmFtZTogJ0dvbGRlbnJvZCdcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbG9yOiAnI0ZGNjM0NycsXG4gICAgICBuYW1lOiAnVG9tYXRvJ1xuICAgIH0sXG4gICAge1xuICAgICAgY29sb3I6ICcjMTkxOTcwJyxcbiAgICAgIG5hbWU6ICdNaWRuaWdodCBibHVlJ1xuICAgIH0sXG4gICAge1xuICAgICAgY29sb3I6ICcjRkE4MDcyJyxcbiAgICAgIG5hbWU6ICdTYWxtb24nXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xvcjogJyNGRkRBQjknLFxuICAgICAgbmFtZTogJ1BlYWNoIHB1ZmYnXG4gICAgfSxcbiAgICB7XG4gICAgICBjb2xvcjogJyNGRkZGRTAnLFxuICAgICAgbmFtZTogJ0xpZ2h0IHllbGxvdydcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbG9yOiAnI0ZGMDBGRicsXG4gICAgICBuYW1lOiAnRnVzY2hpYSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbG9yOiAnI0REQTBERCcsXG4gICAgICBuYW1lOiAnUGx1bSdcbiAgICB9XG4gIF07XG5cbiAgYXBwLmluc3RydWN0aW9uTGlzdGVuZXJzKCk7XG4gIGFwcC5oYW5kbGVHYW1lU3RhcnQoKTtcbiAgYXBwLmZhdmljb24oKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWFkeSEnKTtcbiAgYXBwLmluaXQoKTtcbn0pO1xuIl19
