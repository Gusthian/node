const https = require('https')
const url = 'https://api.weatherstack.com/current?access_key=0b02a05a0b2b6be73dabeacac1c8b5a6&query=-16.500357,-68.13408'

const request = https.request(url, (response)=>{
    let data =''
   response.on('data', (chunk)=>{
      data = data + chunk.toString()
    console.log(chunk)
   })
    response.on('end', ()=>{
        console.log('Dados recebidos')
        const body=JSON.parse(data)
        console.log(body)
    })

})
request.on('error', (error)=>{
    console.log('Erro na requisição',error)
})
request.end()
