this.age = 24
this.name = 'Emerson'

function sayAge(age) {
    this.age = arguments[1]
    this.name = arguments[0]
    console.log(this.name, this.age)
}
const test = {
    name: "Erika", age: '23'
}

//sayAge.apply(test, ['Nome', '20'])

const NewFnc = sayAge.bind()
//NewFnc('Emerson', 24)

let ftest = a =>{

}
