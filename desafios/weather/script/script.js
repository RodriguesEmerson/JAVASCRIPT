const apiKey = '12f22154698ba8f0a76fe358ad2f9606'
const inpSearch = document.querySelector('#input-search')
const btn_search = document.querySelector('.btn-search')
const flag = document.querySelector('.flag')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const time = document.querySelector('.time')
const look = document.querySelector('.look')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const visibility = document.querySelector('.visibility')
const temp_icon = document.querySelector('.temp-icon')
const bar_loading = document.querySelector('.bar-loading')
const cont_desc = document.querySelector('.cont-description')
const not_founded = document.querySelector('.not-founded')


btn_search.addEventListener('click', (e) => {
    e.preventDefault()
    weather.search()
})
inpSearch.addEventListener('keydown',(e) => {
    e.key == 'Enter' ? weather.search() : ''
})

const weather = {
    data: '',
    received: '',
    search: function(){
        if(inpSearch.value.length < 3) return
        this.main(inpSearch.value)
    },
    getDatas: async function(city_name){
        city_name = city_name.trim()
        city_name = city_name.replace(/\s{2,}/, ' ')
        city_name = city_name.replace(' ','%20')
        
        this.received = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&lang=pt_br`)
        this.data = await this.received.json()
    },
    main:  async function(city_name){
        try{
            bar_loading.classList.remove('close')
            cont_desc.classList.add('close')
            not_founded.classList.add('close')
            await this.getDatas(city_name)
            city.textContent = this.data.name

            flag.setAttribute('src', `https://flagsapi.com/${this.data.sys.country}/flat/64.png`)
            temp.textContent = parseInt(this.data.main.temp)
            temp.textContent = temp.textContent.slice(0,-1) + '°c'

            time.textContent = this.data.weather[0].description
            temp_icon.setAttribute('src', `https://openweathermap.org/img/wn/${this.data.weather[0].icon}.png` )

            look.innerHTML =`Sensação térmica:  <strong>${temp.textContent}</strong>` 
            humidity.innerHTML = `Umidade: <strong>${this.data.main.humidity}%</strong>`
            wind.innerHTML = `Vento: <strong>${this.data.wind.speed} km/h</strong>`
            visibility.innerHTML  = `Visibilidade: <strong>${this.data.visibility}m</strong>`

            bar_loading.classList.add('close')
            cont_desc.classList.remove('close')
        }catch{
            bar_loading.classList.add('close')
            cont_desc.classList.add('close')
            not_founded.classList.remove('close')
        }
    }
}