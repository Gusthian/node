const fs = require('fs')
const { stringify } = require('querystring')
// arquivo criado
/*

const book = {
    tittle: 'Somehow i manage',
    autor:'Michael Scoot',
    description:'That\'s was she said'
}
/*const book2 = {
    tittle: 'Somehow i manage',
    autor:'Michael Scoot',
    description:'That\'s was she said'
}


//transforma em JSON
const bookJSON = JSON.stringify(book)
//salva no arquivo
fs.writeFileSync('book.json',bookJSON)
// tentando acessar o arquivo criado mas retorna em buffer
const readBook = fs.readFileSync('book.json')
console.log(readBook)
//transforma em string adicionando toString()
const bookString = readBook.toString()
console.log(bookString)
//transforma em objeto do JSON
const bookObj = JSON.parse(bookString)
console.log(bookObj.autor)

//transforma em objeto do JSON
//const bookObj = JSON.parse(bookJSON)
//console.log(bookObj.tittle)
*/

const readData= fs.readFileSync('JsonData.json')
console.log(readData)
const dataString = readData.toString()
const dataObj = JSON.parse(dataString)
//console.log(dataObj.name='CRIS',dataObj.age='10',dataObj.earth='Earth')
dataObj.name='CRIS'
dataObj.age='10'
dataObj.earth='Earth'

const dataObjJSON = JSON.stringify(dataObj)
console.log(dataObjJSON)
fs.writeFileSync('JsonData2.json',dataObjJSON)
