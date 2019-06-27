// class Level {
//     constructor(controller) {
//         this.controller = controller;
//     }

//     /* ---------- EVENT HANDLER CALLBACKS ----------*/

//     //Captures (x, y) of cursor BEFORE release to pass to start function
//     mouseDown(e) {
//         let pointerX = e.clientX;
//         let pointerY = e.clientY;
//         this.controller.start(pointerX, pointerY);
//     }

//     //Capture (x, y) of cursor AFTER release to pass to start function
//     mouseMove(e) {
//         let pointerX = e.clientX;
//         let pointerY = e.clientY;
//         this.controller.move(pointerX, pointerY);
//     }

//     //On mouse release captures release (x, y) and stretch (x, y)
//     up(e) {
//         if (this.controller.mode === 'stretch') {
//             this.controller.mode = 'fly';
//             this.controller.frame = this.controller.trumpSize / 2;
//             this.controller.releaseX = this.controller.x;
//             this.controller.releaseY = this.controller.y;
//             this.controller.stretchX = (slingX - x);
//             this.controller.stretchY = (slingY - y);
//         }
//         if (this.controller.mode === 'drag') this.controller.mode = 'ready';
//     }
// }

// export default Level;