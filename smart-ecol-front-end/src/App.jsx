import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/about/About';

import AdminDasboard from './pages/Admin/AdminDashboard';
import ProfDasboard from './pages/ProfDashboard';
import EleveDash from './pages/EleveDash';
import './App.css'
import ClassesPage from './pages/Admin/GestionClasses/ClassesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
      {/* Pour dashboard admin */}
        <Route path="/admin/dashboard" element = {<AdminDasboard />} />
        <Route path="/admin/classes" element = {<ClassesPage />} />




        <Route path="/prof/dashboard" element ={<ProfDasboard />} />
        <Route path="/eleve/dashboard" element ={<EleveDash />} />
      </Routes>
    </Router>
  )
 
 
}
export default App
