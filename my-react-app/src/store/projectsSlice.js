import { createSlice } from "@reduxjs/toolkit";

const project = {
    name: "",
    description:"",
    createDate:""
}

const projectsSlice=createSlice({

    name:"projects",
    initialState:{ list: [] },
    reducers:{
        create:(state, action)=>{
            const{name, description, createDate}=action.payload
            const newProject={
                id:Date.now().toString(),
                name,
                description,
                createDate:createDate || new Date().toLocaleDateString('he-IL')
            }
            state.list.push(newProject)
            
        },
        update:(state,action)=>{

            const {id,name, description} = action.payload;
            const currentProject=state.list.find(project=>project.id===id)
            
            if(currentProject){
                currentProject.name=name || currentProject.name
                currentProject.description=description ||currentProject.description
            }
        },
        remove:(state, action)=>{
            state.list = state.list.filter(project=>project.id!==action.payload)
            // treat related tasks in taskSlice
        },
    }
})

export const{create,update,remove}=projectsSlice.actions
export default projectsSlice.reducer
