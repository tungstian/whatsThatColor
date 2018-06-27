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


const app = {};

// create a function to show instructions
app.handleInstructions = () => {
  const instructions = document.getElementById('instructions');
  const howButton = document.getElementById('howToPlay');
  howButton.addEventListener('click', function() {
    // console.log('Clicked!');
    instructions.classList.remove('hidden');
  });
}

// function to close the instructions modal
app.handleModalClose = () => {
  const closeButton = document.getElementById('back');
  closeButton.addEventListener('click', function() {
    instructions.classList.add('hidden');
  });
}

app.instructionListeners = () => {
  app.handleInstructions();
  app.handleModalClose();
}

// create an array of color names
app.createArrayOfNames = () => {
  app.colors.forEach(function(n) {
    const colorName = n.name;
    app.colorNames.push(colorName);
  });
  // console.log(app.colorNames);
  return(app.colorNames);
}

// create an array of color hex codes from the color array
app.createArrayOfHexCodes = () => {
  app.colors.forEach(function(c) {
    // get the value of the 'color' property
    const colorVal = c.color;
    app.colorValues.push(colorVal);
  });
  // this is the array of colors
  return app.colorValues;
}

// choose a color to display in the game
app.randomizeColor = () => {
  app.createArrayOfHexCodes();
  app.randomColor = app.colorValues[Math.floor(Math.random() * app.colorValues.length)];
}

// set the colour of the in-game div to the random colour
app.handleColorDisplay = () => {
  app.randomizeColor();
  // console.log(app.randomColor);
  const background = document.body;

  // set the div to be the random color
  background.style.backgroundColor = app.randomColor;
}

// get a random value from app.colorNames
app.randomizeColorNames = () => {
  app.createArrayOfNames();
  app.randomName = app.colorNames[Math.floor(Math.random() * app.colorNames.length)];
  // console.log(app.randomName);
  return app.randomName;
}

// link the color property and the name property
app.compareColorToName = () => {
  for (let i = 0; i < app.colors.length; i++) {
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
}

// compare the index of the answer key array to the index of the user answers array

// set multiple attributes via a helper function
app.setAttributes = (el, attrs) => {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// create a progress bar
app.createProgressBar = () => {
  app.setAttributes(
    app.progressBarWrapper,
    {
      'id': 'progress',
      'class': 'progress'
    }
  );
  app.setAttributes(
    app.progressBar,
    {
      'id': 'progressBar',
      'class': 'progressBar'
    }
  );
  app.progressBarWrapper.appendChild(app.progressBar);

  app.container.appendChild(app.progressBarWrapper);
}




// track how much time is left
app.showTimeLeft = function move() {
  app.createProgressBar();
  const elem = document.getElementById('progressBar');
  let width = 1;
  let id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}


// setting up the question
app.createQuestion = () => {
  app.main.innerHTML = ('');
  app.main.innerHTML =
  (`
    <h1>Is this <span>${app.randomName}?</span></h1>

    <div class="buttonWrapper">
      <button id ="no">No</button>
      <button id ="yes">Yes</button>
    </div>
  `);
  app.handleLegibility();
}


// change the color of the main elements for legibility
app.handleLegibility = () => {
  if (app.randomColor === '#008B8B' ||
      app.randomColor === '#708090' ||
      app.randomColor === '#A52A2A' ||
      app.randomColor === '#191970' )
      {
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
}

/*
create the question:
1. check to see if the colour name matches the hex code
2. clear the <main> HTML elements
3. set the <main> HTML elements to the question
*/
app.handleQuestion = () => {
  app.compareColorToName();
  app.createQuestion();
}

// create the array for the correct answers (answer key)
app.createAnswerKey = () => {
  // app.compareColorToName();
  if (app.comparison === true) {
    app.answerKey.push(true);
  } else {
    app.answerKey.push(false);
  }
}

// we need to get the user's answer
app.handleUserAnswer = () => {
  const yes = document.getElementById('yes');
  const no = document.getElementById('no');

  const userYes = yes.addEventListener('click', function() {
    // set the app.userAnswer variable to "true"
    app.userAnswer = true;
    // add the answer to the userAnswers array
    app.userAnswers.push(true);
    // app.compareAnswers();
    app.newQuestion();
  });

  const userNo = no.addEventListener('click', function() {
    console.log('no');
    // set the app.userAnswer variable to "false"
    app.userAnswer = false;
    // add the answer to the userAnswers array
    app.userAnswers.push(false);
    app.newQuestion();
  });
  app.compareAnswers();
}

app.compareAnswers = () => {
  // console.log('compareAnswers: app.answerKey.length = ' + app.answerKey.length)
  if (app.comparison === app.userAnswer) {
    // console.log('point');
    app.userCorrect++;
  } else if (app.comparison !== app.userAnswer) {
    // app.userCorrect remains the same
    app.userCorrect;
  }
}

/*
to display the question:
1. randomize color names
2. create the question
3. store the correct answer
4. store the user's answer
*/
app.displayQuestion = () => {
  app.randomizeColorNames();
  app.handleQuestion();
  app.createAnswerKey();
  app.handleUserAnswer();
}

/*
display a new question
1. show a new color
2. show a new question
*/
app.newQuestion = () => {
  app.handleColorDisplay();
  app.displayQuestion();
}


// set the game to last 10 seconds
app.gameTimer = () => {
  setTimeout(function() {
    app.main.classList.remove('darkBG');
    // minus 1 from app.answerKey.length because a question flashes at the end before the user gets a chance to answer it
    const questionsAnswered = app.answerKey.length-1;
    const score = (`${app.userCorrect}/${questionsAnswered}`);
    app.main.innerHTML = ('');
    document.body.style.backgroundColor = 'white';

    if (app.userCorrect > 0 && questionsAnswered > 0 && app.userCorrect === questionsAnswered ) {
      app.main.innerHTML =
      (`
        <h1>Way to go! Your score is <span>${score}</span></h1>
      `);
    } else {
      app.main.innerHTML =
        (`
          <h1>Nice try! Your score is <span>${score}</span></h1>
        `);
    }

    //fade the restart button so that the user doesn't accidentally click it before seeing their score
    setTimeout(function() {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.setAttribute('class', 'buttonWrapper');

      const button = document.createElement('button');
      const buttonText = document.createTextNode('Try again');
      button.setAttribute('id', 'restart');
      button.appendChild(buttonText);

      buttonWrapper.appendChild(button);

      buttonWrapper.classList.add('fade-in');
      app.main.appendChild(buttonWrapper);
      app.gameRestart();
    }, 1500);
    app.container.innerHTML = ('');
  }, 10000);
}

app.gameRestart = () => {
  const restart = document.getElementById('restart');
  restart.addEventListener('click', function() {
    app.main.innerHTML =
      (`
        <h1>What's that<span>css colour?</span></h1>
        <div class="buttonWrapper">
          <button id ="howToPlay">How to play</button>
          <button id ="start">Start!</button>
        </div>
      `);
  app.handleGameStart();
  app.instructionListeners();
  // reset the arrays for the answer key and the user's answers
  app.answerKey = [];
  app.userAnswers = [];
  app.colorNames = [];
  app.colorValues = [];
  });
}


app.handleGameStart = () => {
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', function() {

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
}

// Change the favicon
// Create array of icons
app.favicon = () => {
  let current = 0;
  let icons = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
  ];
  // Every 1.5 seconds, switch icon
  setInterval(function () {
      // Determine the next icon
      let icon = (++current % icons.length);
      // Grab the URL to use
      let url = icons[icon];
      // Update the favicon
      document.getElementById('icon1').href = url;
      document.getElementById('icon2').href = url;
  }, 1500);
}



app.init = () => {
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



  app.colors = [
    {
      color: '#F0F8FF',
      name: 'Alice blue',
    },
    {
      color: '#708090',
      name: 'Slate grey'
    },
    {
      color: '#DCDCDC',
      name: 'Gainsboro'
    },
    {
      color: '#008B8B',
      name: 'Dark cyan'
    },
    {
      color: '#7FFF00',
      name: 'Chartreuse'
    },
    {
      color: '#A52A2A',
      name: 'Brown'
    },
    {
      color: '#DAA520',
      name: 'Goldenrod'
    },
    {
      color: '#FF6347',
      name: 'Tomato'
    },
    {
      color: '#191970',
      name: 'Midnight blue'
    },
    {
      color: '#FA8072',
      name: 'Salmon'
    },
    {
      color: '#FFDAB9',
      name: 'Peach puff'
    },
    {
      color: '#FFFFE0',
      name: 'Light yellow'
    },
    {
      color: '#FF00FF',
      name: 'Fuschia'
    },
    {
      color: '#DDA0DD',
      name: 'Plum'
    }
  ];

  app.instructionListeners();
  app.handleGameStart();
  app.favicon();
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('ready!');
  app.init();
});
