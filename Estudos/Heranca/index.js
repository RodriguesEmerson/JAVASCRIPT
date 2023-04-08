class Cars{
    constructor(marca, modelo, ano){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
}

class Avioes extends Cars{
    constructor(marca, modelo, ano, maxHeight){
        super(marca, modelo, ano)
        this.maxHeight = maxHeight;
    }
}       


const car1 = new Cars('Ford', 'Any', 2023);
console.log(car1)
 
const aviao1 = new Avioes('Boing', '247', 2023, '1000 feet')
console.log(aviao1)


//https://www.youtube.com/watch?v=wQfZ4cyNyqg