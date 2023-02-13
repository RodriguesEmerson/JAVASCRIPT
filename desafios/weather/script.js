const apiKey = '12f22154698ba8f0a76fe358ad2f9606'
const inpSearch = document.querySelector('#input-search')
const btn_search = document.querySelector('.btn-search')
const flag = document.querySelector('.country-flag')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const time = document.querySelector('.time')
const look = document.querySelector('.look')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const visibility = document.querySelector('.visibility')

const weather = {
    data: '',
    received: '',
    getDatas: async function(city_name){
        city_name = city_name.trim()
        city_name = city_name.replace(/\s{2,}/, ' ')
        city_name = city_name.replace(' ','%20')

        this.received = await fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&lang=pt_br`)
        this.data = await this.received.json()

        console.log(this.data)
       
    },
    main:  async function(city_name){
        try{
            await this.getDatas(city_name)
            test = (this.data.main.temp)
            console.log(test)
        }catch{
            console.log('Cidade não encontrada!!!')
        }
    }
}

weather.main('Varzelândia')