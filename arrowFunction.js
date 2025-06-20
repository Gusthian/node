//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: false
    },{
        text: 'Clean yard',
        completed: true
    }, {
        text: 'Film course',
        completed: false
    }]
}

//console.log(tasks.tasks.filter((task)=>task.completed===false))

    const taskPending = tasks.tasks.filter((task)=>task.completed===true)
    console.log(taskPending)
      tasks.tasks.forEach((task)=>{
          //console.log(task.text)
          if(task.completed===true){
            console.log('tasks completos:',task.text)
          }else{
            console.log('tasks pendentes:',task.text)
          }
      })
     
     


