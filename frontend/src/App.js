import "./App.css";
import JobPosting from "./pages/JobPosting";
import Jobs from "./pages/Jobs";
import { Routes, Route } from "react-router-dom";

import { RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import { Avatar, Typography, BottomNavigation } from "@mui/material";
import Logo from "./assets/images/CoBuildLogo.png";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/jobs"
          element={
            <RequireAuth loginPath="/login">
              <Jobs />
            </RequireAuth>
          }
        />
        <Route
          path="/jobpost/:id"
          element={
            <RequireAuth loginPath="/login">
              <JobPosting />
            </RequireAuth>
          }
        />
        <Route
          path="/createpost"
          element={
            <RequireAuth loginPath="/login">
              <CreatePost />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
