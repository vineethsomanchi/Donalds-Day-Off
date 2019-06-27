// const SPRITE_SIZE = 256;

// class Animation {
//     constructor(frame_type) {
//         this.current_frame = 0;
//         this.frame_type = frame_type;
//         this.frame;
//         this.image = new Image();
//         this.change = this.change.bind(this)
//         this.update = this.change.bind(this)
//         this.render = this.change.bind(this)
//     }

//     change(frame_type) {
//         debugger
//         if(this.frame_type !== frame_type) {
//             if(frame_type === "still") {
//                 this.frame_type = "still"
//                 this.image.src = "assets/still.png"
//                 this.current_frame = 0              
//             }
//         }
//     }

//     update() {
//         if(this.current_frame === this.frame.length - 1) {
//             this.current_frame = 0
//         } else {
//             this.current_frame++
//         }
//     }

//     render(context) {
//         if(this.frame_type === "still") {
//             this.frame = [
//                 { image: this.image, posX: 0, posY: 0 },
//                 { image: this.image, posX: 256, posY: 0 },
//                 { image: this.image, posX: 512, posY: 0 },
//                 { image: this.image, posX: 768, posY: 0 },
//                 { image: this.image, posX: 1024, posY: 0 },
//                 { image: this.image, posX: 1280, posY: 0 },
//                 { image: this.image, posX: 1536, posY: 0 },
//                 { image: this.image, posX: 1792, posY: 0 },
//                 { image: this.image, posX: 2048, posY: 0 },
//                 { image: this.image, posX: 2304, posY: 0 }
//             ]
//         }

//         let current_render = this.frame[this.current_frame]
//         context.drawImage(current_render.image, current_render.posX, current_render.posY, SPRITE_SIZE, SPRITE_SIZE, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
//     }
// }

// module.exports = Animation;