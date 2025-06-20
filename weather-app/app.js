const request = require('request')
const geocode = require('./geocode')
const forecast = require ('./forecast')
const yargs = require ('yargs')
//const url='https://api.weatherstack.com/current?access_key=0b02a05a0b2b6be73dabeacac1c8b5a6&query=New%20York'

//request({ url: url, json:true},(error, response)=>{
    //console.log('Quero morar em',response.body.location.region)
//})


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!
/*
const dataNome =(nome,callback)=>{
    setTimeout(()=>{
        const data = ['Gustavo', 'Cristhian']
        data.forEach((nome)=>{
            callback(nome) 
        })
        
    },2000)
}
dataNome('Nome', (data)=>{
   console.log(data)
})
*/


const adress = process.argv[2]

if(!adress){
console.log('Adicionar uma região correta')
} else{
  console.log('Processando dados para:'+process.argv[2]+'...')
  geocode(adress, (error,{latitude, longitude, location}={})=>{
    if(error){
      return console.log(error)
    }
    forecast(latitude,longitude, (error, forecastData) => {
      if (error) {
        return console.log(error)
      }
      console.log(location)
      console.log(forecastData)
    })
  })
}

/// teste objeto desestructurar 

const product = {
  name: 'Book',
  price: 10,
  rating: 4.5

}

const myProduct = (type, {name, price, rating})=>{

   console.log(type, name,'no preço de',price, 'votação',rating)
}
myProduct('Comprei: ', product)
  

