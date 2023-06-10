import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePost from './pages/CreatePost'

import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/createpost" element={ <CreatePost/> } />
      </Routes>
    </div>
  )
}

export default App;
