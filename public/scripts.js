
console.log('SOU UM ESCRIPTI');




const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener('submit',(e)=>{
   
   e.preventDefault()
   console.log(input.value)
    const location = document.querySelector('#location')
    const forecast = document.querySelector('#forecast')
   fetch('https://9000-firebase-athena-nodejs-1749241069444.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/weather?adress='+input.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            location.textContent= data.error
            forecast.textContent=''

        }
        else{
            location.textContent = data.location
            forecast.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
      
    })
})


})