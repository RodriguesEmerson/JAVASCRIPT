let cv = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')
let h_point = document.querySelector('.hover-point')
let points;

let cont = cv.getContext("2d");
let arr =[  [30, 50], 
            [50,70], 
            [70, 90], 
            [90,100],
            [120, 110], 
            [155,90] ,
            [163, 100], 
            [230,50],
            [261, 100], 
            [300,70]
        ]

let luc = [300, 231, 345, 435, 623, 123, 321, 238]
let days = 8 /* array length */
let larg = cv.width;
let gap = larg / days - 2
let base = cv.height
let start = gap;
let alt, newBall;

cont.moveTo(0, 300)
for(let i = 0; i < days; i++){
    alt = ((luc[i]/100) * base / 7);

    cont.lineTo(start, alt);
    newBall = document.createElement('span');
    newBall.setAttribute('class', 'point');

    newBall.style.left = start - 5 + 'px';
    newBall.style.top = alt - 5 + 'px';
    container.appendChild(newBall)
    start += gap;
   
    points = document.querySelectorAll('.point')
}

for(let i = 0; i < points.length; i++){
    points[i].addEventListener('mouseover', (e) =>{
        h_point.classList.remove('hide')
        let[x, y] = [e.clientX, e.clientY]
        console.log(x, y)
    })
}

/**
 * x% de M = (x/100) * M //Porcetagem
 */

// cont.fillStyle = 'black'// Preenchimento
// cont.moveTo(0, 300)
// cont.lineTo(200, 150) /*eixo x e y*/
// cont.lineTo(300, 50)
// cont.moveTo(0, 300)
// cont.lineTo(50, 150)
// cont.moveTo(0, 300)
// for(let i = 0; i < 10; i++){
    
//     cont.lineTo(arr[i][0], arr[i][1])

// }
//cont.arc(300, 150, 120, 0, Math.PI * 2, false); 
/*300,150 Coordenadas do cento do círculo*/
/*120 Raio, 0 ângulo inicial, Math.PI ângulo final, false = sentido horario*/
// cont.closePath();
cont.strokeStyle = "white";
cont.stroke();