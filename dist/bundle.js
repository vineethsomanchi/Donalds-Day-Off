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

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller =
/*#__PURE__*/
function () {
  /* ---------- CONSTRUCTOR ----------*/
  function Controller(canvas, context, backgroundImage, slingX, slingY, targetCount) {
    _classCallCheck(this, Controller);

    this.canvas = canvas;
    this.context = context;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.backgroundImage = backgroundImage;
    this.trumpSprite = new Image();
    this.trumpSprite.src = "assets/still.png"; // this.targetImage = new Image();
    // this.targetImage.src = "assets/icon.png"

    this.trumpSize = 256;
    this.screenOffset = 0;
    this.startOffset;
    this.slingX = slingX;
    this.slingY = slingY;
    this.x = slingX;
    this.y = slingY;
    this.stretchX;
    this.stretchY;
    this.releaseX;
    this.releaseY;
    this.dragStartX;
    this.frame = 0;
    this.counter = 0;
    this.mode = "ready";
    this.targetCount = targetCount;
    this.targetsRemaining;
    this.targets = [];

    for (var i = 0; i < this.targetCount; i++) {
      var target = {
        x: null,
        y: null,
        alive: null
      };
      this.targets.push(target);
    }

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.up = this.up.bind(this);
    this.reset = this.reset.bind(this);
    this.newGame = this.newGame.bind(this);
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.loop = this.loop.bind(this);
  }
  /* ---------- EVENT HANDLER CALLBACKS ----------*/
  //Captures (x, y) of cursor BEFORE release to pass to start function


  _createClass(Controller, [{
    key: "mouseDown",
    value: function mouseDown(e) {
      var pointerX = e.clientX;
      var pointerY = e.clientY;
      this.start(pointerX, pointerY);
    } //Capture (x, y) of cursor AFTER release to pass to start function

  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var pointerX = e.clientX;
      var pointerY = e.clientY;
      this.move(pointerX, pointerY);
    } //On mouse release captures release (x, y) and stretch (x, y)

  }, {
    key: "up",
    value: function up(e) {
      if (this.mode === 'stretch') {
        this.mode = 'fly';
        this.frame = this.trumpSize / 2;
        this.releaseX = this.x;
        this.releaseY = this.y;
        this.stretchX = this.slingX - this.x;
        this.stretchY = this.slingY - this.y;
      }

      if (this.mode === 'drag') this.mode = 'ready';
    }
    /* ---------- Physics/Logic ----------*/
    //Reset variables

  }, {
    key: "reset",
    value: function reset() {
      this.frame = 0;
      this.x = this.slingX;
      this.y = this.slingY;
      this.screenOffset = 0;
      this.counter = 0;
      this.mode = 'ready';
    } //Reset game and randomize target placement

  }, {
    key: "newGame",
    value: function newGame() {
      this.targetsRemaining = this.targetCount;

      for (var i = 0; i < this.targetCount; i++) {
        this.targets[i] = {
          x: this.slingX * 2 + Math.random() * 2 * this.canvasWidth,
          //Will change when generating levels
          y: Math.random() * (this.canvasHeight - this.trumpSize),
          alive: true
        };
      }

      this.reset();
    } //Change between stretch/drag modes

  }, {
    key: "start",
    value: function start(pointerX, pointerY) {
      if (this.mode === 'ready') {
        //When player drags Trump, mode = stretch
        if (pointerX > this.x - this.screenOffset && pointerX < this.x - this.screenOffset + this.trumpSize && pointerY > this.y && pointerY < this.y + this.trumpSize) {
          this.mode = 'stretch';
        } //If player drags map, mode = drag
        else {
            this.dragStartX = pointerX;
            this.mode = 'drag';
            this.startOffset = this.screenOffset;
          }
      }
    } //Moves Trump to given coordinates or changes screen offset based on drag distance

  }, {
    key: "move",
    value: function move(pointerX, pointerY) {
      if (this.mode === 'stretch') {
        this.x = pointerX + this.screenOffset;
        this.y = pointerY;
      }

      if (this.mode === 'drag') {
        this.screenOffset = this.startOffset + this.dragStartX - pointerX;
      }
    } //Main game loop

  }, {
    key: "loop",
    value: function loop() {
      var _this = this;

      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); //Clear canvas

      this.backgroundImage.onload = function () {
        _this.context.drawImage(_this.backgroundImage, _this.screenOffset, 0, _this.canvasWidth, _this.canvasHeight, 0, 0, _this.canvasWidth, _this.canvasHeight); //Draw background with offset

      }; //When stretching shot, draw line from top of shot to center of character


      if (this.mode === 'stretch') {
        this.context.beginPath();
        this.context.moveTo(this.slingX - this.screenOffset, this.slingY); //Start at sling's (x, y) coordinate

        this.context.lineTo(this.x - this.screenOffset + this.trumpSize / 4, this.y + this.trumpSize / 4); //

        this.context.stroke();
      } //When in fly this.mode, recalculate Trump's coordinates and screenOffset


      if (this.mode === 'fly') {
        this.x = this.releaseX + this.stretchX * this.counter / 10; //Horizontal change  = Point of release  plus the force of stretch 

        this.y = this.releaseY + this.stretchY * (this.counter / 10) + this.counter / 4 * (this.counter / 4); //Vertical change = Point of release  plus the force of stretch increased by frame counter^2 (Divide by 4 to simulate gravity)

        this.screenOffset = this.screenOffset + this.stretchX / 10;
        this.counter++; //How many frames of elapsed since release

        if (this.y > this.canvasWidth) this.newGame(); //If out of bounds, call newTrump
      } //Draw Trump


      this.trumpSprite.onload = function () {
        _this.context.drawImage(_this.trumpSprite, _this.frame, _this.canvasHeight, _this.trumpSize, _this.trumpSize, _this.x - _this.screenOffset, _this.y, _this.trumpSize / 2, _this.trumpSize / 2);
      }; // //Draw targets
      // for (let i = 0; i < this.targetCount; i++) {
      //     let target = targets[i];
      //     this.context.drawImage(this.targets, 200 * (2 + this.target.alive), this.canvasHeight, 200, 200, this.target.x - this.screenOffset, this.target.y, 200, 200);
      //     if (target.alive) {
      //         if (x + trumpSize > target.x && x < target.x + trumpSize && y + trumpSize > target.y && y < target.y + trumpSize) {
      //             this.target.alive = false; //Set false if target hit
      //             this.targetsRemaining--;
      //             if (this.targetsRemaining === 0) {
      //                 this.newGame();
      //             }
      //         }
      //     }
      // }

    }
  }]);

  return Controller;
}();

/* harmony default export */ __webpack_exports__["default"] = (Controller);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/controller */ "./src/js/controller.js");
 //Fit canvas to container

function fitToContainer(canvas) {
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvas.style = "position: absolute; left:0; top:0;";
} //Executes scripts


window.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  fitToContainer(canvas);
  var backgroundImg = new Image();
  backgroundImg.src = "assets/golf-background.jpg";
  var control = new _js_controller__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, context, backgroundImg, 400, 200, 5);
  canvas.addEventListener('mousedown', control.mouseDown);
  canvas.addEventListener('mousemove', control.mouseMove);
  canvas.addEventListener('mouseup', control.up);
  control.loop();
}); // function fitToContainer(canvas) {
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