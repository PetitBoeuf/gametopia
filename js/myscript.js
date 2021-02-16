var centeredImage;

function AnimateMe(){
    centeredImage = document.querySelector('#centeredOne');
    let tempSrc = centeredImage.src;
    centeredImage.src = centeredImage.alt;
    centeredImage.alt = tempSrc;
}

function DeanimateMe(){
    let tempAlt = centeredImage.alt;
    centeredImage.alt = centeredImage.src;
    centeredImage.src = tempAlt;
}

/*
1."https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
2."https://media.giphy.com/media/JVGLHEuzbVviw/giphy.gif"
3."https://media.giphy.com/media/iFDtBQ0fC0DPCdiPBA/giphy.gif"
*/