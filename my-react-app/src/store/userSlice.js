import { createSlice } from "@reduxjs/toolkit";

const initUser={
    name:"",
    password:123
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
        }
    }
})
export const {updateName,updatePassword}=userSlice.actions
export default userSlice.reducer