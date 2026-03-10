import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./store/projectsSlice.js";
import tasksReducer from "./store/taskSlice.js";
import userReducer from "./store/userSlice.js"
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

export const store = configureStore({
  reducer: {
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
