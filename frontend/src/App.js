import "./App.css";
import JobPosting from "./pages/JobPosting";
import Jobs from "./pages/Jobs";
import Leaderboard from "./pages/Leaderboard";
import Verification from "./pages/Verification";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import { RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import Assessment from "./pages/Assessment";
import Step1 from "./pages/Step1";
import UserProfile from "./pages/UserProfile";
import Signuprecruiter from "./pages/SignupRecrutier";
import RecruiterSteps1 from "./pages/RecruiterSteps1";

import { Avatar, Typography, BottomNavigation } from "@mui/material";
import UploadAssessment from "./pages/UploadAssessment";

import Application from "./pages/Application";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard/:id" element={<Leaderboard />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/User" element={<UserProfile />} />
        <Route path="/signuprecruiter" element={<Signuprecruiter />} />
        <Route path="/recruiterstep1" element={<RecruiterSteps1 />} />

        <Route path="/upload" element={<UploadAssessment />} />
        <Route path="/verfication/:id" element={<Verification />} />
        <Route path="/application" element={<Application />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobpost/:id" element={<JobPosting />} />
        <Route path="/assess/:id" element={<Assessment />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
