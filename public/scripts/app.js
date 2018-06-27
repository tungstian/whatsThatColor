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

app.onLoad = function () {
  var landingWrapper = document.createElement('div');
  landingWrapper.classList.add('wrapper');

  landingWrapper.innerHTML = '\n      <h1>what\'s that <span>css color?</span></h1>\n      <div class="buttonWrapper">\n        <button id ="howToPlay">How to play</button>\n        <button id ="start">Start!</button>\n      </div>\n    ';

  var loadElements = app.htmlDOM.appendChild(landingWrapper);
  app.showModal(loadElements);
};

app.instructions = function () {
  var modal = document.createElement('section');
  app.setAttributes(modal, {
    'id': 'instructions',
    'class': 'hidden modal howToPlay'
  });

  var instructions = document.createElement('div');
  instructions.setAttribute('class', 'instructionsWrapper');

  instructions.innerHTML = '\n      <h2>how to <span>play</span></h2>\n      <p>How well do you know CSS colours and their names? This game will put your knowledge to the test. You\'ll have 10 seconds to get as many as you can correct.</p>\n      <p>Have fun!</p>\n      <button id="back" class="back">Got it!</button>\n    ';

  modal.appendChild(instructions);
  var renderedModal = app.htmlDOM.appendChild(modal);

  app.closeModal(renderedModal);
};

app.init = function () {
  // create a variable to store the HTML #app element
  app.htmlDOM = document.getElementById('app');

  // create a variable that creates a wrapper to contain dynamic HTML elements
  app.wrapper = document.createElement('div');
  // add a class to the wrapper so that we can access with CSS
  app.wrapper.classList.add('wrapper');

  // set multiple attributes via a helper function
  app.setAttributes = function (el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

  // event listeners
  app.showModal = function (le) {
    console.log(le);
    document.getElementById('howToPlay').addEventListener('click', function () {
      document.getElementById('instructions').classList.remove('hidden');
    });
  };

  app.closeModal = function (rm) {
    document.getElementById('back').addEventListener('click', function () {
      document.getElementById('instructions').classList.add('hidden');
    });
  };

  app.onLoad();
  app.instructions();
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('...are you peeking at the answers? 👀');
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBOzs7Ozs7Ozs7O0FBVUEsSUFBTSxNQUFNLEVBQVo7O0FBRUEsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixNQUFNLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQSxpQkFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLFNBQTdCOztBQUVBLGlCQUFlLFNBQWY7O0FBU0UsTUFBTSxlQUFlLElBQUksT0FBSixDQUFZLFdBQVosQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxNQUFJLFNBQUosQ0FBYyxZQUFkO0FBQ0gsQ0FmRDs7QUFpQkEsSUFBSSxZQUFKLEdBQW1CLFlBQU07QUFDdkIsTUFBTSxRQUFRLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFkO0FBQ0EsTUFBSSxhQUFKLENBQ0UsS0FERixFQUVFO0FBQ0UsVUFBTSxjQURSO0FBRUUsYUFBUztBQUZYLEdBRkY7O0FBT0EsTUFBTSxlQUFlLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFyQjtBQUNBLGVBQWEsWUFBYixDQUEwQixPQUExQixFQUFrQyxxQkFBbEM7O0FBRUEsZUFBYSxTQUFiOztBQVFBLFFBQU0sV0FBTixDQUFrQixZQUFsQjtBQUNBLE1BQU0sZ0JBQWdCLElBQUksT0FBSixDQUFZLFdBQVosQ0FBd0IsS0FBeEIsQ0FBdEI7O0FBRUEsTUFBSSxVQUFKLENBQWUsYUFBZjtBQUNELENBeEJEOztBQTJCQSxJQUFJLElBQUosR0FBVyxZQUFNO0FBQ2Y7QUFDQSxNQUFJLE9BQUosR0FBYyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZDs7QUFFQTtBQUNBLE1BQUksT0FBSixHQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0E7QUFDQSxNQUFJLE9BQUosQ0FBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLFNBQTFCOztBQUVBO0FBQ0EsTUFBSSxhQUFKLEdBQW9CLFVBQUMsRUFBRCxFQUFLLEtBQUwsRUFBZTtBQUNqQyxTQUFJLElBQUksR0FBUixJQUFlLEtBQWYsRUFBc0I7QUFDcEIsU0FBRyxZQUFILENBQWdCLEdBQWhCLEVBQXFCLE1BQU0sR0FBTixDQUFyQjtBQUNEO0FBQ0YsR0FKRDs7QUFNQTtBQUNBLE1BQUksU0FBSixHQUFnQixVQUFDLEVBQUQsRUFBUTtBQUN0QixZQUFRLEdBQVIsQ0FBWSxFQUFaO0FBQ0EsYUFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGdCQUFyQyxDQUFzRCxPQUF0RCxFQUE4RCxZQUFXO0FBQ3ZFLGVBQVMsY0FBVCxDQUF3QixjQUF4QixFQUF3QyxTQUF4QyxDQUFrRCxNQUFsRCxDQUF5RCxRQUF6RDtBQUNELEtBRkQ7QUFHRCxHQUxEOztBQU9BLE1BQUksVUFBSixHQUFpQixVQUFDLEVBQUQsRUFBUTtBQUN2QixhQUFTLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0MsZ0JBQWhDLENBQWlELE9BQWpELEVBQTBELFlBQVc7QUFDbkUsZUFBUyxjQUFULENBQXdCLGNBQXhCLEVBQXdDLFNBQXhDLENBQWtELEdBQWxELENBQXNELFFBQXREO0FBQ0QsS0FGRDtBQUdELEdBSkQ7O0FBTUEsTUFBSSxNQUFKO0FBQ0EsTUFBSSxZQUFKO0FBRUQsQ0FqQ0Q7O0FBbUNBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQsVUFBUSxHQUFSLENBQVksdUNBQVo7QUFDQSxNQUFJLElBQUo7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gVE8gRE86XG5cbi8qXG4xLiBzdGFydCB0aGUgZ2FtZVxuMi4gY29sb3IgcXVlc3Rpb24gc2hvd3MgdXBcbjMuIHVzZXIgYW5zd2VycyB5L25cbjQuIG9uY2UgdGhlIHVzZXIgc2VsZWN0cyB5L24sIGNoZWNrIGlmIHRoYXQgaXMgY29ycmVjdFxuNS4gaWYgY29ycmVjdCwgKzEgdG8gc2NvcmUuIGlmIGluY29ycmVjdCwgZG8gbm90aGluZywgZ28gdG8gbmV4dCBjb2xvciBxdWVzdGlvblxuNi4gY2FsbCByYW5kb21pemluZyBmdW5jdGlvbiBhZ2FpblxuNy4gaWYgYXJyYXkgaXMgZmluaXNoZWQsIHNob3cgdXNlciBzY29yZSAvIGlmIHRpbWVyIGlzIGZpbmlzaGVkLCBzaG93IHVzZXIgc2NvcmVcbiovXG5cbmNvbnN0IGFwcCA9IHt9O1xuXG5hcHAub25Mb2FkID0gKCkgPT4ge1xuICBjb25zdCBsYW5kaW5nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsYW5kaW5nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyJyk7XG5cbiAgbGFuZGluZ1dyYXBwZXIuaW5uZXJIVE1MID1cbiAgICAoYFxuICAgICAgPGgxPndoYXQncyB0aGF0IDxzcGFuPmNzcyBjb2xvcj88L3NwYW4+PC9oMT5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25XcmFwcGVyXCI+XG4gICAgICAgIDxidXR0b24gaWQgPVwiaG93VG9QbGF5XCI+SG93IHRvIHBsYXk8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBpZCA9XCJzdGFydFwiPlN0YXJ0ITwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYCk7XG5cbiAgICBjb25zdCBsb2FkRWxlbWVudHMgPSBhcHAuaHRtbERPTS5hcHBlbmRDaGlsZChsYW5kaW5nV3JhcHBlcik7XG4gICAgYXBwLnNob3dNb2RhbChsb2FkRWxlbWVudHMpO1xufVxuXG5hcHAuaW5zdHJ1Y3Rpb25zID0gKCkgPT4ge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgYXBwLnNldEF0dHJpYnV0ZXMoXG4gICAgbW9kYWwsXG4gICAge1xuICAgICAgJ2lkJzogJ2luc3RydWN0aW9ucycsXG4gICAgICAnY2xhc3MnOiAnaGlkZGVuIG1vZGFsIGhvd1RvUGxheScsXG4gICAgfSk7XG5cbiAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywnaW5zdHJ1Y3Rpb25zV3JhcHBlcicpO1xuXG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPVxuICAgIChgXG4gICAgICA8aDI+aG93IHRvIDxzcGFuPnBsYXk8L3NwYW4+PC9oMj5cbiAgICAgIDxwPkhvdyB3ZWxsIGRvIHlvdSBrbm93IENTUyBjb2xvdXJzIGFuZCB0aGVpciBuYW1lcz8gVGhpcyBnYW1lIHdpbGwgcHV0IHlvdXIga25vd2xlZGdlIHRvIHRoZSB0ZXN0LiBZb3UnbGwgaGF2ZSAxMCBzZWNvbmRzIHRvIGdldCBhcyBtYW55IGFzIHlvdSBjYW4gY29ycmVjdC48L3A+XG4gICAgICA8cD5IYXZlIGZ1biE8L3A+XG4gICAgICA8YnV0dG9uIGlkPVwiYmFja1wiIGNsYXNzPVwiYmFja1wiPkdvdCBpdCE8L2J1dHRvbj5cbiAgICBgKTtcblxuICBtb2RhbC5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnMpO1xuICBjb25zdCByZW5kZXJlZE1vZGFsID0gYXBwLmh0bWxET00uYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gIGFwcC5jbG9zZU1vZGFsKHJlbmRlcmVkTW9kYWwpO1xufVxuXG5cbmFwcC5pbml0ID0gKCkgPT4ge1xuICAvLyBjcmVhdGUgYSB2YXJpYWJsZSB0byBzdG9yZSB0aGUgSFRNTCAjYXBwIGVsZW1lbnRcbiAgYXBwLmh0bWxET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5cbiAgLy8gY3JlYXRlIGEgdmFyaWFibGUgdGhhdCBjcmVhdGVzIGEgd3JhcHBlciB0byBjb250YWluIGR5bmFtaWMgSFRNTCBlbGVtZW50c1xuICBhcHAud3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyBhZGQgYSBjbGFzcyB0byB0aGUgd3JhcHBlciBzbyB0aGF0IHdlIGNhbiBhY2Nlc3Mgd2l0aCBDU1NcbiAgYXBwLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgnd3JhcHBlcicpO1xuXG4gIC8vIHNldCBtdWx0aXBsZSBhdHRyaWJ1dGVzIHZpYSBhIGhlbHBlciBmdW5jdGlvblxuICBhcHAuc2V0QXR0cmlidXRlcyA9IChlbCwgYXR0cnMpID0+IHtcbiAgICBmb3IobGV0IGtleSBpbiBhdHRycykge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXZlbnQgbGlzdGVuZXJzXG4gIGFwcC5zaG93TW9kYWwgPSAobGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhsZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd1RvUGxheScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcC5jbG9zZU1vZGFsID0gKHJtKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9ucycpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwLm9uTG9hZCgpO1xuICBhcHAuaW5zdHJ1Y3Rpb25zKCk7XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnLi4uYXJlIHlvdSBwZWVraW5nIGF0IHRoZSBhbnN3ZXJzPyDwn5GAJyk7XG4gIGFwcC5pbml0KCk7XG59KTtcbiJdfQ==
