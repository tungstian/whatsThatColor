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

// create a function with all event listeners "app.listeners();"



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

  app.handleModalClose = () => {
    const closeButton = document.getElementById('back');
    closeButton.addEventListener('click', function() {
      instructions.classList.add('hidden');
    });
  }

  // create an array of colours from the colour array
  app.createArrayOfColors = () => {
    app.colors.forEach(function(c) {
      //get the value of the 'color' property
      app.colorVal = c.color;
      app.colorValues.push(app.colorVal);
    });
    //this is the array of colors
    return(app.colorValues);
  }

  // choose a colour to display in the game
  app.randomizeColor = () => {
    app.createArrayOfColors();
    app.randomColor = app.colorValues[Math.floor(Math.random() * app.colorValues.length)];
  }

  // set the colour of the in-game div to the random colour
  app.handleColorDisplay = () => {
    app.randomizeColor();
    // console.log(app.randomColor);
    const colorBackground = document.body;

    // set the div to be the random color
    colorBackground.style.backgroundColor = app.randomColor;
  }

  // create an array of colour names
  app.createArrayOfNames = () => {
    app.colors.forEach(function(n) {
      app.colorName = n.name;
      app.colorNames.push(app.colorName);
    });
    // console.log(app.colorNames);
    return(app.colorNames);
  }

  // get a random value from app.colorNames
  app.randomizeColorNames = () => {
    app.createArrayOfNames();
    app.randomName = app.colorNames[Math.floor(Math.random() * app.colorNames.length)];
    // console.log(app.randomName);
    return(app.randomName);
  }

  app.handleQuestion = () => {
    app.compareColorToName();
    app.main.innerHTML = ('');
    app.main.innerHTML = (`
      <h1>Is this <span>${app.randomName}?</span></h1>

      <div class="buttonWrapper">
        <button id ="no">No</button>
        <button id ="yes">Yes</button>
      </div>
      `);

    app.handleUserAnswer();
  }

  app.displayQuestion = () => {
    app.randomizeColorNames();
    app.handleQuestion();
  }

  // link the color property and the name property
  app.compareColorToName = () => {
    for (let i = 0; i < app.colors.length; i++) {
      if (app.randomColor === app.colors[i].color && app.randomName === app.colors[i].name) {
        console.log('the question is right');
         app.comparison = true;
      } else if (app.randomColor !== app.colors[i].color && app.randomName !== app.colors[i].name) {
         app.comparison = false;
      }
    }
  }


  // create the array for the answerKey
  app.createAnswerKey = () => {
    // app.compareColorToName();
    if (app.comparison === true) {
      app.answerKey.push(true);
    } else if (app.comparison !== true) {
      app.answerKey.push(false);
    }
  }

  app.newQuestion = () => {
    app.createAnswerKey();
    app.handleUserScore();
    app.handleColorDisplay();
    app.displayQuestion();
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
      app.compareAnswers();
      app.newQuestion();
    });

    const userNo = no.addEventListener('click', function() {
      // set the app.userAnswer variable to "false"
      app.userAnswer = false;
      // add the answer to the userAnswers array
      app.userAnswers.push(false);
      app.compareAnswers();
      app.newQuestion();
    });
  }

  // add 1 to the score
  app.keepScore = () => {
    score++;
  }

  // at the end of the game, we need to keep compare app.answerKey to  app.userAnswers and create an array with matching items.
  // we can then use .length to identify how many questions the user got right out of the amount of questions (app.answerKey)
  // app.compareAnswers = () => {
  //   console.log(app.answerKey);
  //   // we can use a for loop to compare indexes and their values
  //   for (let i = 0; i > app.answerKey.length; i++) {
  //       if (app.answerKey[i] === app.userAnswers[i]) {
  //         app.userCorrect++
  //         // console.log(app.userCorrect);
  //     }
  //     console.log(app.answerKey[i]);
  //   }
  // }

  app.compareAnswers = () => {
    console.log('compareAnswers: app.answerKey.length = ' + app.answerKey.length)
    // we can use a for loop to compare indexes and their values
    /*
    ----------------------------------------------------------------------------------------------
    - we are only adding to the answerKey array with the "newQuestion" function and that function doesn't run until after we've answered the first question
    - only the "displayQuestion" function runs when setting up the first question and that function does not add an answer to the answerKey array so there is nothing in the array when we first use the compareAnswers function
    ------------------------------------------------------------------------------------------------
    */
    for (let i = 0; i < app.answerKey.length; i++) {
        console.log('in loop')
        if (app.answerKey[i] === app.userAnswers[i]) {
          console.log('point');
          app.userCorrect++
          // console.log(app.userCorrect);
      } else {
          console.log('no point');
      }
    }
  }

  // we need to keep track of the score
  app.handleUserScore = () => {
    // compare both arrays, create a new array with matches
  }

  app.gameTimer = () => {
    setTimeout(function() {
      app.main.innerHTML = ('');
      document.body.style.backgroundColor = 'white';
      app.main.innerHTML = (`
        <h1>Your score is <span>${app.score}/${app.answerKey.length}</span></h1>

        <div class="buttonWrapper">
          <button id ="restart">Try again!</button>
        </div>
        `)
        const restart = document.getElementById('restart');
        restart.addEventListener('click', function() {
          app.main.innerHTML = (`
            <h1>What's that<span>css colour?</span></h1>
            <div class="buttonWrapper">
              <button id ="howToPlay">How to play</button>
              <button id ="start">Start!</button>
            </div>
            `);
          app.handleGameStart();
          app.handleInstructions();
          app.answerKey = [];
          app.userAnswers = [];
        });
      }, 10000);

    }


  app.handleGameStart = () => {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', function() {
      // const gameBoard = document.getElementById('gameBoard');
      // gameBoard.classList.remove('hidden');

      app.handleColorDisplay();
      app.displayQuestion();
      app.gameTimer();
    });
  }


  app.init = () => {
    // global variables
    app.colorValues = [];
    app.colorNames = [];
    app.score = 0;
    // app.gameBoardWrapper = document.getElementById('gameBoardWrapper');
    app.main = document.querySelector('main');
    app.answerKey = [];
    app.userAnswers = [];
    app.comparison;
    app.userAnswer;
    app.userCorrect = 0;


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

    app.handleInstructions();
    app.handleModalClose();
    app.handleGameStart();
    // put event listeners here
  }

document.addEventListener('DOMContentLoaded', function() {
    // console.log('ready!');
  app.init();
});
