const request = require('request')

//server.js
//const url='https://3001-firebase-athena-nodejs-1749241069444.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/destinations-api'
//server index.js
//const url ='https://9000-firebase-athena-nodejs-1749241069444.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/api-teste'
//console.log(url)

//request({ url: url, json: true }, (error, response) => {
  //  console.log(response.body)
//})




//callback
const city = (city, callback) => { 
    const url ='https://9000-firebase-athena-nodejs-1749241069444.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/api-teste'
      console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

city('são paulo', (error,data)=>{
    console.log(data)
})