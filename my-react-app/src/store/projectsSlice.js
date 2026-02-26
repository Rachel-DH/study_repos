import { createSlice } from "@reduxjs/toolkit";

const project = {
    name: "",
    description:"",
    createDate:new Date()
}

const projectsSlice=createSlice({
    name:"projects",
    initialState:[],
    reducers:{
        create:(state, action)=>{
            const{name, description, createDate}=action.payload
            const newProject={
                id:Date.now(),
                name,
                description,
                createDate:createDate || new Date()
            }
            state.push(newProject)
        },
        update:(state,action)=>{

            const {id,name, description} = action.payload;
            const currentProject=state.find(project=>project.id===id)
            
            if(currentProject){
                currentProject.name=name || currentProject.name
                currentProject.description=description ||currentProject.description
            }
        },
        remove:(state, action)=>{
            return state.filter(project=>project.id!==action.payload)
        },
    }
})

export const{create,update,remove}=projectsSlice.actions
export default projectsSlice.reducer
