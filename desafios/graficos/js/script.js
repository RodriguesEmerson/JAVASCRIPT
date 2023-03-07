let canva = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')
let h_point = document.querySelector('.hover-point')
let points;

let line = canva.getContext("2d");
let dados = [300, 231, 305, 435, 623, 1000, 123, 321, 238, 234]
let days = 10 /* array length */
let larg = canva.width;
let gap = larg / days - 2 /**Distancia entre um ponto e outro */
let base = canva.height
let start = gap;
let alt, newBall,divisor, maiorValor = 0;

/**Procura o maior número do array */
dados.forEach(element =>{
    if(element > maiorValor){
        maiorValor = element
    }
})
/**Pega 1,11% do maiorValor do array */
divisor = (1,11/1000) * maiorValor;

/**Move o ponto inicial da linha para o canto inferior esquerdo */
line.moveTo(0, 300)

for(let i = 0; i < days; i++){
    
    /**Calcula quantos % o número é a base e divide pelo divisor.
     * O divisor é o que faz gráfico caber dentro do canvas.
     */
    alt = ((dados[i]/100) * base / divisor);

    /**base - alt é a altura idel para cada ponto do gráfico.
     * Caso eu coloque apenas alt, o gráfico fica de cabeça 
     * para baixo.
     */
    line.lineTo(start, base - alt); 

    /**Cria uma bola em cada ponto do gráfico */
    newBall = document.createElement('span');
    newBall.setAttribute('class', 'point');

    newBall.style.left = start - 5 + 'px';
    newBall.style.top = base - alt - 5 + 'px';
    container.appendChild(newBall)
    start += gap;
    
    /**atualiza a vairável points */
    points = document.querySelectorAll('.point')
}
/**Dá cor a linha e a desenha */
line.strokeStyle = "white";
line.stroke();

for(let i = 0; i < points.length; i++){
    points[i].addEventListener('mouseover', (e) =>{

        /**Mostra uma mensagem tipo um ':hover' com o valor do ponto */
        h_point.classList.remove('hide');
        let[x, y] = [e.clientX, e.clientY];
        h_point.style.left = x + 'px';
        h_point.style.top = y + 'px';
       h_point.textContent = (dados[i]);
    })
    points[i].addEventListener('mouseout', (e) =>{
        h_point.classList.add('hide');
    })
}




/**
 * x% de M = (x/100) * M //Porcetagem
 */
 // let arr =[  [30, 50], 
//             [50,70], 
//             [70, 90], 
//             [90,100],
//             [120, 110], 
//             [155,90] ,
//             [163, 100], 
//             [230,50],
//             [261, 100], 
//             [300,70]
//         ]
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
// cont.strokeStyle = "white";
// cont.stroke();