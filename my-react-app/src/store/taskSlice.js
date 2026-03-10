import { createSlice } from "@reduxjs/toolkit";
const task={
    title:"",
    description: "",
    status:"To Do",
    priority:2,
    dueDate:new Date(Date.now()+7*24*60*60*1000).toLocaleDateString('he-IL')
}
 
const taskSlice=createSlice({
    name:"tasks",
    initialState: { list: [] },
    reducers:{
        create:(state, action)=>{
            console.log("in create");
            
          const {idProject,title,description,priority,dueDate}=action.payload
          const newTask={
            id:Date.now().toString(),
            idProject,
            title,
            description,
            status:"To Do",
            priority: priority || 2,
            dueDate:dueDate || new Date(Date.now()+7*24*60*60*1000).toLocaleDateString('he-IL')
          } 
          state.list.push(newTask)
          console.log(newTask);
          
        },
        update:(state,action)=>{

            const { id, title, description, priority, dueDate } = action.payload;
            const currentTask=state.list.find(task=>task.id===id)
            
            if(currentTask){
                currentTask.title=title || currentTask.title
                currentTask.description=description ||currentTask.description
                currentTask.priority=priority || currentTask.priority
                currentTask.dueDate=dueDate ||currentTask.dueDate

            }
        },
        remove:(state, action)=>{
             state.list = state.list.filter(task=>task.id!==action.payload)
        },
        changeStatus:(state, action)=>{
             const currentTask=state.list.find(task=>task.id===action.payload.id)
             if(currentTask)
                currentTask.status=action.payload.status 
        }


    }
})

export  const{create,update,remove,changeStatus}=taskSlice.actions
export default taskSlice.reducer