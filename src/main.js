import Controller from "./js/controller";

//Fit canvas to container
function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.style = "position: absolute; left:0; top:0;";
}



//Executes scripts
window.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d')
    fitToContainer(canvas);

    let backgroundImg = new Image();
    let trumpImg = new Image();
    backgroundImg.src = "assets/golf-background.jpg";
    trumpImg.src = "assets/still.png"

    let control = new Controller (canvas, context, backgroundImg, trumpImg, 400, 200, 5)
    canvas.addEventListener('mousedown', control.mouseDown)
    canvas.addEventListener('mousemove', control.mouseMove)
    canvas.addEventListener('mouseup', control.up)

    const loaded = () => {
        if(backgroundImg.complete && trumpImg.complete) {
            control.loop();
        }

        window.requestAnimationFrame(loaded)
    }
    
    backgroundImg.onload = loaded()
    // trumpImg.onload = loaded()


    
})
    






// function fitToContainer(canvas) {
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