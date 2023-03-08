let canvas = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')

let [labelSize, labelText, newLabel, labelHalf,
     barWidth, barWidthRaw, barHeight, barTop, barLeft, gap,
     canvasWidth, canvasHeight, maxValue, divisor,
     index
    ] = [];

//305, 435, 623, 730, 123, 321, 238, 234
let dados = [300, 231, 305, 435, 730]
let colors = ['blueviolet', 'chocolate', 'blue', 'green', 'brown', 'red']
let labels = ["Label1", "Label2", "Label3", "Label5", "Label5", "Label6"]
let arrLength = dados.length;
let draw = canvas.getContext("2d");

canvasWidth = canvas.offsetWidth;
canvasHeight = canvas.offsetHeight;
barWidthRaw = canvasWidth / arrLength;

barLeft = barWidthRaw / 2;



barWidth = barLeft + (barLeft / 2); /**Width de cada barra*/
gap = barLeft * 1.9;  /**Distância entre uma barra e outra */

barLeft = barLeft / 2;

maxValue = Math.max(...dados);
divisor = (1,11/1000) * maxValue;

/**Funão auto-executável */
;(function drawBarras(){

    dados.forEach(element => {
        index = dados.indexOf(element)
        barHeight = (element/100) * canvasHeight / divisor; /**Altura da barra | valor / 100 * canvasHeigth / divisor */
        barTop = canvasHeight - barHeight;
        /**Desenha a Barra */
        draw.fillStyle = colors[index]
        draw.fillRect(barLeft, barTop, barWidth, barHeight); /**left, top, width, height */

        

        /**Criando a Label de cada barra */
        labelSize = 15
        labelText = labels[index]

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

//valor base * (porcentagem/100).
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
 * na quantidade de barras, ou seja, em porcetagem. 
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
 *      | leftBarra + (widthBarra / 2) - (widthLabel / 2), (TopBarra - 5);
 * 
 * OBS: Alguns dos números tive que procurar o que dava o melhor
 * resultado, como o 1.9 do 'gap'.
 */

