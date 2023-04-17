//PROJETO PAUSADO POIS JA APLIQUEI O QUE APENDI, E NA VERDADE, É MUITO SIMPLES. QUE SÃO CLASSES. 14-04-23

const search = document.querySelector('#sell-product-search');
const product = document.querySelector('#sell-product-name');
const amount = document.querySelector('#sell-product-amount');
const value = document.querySelector('#sell-product-value');
const totalProduct = document.querySelector('#sell-product-total-value');

let products = [
    {code: 12345,
    name: 'Juice',
    stock: 50,
    purchaseValue: 025,
    saleValue: .50,
    batch: 431343,
    validity:'31/12/2023'
    }
];

const main = {
    productDatas: '',
    searchProcutc(searchCode){
        this.productDatas = products.find((product) => product.code === searchCode);
        if(this.productDatas){
            screen.showProductFound(this.productDatas)
        }else{
            console.log('Produto não encontrado!')
        }
    },

    addProductToSellList(){
        const {code, name, saleValue} = this.productDatas;
        const total = amount.value * saleValue;
        const addedProduct = new this.productPreSold(code, name, amount.value, saleValue, total)
        this.list.push(addedProduct)
       
    },

    productPreSold: class ProductPreSold{
        constructor(code, name, amount, value, total){
            this.code = code,
            this.name = name,
            this.amount = amount,
            this.value = value,
            this.total = total
        }
    },
    list: [],
}

const screen = {
    showProductFound(productDatas){
        product.value = productDatas.name;
        value.value = `R$ ${productDatas.saleValue}`;
        totalProduct.value =  `R$ ${amount.value * productDatas.saleValue}`;
    },

    updateList(){
    }
}


document.addEventListener('click', (event) => {
    const element = event.target.id;
    switch (element) {
        case 'sell-add-product-btn':
            
            break;
    
        default:
            break;
    }
    
});
search.addEventListener('keydown', btn => {
    if(btn.key === 'Enter') main.searchProcutc(Number(search.value));
})