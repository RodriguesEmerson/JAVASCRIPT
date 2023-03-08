let canvas = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')

let [labelSize, labelText, newLabel, labelHalf,
     barWidth, barWidthRaw, barHeight, barTop, barLeft, barHalf,
     gap,canvasWidth, canvasHeight, maxValue, divisor,
     index
    ] = [];

let dados = [300, 231, 305, 435, 730]
let colors = ['blueviolet', 'chocolate', 'blue', 'green', 'brown', 'red']
let labels = ["Label1", "Label2", "Label3", "Label5", "Label5", "Label6"]
let arrLength = dados.length;
let draw = canvas.getContext("2d");

/**Funão auto-executável */
;(function barrasSet(){

    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;

    barWidthRaw = canvasWidth / arrLength;
    /**Width da barra sem considerar o gap */

    barHalf = barWidthRaw / 2;
    /**50% da largura da barra */ 

    barWidth = barHalf + (barHalf / 2);
    /**Width de cada barra*/ 

    gap = barHalf * 1.9; 
    /**Distância entre uma barra e outra */

    barLeft = barHalf / 2;
    /**Left de cada barra */

    maxValue = Math.max(...dados); 
    /**Maior número do array */

    divisor = (1,11/1000) * maxValue; 
    /**1,11% de maxValue */

})();


/**Funão auto-executável */
;(function desenhaBarras(){

    dados.forEach(element => {

        index = dados.indexOf(element)/**Índece do elemento */

        barHeight = (element/100) * canvasHeight / divisor; /**Altura de cada barra */
        barTop = canvasHeight - barHeight; /**Distância do Topo */

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
 * de barras que serão criadas para fazer os outros cálculos.
 *      | barHalf = Width do canvas / quantidade de barras.
 * 
 *      1.2 - Pegar o resultado acima e somar 50% mais 50% 
 *      desses 50% para gerar a width correta de cada barra.
 *          | barWidth = barHalf + (barHalf / 2)
 * 
 *      1.3 - O gap deve ser 50% de barHalf multiplicado por
 *      1,9 (obs: Esse 1.9 foi o melhor valor que encontrei
 *      para que o gap ficasse do melhor tamlho possível)
 *          | gap = barHalf * 1.9
 * 
 *      1.4 - O left, primeiramente, tem o mesmo valor de
 *      barHalf dividido por 2.
 *      Depois,para que a primeira barra tenha o mesmo left de cada
 *      gap, ja no final do forEach, acrecento ao left
 *      o valor do gap para que cada barra fique na posição 
 *      correta.
 *          | Preimeiro - barLeft = barHalf / 2
 *          | Depois - barLeft += gap
 * 
 * 2 - A altura máxima da barra deve ser quantos percento a
 * barra tem em relação a altura do canvas, e calcular um
 * divisor para que cada barra tenha a altura em relação a barra
 * mais alta. O divisor deve ser % dividido por 1000 e 
 * multplicado pelo maior valor encontrado no array.
 *      | divisor = (1,11 / 1000) * maiorValor
 * 
 * 3 - o Texto deve ficar 5px acima de cada barra, sendo assim,
 * basta pegar a altura da barra subtrair 5px. Já o left do texto,
 * como não tem como dar um display-flex, é preciso criar um span
 * com o texto de cada label com create elemente na tela, depois 
 * pegar o offsetWidth do span. 
 * Esse span terá a fonte do mesmo tamanho da fonte definida
 * na label do grafico. Aí é só pegar a width da label, dividir por 2 e tendo
 * essa medida, posicionar na distancia left da barra mais a metade da
 * width da barra e subtrair a widhtLabel divido por 2.
 *      | leftBarra + (widthBarra / 2) - (widthLabel / 2), (TopBarra - 5);
 * 
 */

