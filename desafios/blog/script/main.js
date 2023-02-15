const apikey = '7cb7dfae6219408d83c634bbb4d31e8a'
const urlNews = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7cb7dfae6219408d83c634bbb4d31e8a'
const emp_title = document.querySelector('.emphasis .title')
const emp_img = document.querySelector('.emp-img')
const emp_desc = document.querySelector('.emphasis .little-desc')
const emp_font = document.querySelector('.emphasis .font')
const emp_author = document.querySelector('.emphasis .author')
const cont_more = document.querySelector('.cont-more')


const news = {
    data: '',
    received: '',
    getDatas: async function(){
        this.received = await fetch(urlNews)
        this.data = await this.received.json()
        console.log(this.data)
    },
    putDatas: async function(){
        await this.getDatas()

        emp_title.textContent = this.data.articles[0].title
        emp_img.setAttribute('src', this.data.articles[0].urlToImage)
        emp_desc.innerHTML = this.data.articles[0].description
        emp_font.textContent = `Font: ${this.data.articles[0].source.name}`
        emp_author.textContent = `Author: ${this.data.articles[0].author}`

        this.createMore()
    },
    createMore: function(){
        
        for(let i = 2; i <= 10; i++){
            let newMore = document.createElement('div')
            newMore.setAttribute('class', 'more')
            let newTitle = document.createElement('h2')
            newTitle.setAttribute('class', 'title')
            let newImg = document.createElement('img')
            let newDesc = document.createElement('div')
            newDesc.setAttribute('class', 'description')
            let newLtDes = document.createElement('p')
            newLtDes.setAttribute('class','little-desc')
            let newFont = document.createElement('p')
            newFont.setAttribute('class', 'font')

            cont_more.appendChild(newMore)
                newMore.appendChild(newTitle)
                newMore.appendChild(newImg)
                newMore.appendChild(newDesc)
                    newDesc.appendChild(newLtDes)
                    newDesc.appendChild(newFont)

            newTitle.innerHTML = this.data.articles[i].title
            newImg.setAttribute('src', this.data.articles[i].urlToImage)
            newLtDes.innerHTML = this.data.articles[i].description

            const published = this.data.articles[i].publishedAt
            const reg = /\d{4}\-\d{2}\-\d{2}/
            newFont.innerHTML = `Font: ${this.data.articles[i].source.name} - ${reg.exec(published)}`
        }   
    },
}

 news.putDatas()