import "./App.css";
import JobPosting from "./pages/JobPosting";
import HomePage from "./pages/HomePage";
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
import Navbar from "./pages/components/Navbar";
import LoginRecruiter from "./pages/LoginRecruiter";
import { Avatar, Typography, BottomNavigation } from "@mui/material";
import UploadAssessment from "./pages/UploadAssessment";
import LoginPage from "./pages/components/LoginBox";
import SearchBar from "./pages/components/SearchBar";
import ViewUser from "./pages/ViewUser";
import Chat from "./pages/Chat";
import RecruiterSteps3 from "./pages/RecruiterSteps3"
import Application from "./pages/Application";
import RecruiterScreen from "./pages/Recruiterscreen";
import PDFviewer from "./pages/components/ApplicationComponents/PDFviewer";
import Calendar from "./pages/components/ApplicationComponents/Calendar";
import ApplicationList from "./pages/ApplicationList";
import RecruiterChat from "./pages/RecruiterChat";

function App() {
  return (
  
    <div className="App">
      <Routes>

        <Route path="/" element={<><Navbar userType={""} /></>} />
        <Route path="/test" element={<><Navbar userType={""} /><LoginPage /></>} />
        <Route path="/search" element={<><Navbar userType={"user"} /><SearchBar /></>} />
        <Route path="/viewprofile/:id" element={<ViewUser />} />
        <Route path="/chat" element={<><Navbar userType={"user"} /><Chat /></>} />
        <Route path="/loginrecruiter" element={<><Navbar userType={""} /><LoginRecruiter /></>} />
        <Route path="/recruiterchat" element={<><Navbar userType={"user"} /><RecruiterChat /></>} />

        <Route path="/login" element={<><Navbar userType={""} /><Login /></>} />

        <Route path="/signup" element={<><Navbar userType={""} /><Signup /></>} />
        <Route path="/leaderboard/:id" element={<><Navbar userType={"user"} /><Leaderboard /></>} />
        <Route path="/step1" element={<><Navbar userType={"user"} /><Step1 /></>} />
        <Route path="/User" element={<><Navbar userType={"user"} /><UserProfile /></>} />
        <Route path="/signuprecruiter" element={<><Navbar userType={"recruiter"} /><Signuprecruiter /></>} />
        <Route path="/recruiterstep1" element={<><Navbar userType={"recruiter"} /><RecruiterSteps1 /></>} />
        <Route path="/recruiterstep3" element={<><Navbar userType={"recruiter"} /><RecruiterSteps3 /></>} />
        <Route path="/homepage" element={<HomePage />} />



        <Route path="/upload" element={<UploadAssessment />} />
        <Route path="/verfication/:id" element={<Verification />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/jobs" element={<><Navbar userType={"user"}/><Jobs /></>} />
        <Route path="/jobpost/:id" element={<><Navbar userType={"user"}/><JobPosting /></>} />
        <Route path="/applicants/:id" element={<ApplicationList />} />
        <Route path="/assess/:id" element={<Assessment />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/home" element={<RecruiterScreen />} />
        <Route path="/document" element={<PDFviewer />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/list" element={<ApplicationList />} />

      </Routes>
      {/* { <BottomNavigation
        style={{
          background: "#3B3B3B",
          height: "195px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Work Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Logo"
            src={Logo}
            style={{
              width: "60px",
              height: "60px",
              marginRight: "10px",
              marginLeft: "40px",
            }}
          />
          <Typography
            variant="body1"
            style={{
              color: "white",
              fontSize: "28px",
              fontFamily: "Work Sans",
              borderBottom: "1px solid white",
            }}
          >
            CoBuild
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: "white",
              fontSize: "28px",
              fontFamily: "Work Sans",
              marginLeft: "150px",
            }}
          >
            <a href="#" style={{ color: "white" }}>
              Join Our Community
            </a>{" "}
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: "white",
              fontSize: "28px",
              fontFamily: "Work Sans",
              marginLeft: "150px",
            }}
          >
            <a href="#" style={{ color: "white" }}>
              About
            </a>{" "}
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: "white",
              fontSize: "28px",
              fontFamily: "Work Sans",
              marginLeft: "150px",
            }}
          >
            <a href="#" style={{ color: "white" }}>
              Explore
            </a>{" "}
          </Typography>
        </div>
        <div
          style={{
            borderTop: "1px solid white",
            marginTop: "20px",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Typography
            variant="body2"
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "Work Sans",
            }}
          >
            &copy; {new Date().getFullYear()} CoBuild. All rights reserved.
          </Typography>
        </div>
      </BottomNavigation>}
      </BottomNavigation>  */}

      
      {/* <Footer /> */}

    </div>
  );
}

export default App;
