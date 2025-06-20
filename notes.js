const fs = require('fs')
const chalk = require('chalk')
const getNotes = ()=>{
    return 'Your notes'
}
const addNote = (title,body)=>{
   const notes = loadNotes()
const duplicateNotes = notes.filter((note)=>note.title === title)

const duplicateNote = notes.find((note)=>note.title === title) // Jeito 2 de fazer o filtro

   if(!duplicateNote){
    notes.push({
        title:title,
        body:body
    })

    saveNotes(notes)
    console.log(chalk.green.inverse('Nota adicionada'))
       
   } else{
    return console.log(chalk.red.inverse('Nota duplicada'),duplicateNotes[0].title)
   }

   
}
const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title !== title)
    
     if (notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
         console.log(chalk.green.inverse('Nota removida'))
     }else{
         console.log(chalk.red.bold('Nota não encontrada'))
     }
    console.log(notesToKeep)
   
 }

const listNotes = ()=>{
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log('Lista atual: ',note.title)
    })
}

const readNote = (title)=>{
   
    const notes = loadNotes()
     noteRead = notes.find((note)=>note.title === title)
    //console.log('Lendo o titulo: ',noteRead.title)
    //console.log('Lendo o corpo: ',noteRead.body)
    if(noteRead){
        console.log(chalk.green.bold('Nota Encontrada:'),noteRead.title)
        console.log(noteRead)
       
    }
    else if(!noteRead){
        console.log(chalk.red.bold('Nota não encontrada'))
    }
    
}

const saveNotes = (notes)=>{
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json',dataJSON)
   console.log(notes)
}

const loadNotes = ()=>{
   try{
        const dataBuffer = fs.readFileSync('notes.json')
        //console.log(dataBuffer)  dados em binario ou sei la não codificados ainda
        const dataJSON = dataBuffer.toString()
        //console.log(dataJSON) dados transformados para string e ser usado
        return JSON.parse(dataJSON)
        
    }catch(e){
        return []
    }

}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}
