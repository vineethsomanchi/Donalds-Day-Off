class Controller {

    /* ---------- CONSTRUCTOR ----------*/
    constructor(canvas, context, backgroundImage, trumpSprite, slingX, slingY, targetCount) {
        this.canvas = canvas;
        this.context = context;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.backgroundImage = backgroundImage;
        this.trumpSprite = trumpSprite;
        // this.targetImage = new Image();
        // this.targetImage.src = "assets/icon.png"
        this.trumpSize = 256
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
        for (let i = 0; i < this.targetCount; i++) {
            let target = {
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
    mouseDown(e) {
        let pointerX = e.clientX;
        let pointerY = e.clientY;
        this.start(pointerX, pointerY);
    }

    //Capture (x, y) of cursor AFTER release to pass to start function
    mouseMove(e) {
        let pointerX = e.clientX; 
        let pointerY = e.clientY;
        this.move(pointerX, pointerY);
    }

    //On mouse release captures release (x, y) and stretch (x, y)
    up(e) {
        if (this.mode === 'stretch') {
            this.mode = 'fly';
            this.frame = this.trumpSize/2;
            this.releaseX = this.x;
            this.releaseY = this.y;
            this.stretchX = (this.slingX - this.x);
            this.stretchY = (this.slingY - this.y);
        }
        if (this.mode === 'drag') this.mode = 'ready';
    }



    /* ---------- Physics/Logic ----------*/

    //Reset variables
    reset() {
        this.frame = 0;
        this.x = this.slingX;
        this.y = this.slingY;
        this.screenOffset = 0;
        this.counter = 0;
        this.mode = 'ready';
    }

    //Reset game and randomize target placement
    newGame() {
        this.targetsRemaining = this.targetCount;
        for (let i = 0; i < this.targetCount; i++) {
            this.targets[i] = {
                x: this.slingX * 2 + Math.random() * 2 * this.canvasWidth, //Will change when generating levels
                y: Math.random() * (this.canvasHeight - this.trumpSize),
                alive: true
            };
        }
        this.reset();
    }

    //Change between stretch/drag modes
    start(pointerX, pointerY) {
        if (this.mode === 'ready') {

            //When player drags Trump, mode = stretch
            if (pointerX > this.x - this.screenOffset && pointerX < this.x - this.screenOffset + this.trumpSize && pointerY > this.y && pointerY < this.y + this.trumpSize) {
                this.mode = 'stretch';
            }

            //If player drags map, mode = drag
            else {
                this.dragStartX = pointerX;
                this.mode = 'drag';
                this.startOffset = this.screenOffset;
            }
        }
    }

    //Moves Trump to given coordinates or changes screen offset based on drag distance
    move(pointerX, pointerY) {
        if (this.mode === 'stretch') {
            this.x = pointerX + this.screenOffset;
            this.y = pointerY;
        }
        if (this.mode === 'drag') {
            this.screenOffset = this.startOffset + this.dragStartX - pointerX;
        }
    }


    //Main game loop
    loop() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); //Clear canvas
        this.context.drawImage(this.backgroundImage, this.screenOffset, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight); //Draw background with offset
        this.context.drawImage(this.trumpSprite, this.frame, this.canvasHeight, this.trumpSize, this.trumpSize, this.x - this.screenOffset, this.y, this.trumpSize / 2, this.trumpSize / 2);

        //When stretching shot, draw line from top of shot to center of character
        if (this.mode === 'stretch') {
            this.context.beginPath();
            this.context.moveTo(this.slingX - this.screenOffset, this.slingY); //Start at sling's (x, y) coordinate
            this.context.lineTo(this.x - this.screenOffset + this.trumpSize / 4, this.y + this.trumpSize / 4); //
            this.context.stroke();
        }

        //When in fly this.mode, recalculate Trump's coordinates and screenOffset
        if (this.mode === 'fly') {
            this.x = this.releaseX + this.stretchX * this.counter / 10; //Horizontal change  = Point of release  plus the force of stretch 
            this.y = this.releaseY + this.stretchY * (this.counter / 10) + (this.counter / 4) * (this.counter / 4); //Vertical change = Point of release  plus the force of stretch increased by frame counter^2 (Divide by 4 to simulate gravity)
            this.screenOffset = this.screenOffset + this.stretchX / 10;
            this.counter++; //How many frames of elapsed since release
            if (this.y > this.canvasWidth) this.newGame(); //If out of bounds, call newTrump
        }

        

        // //Draw targets
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
}

export default Controller;