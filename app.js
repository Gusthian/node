//const fs = require('fs')

//fs.writeFileSync('note.txt',`Hola dentro do arquivo`)
//fs.appendFileSync('note.txt',' e estou sendo adicionado!')

const validator = require('validator')
const getInfo = require('./variables.js')  //chama a função da pagina variables
const chalk = require('chalk')
const yargs = require ('yargs')
const notes = require('./notes.js')

//const msg = getInfo()  chama a função da pagina variables
//console.log(msg) imprime a mensagem que esta na outra pagina
let site = 'http://site.com'

const greenMsg = chalk.green.inverse.bold('É site')
const redMsg = chalk.red.inverse.bold('Não é site')
//console.log(greenMsg)
//console.log(redMsg)

let colorRed = (text)=>{
    return chalk.red.inverse.bold(text)
}

let colorGreen = (text)=>{
    return chalk.green.inverse.bold(text)
}

yargs.version('4.0.2')

yargs.command({
    command:'add',
    describe:'Adicione uma nota',
    builder:{
        title:{
            describe:'Nota a ser adicionada',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Corpo da nota',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>{
        notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command:'remove',
    describe:'Remova uma nota',
    builder:{
        title:{
            describe:'Nota a ser adicionada',
            demandOption:true,
            type:'string'
        },
     
    },
    handler:(argv)=>{
        notes.removeNote(argv.title)}
})

yargs.command({
    command:'update',
    describe:'Atualize uma nota',
    handler:()=>{
        console.log('Atualize uma nota')
    }
})


yargs.command({
    command:'list',
    describe:'Liste uma nota',
    handler:(argv)=>{
        notes.listNotes(argv.title)
        console.log('Liste uma nota')
    }
})

yargs.command({
    command:'read',
    describe:'Leia uma nota',
    builder:{
        title:{
            describe:'Nota a ser lida',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>{

        notes.readNote(argv.title)
        console.log('Leia uma nota: ',argv.title)
    }
})
//console.log(`${site}, ${validator.isURL(site)?colorGreen('É site'):colorRed('Não é site')}`)
//console.log(process.argv[2])
console.log(yargs.argv)

