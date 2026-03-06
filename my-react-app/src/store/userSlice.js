import { createSlice } from "@reduxjs/toolkit";

const initUser={
    name:"",
    password:"123",
    isConnected:false
}
const userSlice=createSlice({
    name:"user",
    initialState:initUser,
    reducers:{
        updateName:(state, action)=>{
            state.name=action.payload || state.name
        },
        updatePassword:(state, action)=>{
            state.password=action.payload || state.password
        },
        login:(state, action)=>{
            state.isConnected=true
        },
        logout: (state) => {
            state.isConnected = false
        }
    }
})
export const {updateName,updatePassword,login}=userSlice.actions
export default userSlice.reducer