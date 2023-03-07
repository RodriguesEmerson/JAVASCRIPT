let canvas = document.querySelector('.graphic-one')
let container = document.querySelector('.cont-canvas')

let dados = [300, 231, 305, 435, 623, 730, 123, 321, 238, 234]
let draw = canvas.getContext("2d");

/**Desenha a Barra */
draw.fillStyle = "white";
draw.fillRect(50,120,30,180); /**left, top, width, height */


let font = getGraphics().getFont();
let textWidth = font.stringWidth("ERIKAA")
console.log(textWidth)

/**Desenha a label */
draw.font ="1em Arial";
draw.fillText("ERIKAA", 50 + 15 - 9.5, 110 ) /**Texto, left, top */

/**Desenha a borda do Gráfico 
*   draw.strokStyle = 'Black';
*   draw.strokeRect(30, 120, 30, 180)
*/


/** ======================== LÓGICA =============================
 * 
 * 1 - Calcular a width de cada barra com base na quantidade
 * de barras que serão criadas. 
 *      | Width do canvas / quantidade de barras.
 * 
 * 2 - A altura máxima da barra deve ser quantos percento a
 * barra tem em relação a altura do canvas e calcular um
 * divisor para que cada barra tenha a altura em relação a barra
 * mais alta. O divisor deve ser % dividido por 1000 e 
 * multplicado pelo maior valor encontrado no array.
 *      | (% / 1000) * maiorValor
 * 
 * 3 - O gap entre cada barra deverá ser calculado com base
 * na quantidade de barrar, ou seja, em porcetagem. Por 
 * enquanto fica 50% como base de cálculo.
 * 
 * 4 - o Texto deve ficar 15px acima de cada barra, sendo assim,
 * basta pegar a altura da barra e somar 15px. Já o left do texto,
 * como não tem como dar um display-flex,
 */


// console.log(Math.max(...dados))


