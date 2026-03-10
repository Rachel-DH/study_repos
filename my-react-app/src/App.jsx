import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import ProjectsList from './components/ProjectList.jsx';
import AddProject from './components/AddProject.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import AddTask from './components/AddTask.jsx';

function App() {
  const isConnected = useSelector((state) => state.user.isConnected);
  return (
    <BrowserRouter>
    <div className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/projects" element={isConnected ? <ProjectsList /> : <Navigate to="/" />} />
        <Route path="/projects/add" element={isConnected ? <AddProject /> : <Navigate to="/" />} />
        <Route path="/project/:id" element={isConnected ? <ProjectDetails /> : <Navigate to="/" />} /> */}
        {/* <Route path="/project/:id/add-task" element={isConnected ? <AddTask /> : <Navigate to="/" />} /> */}
        <Route path="/project/:id/add-task" element= {<AddTask /> } />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects" element={<ProjectsList />} />
      </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
