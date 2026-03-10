import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import ProjectsList from './components/ProjectList.jsx';
// import ProjectDetails from './components/ProjectDetails.jsx';

function App() {
  const isConnected = useSelector((state) => state.user.isConnected);
  return (
    <BrowserRouter>
    <div className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={isConnected ? <ProjectsList /> : <Navigate to="/" />} />
        {/* <Route path="/project/:id" element={isConnected ? <ProjectDetails /> : <Navigate to="/" />} /> */}
      </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
