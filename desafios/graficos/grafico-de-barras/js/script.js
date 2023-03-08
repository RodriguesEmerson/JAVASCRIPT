let canvas = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')

let [labelSize, labelText, newLabel, labelHalf,
     barWidth, barWidthRaw, barHeight, barTop, barLeft, gap,
     canvasWidth, canvasHeight, maxValue, divisor
    ] = [];

//305, 435, 623, 730, 123, 321, 238, 234
let dados = [300, 231, 305, 435, 730, 321]
let colors = ['blueviolet', 'yellow', 'blue', 'green', 'brown', 'red']
let labels = ["Label1", "Label2"]
let arrLength = dados.length;
let draw = canvas.getContext("2d");

canvasWidth = canvas.offsetWidth;
canvasHeight = canvas.offsetHeight;
barWidthRaw = canvasWidth / arrLength;

barLeft = (barWidthRaw / 2);

barWidth = barWidthRaw - (barLeft * arrLength ); /**Width de cada barra - barLeft * arrLength */
gap = barWidth + barWidth / 2;  /**Distância entre uma barra e outra */

maxValue = Math.max(...dados);
divisor = (1,11/1000) * maxValue;


/**Funão auto-executável */
;(function drawBarras(){

    dados.forEach(element => {
        barHeight = (element/100) * canvasHeight / divisor; /**Altura da barra | valor / 100 * canvasHeigth / divisor */
        barTop = canvasHeight - barHeight;
        
        /**Desenha a Barra */
        draw.fillStyle = colors[dados.indexOf(element)]
        draw.fillRect(Math.abs(barLeft), barTop, barWidth, barHeight); /**left, top, width, height */

        labelSize = 15
        labelText = 'Label'

        /**Criando a Label de cada barra */
        newLabel = document.createElement('span')
            newLabel.textContent = labelText
            newLabel.style.fontSize = `${labelSize}px`
        container.appendChild(newLabel)

        /**Pega a width da label */
        labelHalf = newLabel.offsetWidth / 2 
        container.removeChild(newLabel)

        /**Desenha a label e a posiciona*/
        draw.font =`${labelSize}px Arial`;
        draw.fillText(labelText, barLeft + (barWidth / 2) - labelHalf , barTop - 5 ) /**Texto, left, top */

        barLeft += gap;
    })
    

})();

/** ======================== LÓGICA =============================
 * 
 * 1 - Calcular a width de cada barra com base na quantidade
 * de barras que serão criadas. 
 *      | Width do canvas / quantidade de barras.
 * 
 * 2 - A altura máxima da barra deve ser quantos percento a
 * barra tem em relação a altura do canvas, e calcular um
 * divisor para que cada barra tenha a altura em relação a barra
 * mais alta. O divisor deve ser % dividido por 1000 e 
 * multplicado pelo maior valor encontrado no array.
 *      | (% / 1000) * maiorValor
 * 
 * 3 - O gap entre cada barra deverá ser calculado com base
 * na quantidade de barras, ou seja, em porcetagem. Por 
 * enquanto fica 50% multiplicado pela quantidade de itens 
 * no array como base de cálculo.
 * 
 * 4 - o Texto deve ficar 5px acima de cada barra, sendo assim,
 * basta pegar a altura da barra subtrair 5px. Já o left do texto,
 * como não tem como dar um display-flex, é preciso criar um span
 * com o texto de cada label com create elemente na tela, depois 
 * pegar o offsetWidth do span. 
 * Esse span tera a fonte do mesmo tamanho da fonte definida
 * na label do grafico. Pegar a width da label, a dividir por 2 e tendo
 * essa medida, diminuir da distancia left da barra mais a metade da
 * width da barra desse valor que conseguir.
 *      | leftBarra + (widthBarra / 2) - (widthLabel / 2), (TopBarra - 5)
 */


// console.log(Math.max(...dados))

/**Desenha a borda do Gráfico 
*   draw.strokStyle = 'Black';
*   draw.strokeRect(30, 120, 30, 180)
*/

