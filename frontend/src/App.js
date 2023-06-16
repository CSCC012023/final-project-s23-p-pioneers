import './App.css';
import JobPosting from './pages/JobPosting'
import Jobs from './pages/Jobs'
import { Routes, Route } from "react-router-dom"

import { RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/jobs" element={ <Jobs />} />
        <Route path="/jobpost/:id" element={ <JobPosting/> } />
        <Route path="/createpost" element={ <CreatePost/> } />
      </Routes>
    </div>
  );
}

export default App;
