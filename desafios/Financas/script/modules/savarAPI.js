import axios from "axios";

function salvarAPI(dados){
    axios.post(
        'https://sheetdb.io/api/v1/kk8rkzqs47idu',
        {
            bdDados: dados
        },
        {
            headers: {
                'Authorization': 'Bearer d0x15pgk',
                'Password': '6ib4t3y4d1lz83nqcri2'
            }
        }
    )
    .then(response => {
        console.log(response.data)
    })
}
salvarAPI('teste') 
console.log('ok')

// Login: d0x15pgk
// Password: 6ib4t3y4d1lz83nqcri2