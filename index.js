const express = require('express');
const path = require('path')
const fs = require('fs'); // para trzer arquivos nesse caso usando JSON
const forecast = require('./public/forecast')
const geocode = require('./public/geocode');
const { error } = require('console');
const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
const hora = new Date;
const anoAtual = new Date().getFullYear();

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => { 
  res.render('index',{horaAtual:hora,
    anoAtual:anoAtual
  })
});

app.get('/contato', (req, res) => {
  res.render('contato',{horaAtual:hora,
    anoAtual:anoAtual
  });
});

app.get('/api-teste', (req, res) => {
  const loadNotes = ()=>{
    try{
         const dataBuffer = fs.readFileSync('./locations.json')
         return JSON.parse(dataBuffer) 

     }catch(e){
         return [{message: 'Erro encontrado'}]
     }
 
 }
  res.json(loadNotes());
  //res.render('text');
});

app.get('/gustavo', (req, res) => {

  res.send('<center><h1>OI EU SOU O GOKU</h1></center>');
  //res.render('text');
});

app.get('/weather',(req,res)=>{

  if(!req.query.adress){
     return res.send({error:'Precisa adicionar uma cidade'})
  }
                
  geocode(req.query.adress, (error,{latitude, longitude, location} ={})=>{
       if(error){
        return res.send({error})
       }
      forecast(latitude, longitude,(error,forecastData)=>{
          if(error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            adress: req.query.adress.split('?')[0]
          })
      })
      
  })
  
})

/*
res.send({forecast:'It is snowing',
  location:'Philadelphia',
  adress: req.query.adress.split('?')[0]
})
  */

app.get('/contato/*', (req,res)=>{
  res.send('pagina de contato não encontrada')
})
  app.get('*', (req,res)=>{
     res.render('404',{anoAtual:anoAtual})
  })

 
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})