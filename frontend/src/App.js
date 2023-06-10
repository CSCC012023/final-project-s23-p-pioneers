import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import JobPosting from './pages/JobPosting'

import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/createpost" element={ <JobPosting/> } />
      </Routes>
    </div>
  )
}

export default App;
