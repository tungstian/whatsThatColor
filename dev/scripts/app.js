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

app.onLoad = () => {
  const landingWrapper = document.createElement('div');
  landingWrapper.classList.add('wrapper');

  landingWrapper.innerHTML =
    (`
      <h1>what's that <span>css color?</span></h1>
      <div class="buttonWrapper">
        <button id ="howToPlay">How to play</button>
        <button id ="start">Start!</button>
      </div>
    `);

    const loadElements = app.htmlDOM.appendChild(landingWrapper);
    app.showModal(loadElements);
}

app.instructions = () => {
  const modal = document.createElement('section');
  app.setAttributes(
    modal,
    {
      'id': 'instructions',
      'class': 'hidden modal howToPlay',
    });

  const instructions = document.createElement('div');
  instructions.setAttribute('class','instructionsWrapper');

  instructions.innerHTML =
    (`
      <h2>how to <span>play</span></h2>
      <p>How well do you know CSS colours and their names? This game will put your knowledge to the test. You'll have 10 seconds to get as many as you can correct.</p>
      <p>Have fun!</p>
      <button id="back" class="back">Got it!</button>
    `);

  modal.appendChild(instructions);
  const renderedModal = app.htmlDOM.appendChild(modal);

  app.closeModal(renderedModal);
}


app.init = () => {
  // create a variable to store the HTML #app element
  app.htmlDOM = document.getElementById('app');

  // create a variable that creates a wrapper to contain dynamic HTML elements
  app.wrapper = document.createElement('div');
  // add a class to the wrapper so that we can access with CSS
  app.wrapper.classList.add('wrapper');

  // set multiple attributes via a helper function
  app.setAttributes = (el, attrs) => {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  // event listeners
  app.showModal = (le) => {
    console.log(le);
    document.getElementById('howToPlay').addEventListener('click',function() {
      document.getElementById('instructions').classList.remove('hidden');
    });
  }

  app.closeModal = (rm) => {
    document.getElementById('back').addEventListener('click', function() {
      document.getElementById('instructions').classList.add('hidden');
    });
  }

  app.onLoad();
  app.instructions();

}

document.addEventListener('DOMContentLoaded', function() {
  console.log('...are you peeking at the answers? 👀');
  app.init();
});
