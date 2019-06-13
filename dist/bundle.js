/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

//Define variables in global scope
var canvas, context, backgroundImg, trumpImg, targetImg, canvasWidth, canvasHeight, slingX, slingY, size, trumpSize, targetSize, maxTargets, targets, x, y, stretchX, stretchY, releaseX, releaseY, dragStartX, counter, screenOffset, startOffset, targetsRemaining, frame, mode; //Main game loop

function loop() {
  context.clearRect(0, 0, canvasWidth, canvasHeight); //Clear canvas

  context.drawImage(backgroundImg, screenOffset, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight); //Draw background with offset
  //When stretching shot, draw line from top of shot to center of character

  if (mode == 'stretch') {
    context.beginPath();
    context.moveTo(slingX - screenOffset, slingY); //Start at sling's (x, y) coordinate

    context.lineTo(x - screenOffset + size / 2, y + size / 2); //

    context.stroke();
  } //When already flying, recalculate character coordinates and screenOffset


  if (mode == 'fly') {
    x = releaseX + stretchX * counter / 10; //Horizontal change  = Point of release  plus the force of stretch 

    y = releaseY + stretchY * (counter / 10) + counter / 4 * (counter / 4); //Vertical change = Same calculations but increased by frame counter^2 (Divide by 4 to simulate gravity)

    screenOffset = screenOffset + stretchX / 10;
    counter++; //How many frames of elapsed since release

    if (y > canvasWidth) newTrump(); //If out of bounds, call newTrump
  } //Draw Trump


  context.drawImage(trumpImg, frame, canvasHeight, trumpSize, trumpSize, x - screenOffset, y, trumpSize, trumpSize); //Draw targets

  for (var i = 0; i < maxTargets; i++) {
    var target = targets[i];
    context.drawImage(targetImg, targetSize * (2 + target.alive), canvasHeight, targetSize, targetSize, target.x - screenOffset, target.y, targetSize, targetSize);

    if (target.alive) {
      if (x + trumpSize > target.x && x < target.x + trumpSize && y + trumpSize > target.y && y < target.y + trumpSize) {
        target.alive = false; //Set false if target hit

        targetsRemaining--;

        if (targetsRemaining == 0) {
          newGame();
        }
      }
    }
  }

  window.requestAnimationFrame(loop);
} //Change between stretch/drag modes


function start(pointerX, pointerY) {
  if (mode == 'ready') {
    //When player drags Trump, mode = stretch
    if (pointerX > x - screenOffset && pointerX < x - screenOffset + size && pointerY > y && pointerY < y + size) {
      mode = 'stretch';
    } //If player drags map, mode = dra
    else {
        dragStartX = pointerX;
        mode = 'drag';
        startOffset = screenOffset;
      }
  }
} //Moves Trump to given coordinates or changes screen offset based on drag distance


function move(pointerX, pointerY) {
  if (mode == 'stretch') {
    x = pointerX + screenOffset;
    y = pointerY;
  }

  if (mode == 'drag') {
    screenOffset = startOffset + dragStartX - pointerX;
  }
} //Resets all variables


function newTrump() {
  frame = 0;
  x = slingX;
  y = slingY;
  screenOffset = 0;
  counter = 0;
  mode = 'ready';
} //Resets game and randomizes target placement


function newGame() {
  targetsRemaining = maxTargets;

  for (var i = 0; i < maxTargets; i++) {
    targets[i] = {
      x: slingX * 2 + Math.random() * 2 * canvasWidth,
      y: Math.random() * (canvasHeight - size),
      alive: true
    };
  }

  newTrump();
} //Fit canvas to container


function fitToContainer(canvas) {
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvas.style = "position: absolute; left:0; top:0;";
} //Executes scripts


window.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  fitToContainer(canvas);
  backgroundImg = new Image();
  trumpImg = new Image();
  targetImg = new Image();
  backgroundImg.src = "assets/oval.jpg";
  trumpImg.src = "assets/still.png";
  targetImg.src = "assets/icon.png";
  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mouseup', up);
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  slingX = 400; //X coordinate of sling shot

  slingY = 200; //Y coordinate of sling shot

  size = 700; //Background size

  trumpSize = 256; //Trump size

  targetSize = 250; //Target size

  maxTargets = 5;
  targets = []; //Push total number of targets into array

  for (var i = 0; i < maxTargets; i++) {
    var target = {
      x: null,
      y: null,
      alive: null
    };
    targets.push(target);
  }

  newGame();
  window.requestAnimationFrame(loop);
}); //EVENT HANDLER CALLBACKS
//Captures (x, y) of cursor to pass to start function

function mouseDown(e) {
  var pointerX = e.clientX; //Gets coordinates of mouse click BEFORE release

  var pointerY = e.clientY;
  start(pointerX, pointerY);
} //Capture (x, y) of cursor AFTER release to pass to start function


function mouseMove(e) {
  var pointerX = e.clientX; //Gets coordinate of mouse AFTER release

  var pointerY = e.clientY;
  move(pointerX, pointerY);
} //On release of mouse - captures coordinates of release and force of stretch


function up(e) {
  if (mode == 'stretch') {
    mode = 'fly';
    frame = trumpSize;
    releaseX = x;
    releaseY = y;
    stretchX = slingX - x;
    stretchY = slingY - y;
  }

  if (mode == 'drag') mode = 'ready';
} // function fitToContainer(canvas) {
//     canvas.style.width = '100%';
//     canvas.style.height = '100%';
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
// }
// window.addEventListener("DOMContentLoaded", () => {
//     debugger
//     const canvas = document.getElementById('canvas')
//     const ctx = canvas.getContext('2d')
//     fitToContainer(canvas)
//     debugger
//     let animation = new Animation("still");
//     animation.change("still")
//     debugger
//     animation.render(ctx);
// })

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map