let mario = document.querySelector('.mario-r');
let tunel = document.querySelector('.tunel');
let marioImg = document.querySelector('.mario-r').closest('img');
let jumpTime;
let jumping = false;

document.body.addEventListener('keypress', marioJump)

function marioJump(){
    if(jumping) return
    marioImg.removeAttribute('src')
    marioImg.setAttribute('src', 'imagens/2d-mario-jumping.png');
    marioImg.classList.add('jump');
    jumping = true
    
    jumpTime = setInterval(() => {
      if(jumping){
        marioImg.setAttribute('src', 'imagens/2d-mario-running.gif');
        marioImg.classList.remove('jump');
        clearInterval(jumpTime)
        jumping = false;
      }
    }, 800); 

}
function checkBump(){
    let tunelPosition = tunel.offsetLeft;
    let marioPostion = mario.offsetTop;

    if(tunelPosition <= 100 && tunelPosition > 97 &&  marioPostion > 175){
        console.log('Bateu')  
    }
}
// setInterval(() => {
//     checkBump()
// }, 10);  
