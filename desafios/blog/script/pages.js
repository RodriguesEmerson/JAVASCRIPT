const urlNews = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7cb7dfae6219408d83c634bbb4d31e8a'
const emp_title = document.querySelector('.emphasis .title')
const emp_img = document.querySelector('.emp-img')
const emp_desc = document.querySelector('.emphasis .little-desc')
const emp_font = document.querySelector('.emphasis .font')
const emp_author = document.querySelector('.emphasis .author')
const cont_more = document.querySelector('.cont-more')

const url = new URLSearchParams(window.location.search)
const urlId = url.get('id')

const loadPages = {
    data: '',
    received: '',
    getDatas: async function(){
        this.received =  await fetch(urlNews)
        this.data = await this.received.json()
        console.log(this.data)
    },
    putDatas: async function(){
        await this.getDatas()

        emp_title.textContent = this.data.articles[urlId].title
        emp_img.setAttribute('src', `${this.data.articles[urlId].urlToImage}`)

        let reg =   /\…\s\[\+\w+\s\w+\]/im
        
        emp_desc.innerHTML = this.data.articles[urlId].content
        emp_desc.innerHTML = emp_desc.innerHTML.replace(reg.exec(emp_desc.innerHTML), '.')
        console.log(reg.exec(this.data.articles[urlId].content))

        reg = /\d{4}\-\d{2}\-\d{2}/
        emp_font.textContent = `Font: ${this.data.articles[urlId].source.name} - ${reg.exec(this.data.articles[urlId].publishedAt)}`
        emp_author.textContent = 'Author: ' + this.data.articles[urlId].author
    },
}
loadPages.putDatas()