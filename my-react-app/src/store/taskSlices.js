import { createSlice } from "@reduxjs/toolkit";
const task={
    title:"",
    description: "",
    status:"To Do",
    priority:"Medium",
    dueDate:new Date(Date.now()+7*24*60*60*1000)
}
 
const taskSlice=createSlice({
    name:"tasks",
    initialState: [],
    reducers:{
        create:(state, action)=>{
          const {idProject,title,description,priority,dueDate}=action.payload
          const newTask={
            id:Date.now(),
            idProject,
            title,
            description,
            status:"To Do",
            priority: priority || "Medium",
            dueDate:dueDate || new Date(Date.now()+7*24*60*60*1000)
          } 
          state.push(newTask)
        },
        update:(state,action)=>{

            const { id, title, description, priority, dueDate } = action.payload;
            const currentTask=state.find(task=>task.id===id)
            
            if(currentTask){
                currentTask.title=title || currentTask.title
                currentTask.description=description ||currentTask.description
                currentTask.priority=priority || currentTask.priority
                currentTask.dueDate=dueDate ||currentTask.dueDate

            }
        },
        remove:(state, action)=>{
            return state.filter(task=>task.id!==action.payload)
        },
        changeStatus:(state, action)=>{
             const currentTask=state.find(task=>task.id===action.payload.id)
             if(currentTask)
                currentTask.status=action.payload.status 
        }


    }
})

export  const{create,update,remove,changeStatus}=taskSlice.actions
export default taskSlice.reducer