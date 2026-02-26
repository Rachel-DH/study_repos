import  React  from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./store/projectsSlice.js";
import tasksReducer from "./store/taskSlices.js";
import userReducer from "./store/userSlice.js"

export const store=configureStore({
    reducer:{
        projects: projectsReducer,
        tasks: tasksReducer,
        user: userReducer
    }
})


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>

)
