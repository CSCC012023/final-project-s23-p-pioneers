import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import JobPosting from './pages/JobPosting'
import Jobs from './pages/Jobs'
import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/jobs" element={ <Jobs />} />
        <Route path="/jobpost/:id" element={ <JobPosting/> } />

      </Routes>
    </div>
  )
}

export default App;
