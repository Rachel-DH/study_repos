import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/Home.jsx'; 
import ProjectsListPage from './pages/ProjectsList.jsx';
import ProjectDetailsPage from './pages/ProjectDetails.jsx';

function App() {
  const [count, setCount] = useState(0)
  const isConnected = useSelector((state) => state.user.isConnected);
  return (
    <BrowserRouter>
    <div className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={isConnected ? <ProjectsList /> : <Navigate to="/" />} />
        <Route path="/projects/:id" element={isConnected ? <ProjectDetails /> : <Navigate to="/" />} />
      </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
