// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup

import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Typography,
  Button,
  TextField,
  BottomNavigation,
  Toolbar,
  InputAdornment,
  ThemeProvider,
  createTheme
} from "@mui/material";
import Logo from "../assets/images/CoBuildLogo.png";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpass, setCPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [courses, setCourses] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [nameError, setNameError] = useState("");
  const [cpassError, setCpassError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("type", "")
  }, [])
  const [isHovered, setIsHovered] = useState(false);

  const colorTheme = createTheme({
    palette: {
      primary: {
        main: "#c599ff", //light purple
      },
      secondary: {
        main: "#A259FF" // mid-light purple
      },
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {color: '#d30909'},
        },
      },
    },
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };
  const handleCoursesChange = (event) => {
    setCourses(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCPasswordChange = (event) => {
    setCPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.length == 0) {
      setNameError("Name must contain atleast 1 character");
      return;
    } else {
      setNameError("");
    }

    // Validate email

    if (email.length == 0) {
      setEmailError("Email cannot be empty");
      return;
    } else {
      setEmailError("");
    }

    if (!email.includes("@")) {
      setEmailError("Email must contain the @ symbol");
      return;
    } else {
      setEmailError("");
    }

    // Validate username
    if (username.length < 3 || username.length > 6) {
      setUsernameError("Username must be between 3 and 6 characters");
      return;
    } else {
      setUsernameError("");
    }

    // Validate password
    if (password.length == 0) {
      setPasswordError("Password cannot be empty");
      return;
    } else {
      setPasswordError("");
    }

    if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError(
        "Password must have at least one capital letter and one number"
      );
      return;
    } else {
      setPasswordError("");
    }

    if (cpass.length == 0) {
      setCpassError("Re-enter password");
      return;
    } else {
      setCpassError("");
    }

    if (cpass != password) {
      setCpassError("Passwords do not match");
      return;
    } else {
      setCpassError("");
    }

    const user = {
      name,
      email,
      username,
      password,
    };

    console.log(JSON.stringify(user))
    fetch("http://localhost:8000/signup", {
      // Replace with your server URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Sign-up request failed.");
        }
      })
      .then((data) => {

        // console.log(data); // handle the response from the server
        // setUsername("");
        // setEmail("");
        // setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      localStorage.setItem('username', username)
      localStorage.setItem("password", password)
      const uname = localStorage.getItem('username');
      const type = "resume";
      const extension = "pdf";
      const {url} = await fetch(`http://localhost:8000/s3Url?username=${uname}&type=${type}&extension=${extension}`).then(res => res.json());
      const finalUrl = url.split("?")[0];
      console.log("frontend", finalUrl)

      await fetch('http://localhost:8000/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: localStorage.getItem("username"), link: finalUrl }) // Replace with actual data
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
        })
        .catch(error => {
          // Handle the error
          console.error('Error:', error);
        });

      localStorage.setItem("type", "user")
      navigate("/step1");

  };

  const signUpStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px",
    gap: "10px",
    width: "114px",
    height: "60px",
    flex: "none",
    order: "1",
    flexGrow: "0",
  };

  const logoStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px",
    gap: "10px",
    width: "167px",
    height: "45px",

    flex: "none",
    order: "0",
    flexGrow: "0",
  };
  const textStyles = {
    position: "absolute",
    width: "122px",
    height: "45px",
    left: "45px",
    top: "0px",
    fontFamily: "Work Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "140%",
    textAlign: "center",
    color: "#FFFFFF",
  };
  return (
    <ThemeProvider theme={colorTheme}>
      <div style={{ background: "#2B2B2B" }}>
        <body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 0px",
              gap: "20px",
              width: "100%",

              // height: "auto", // Set height to "auto" for dynamic height
              minHeight: "1114px", // Set minimum height

              backgroundColor: "#2B2B2B",
              flex: "none",
              order: "0",
              flexGrow: "1",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "20px",
                width: "460px",
                height: "146px",
                flex: "none",
                order: "0",
                flexGrow: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0px",
                  gap: "10px",
                  width: "460px",
                  height: "146px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "10px",
                    width: "400px",
                    height: "56px",
                    flex: "none",
                    order: "0",
                    alignSelf: "stretch",
                    flexGrow: "0",
                  }}
                >
                  <p
                    style={{
                      width: "460px",
                      height: "56px",
                      fontFamily: "Work Sans",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "51px",
                      lineHeight: "110%",
                      alignItems: "center",
                      textAlign: "center",
                      textTransform: "capitalize",
                      color: "#FFFFFF",
                      flex: "none",
                      order: "0",
                      flexGrow: "1",
                    }}
                  >
                    Get Started Now
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row", // Changed from 'column' to 'row'
                    alignItems: "flex-start",
                    paddingTop: "20px",
                    gap: "0px",
                    width: "460px",
                    height: "70px",
                    flex: "none",
                    order: "1",
                    alignSelf: "stretch",
                    flexGrow: "0",
                  }}
                >
                  <p
                    style={{
                      width: "460px",
                      height: "70px",
                      fontFamily: "Work Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "22px",
                      lineHeight: "160%",
                      textAlign: "center",
                      color: "#FFFFFF",
                      flex: "none",
                      order: "0",
                      alignSelf: "stretch",
                      flexGrow: "0",
                    }}
                  >
                    Enter your account details.
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 0px 167px",
                gap: "30px",
                width: "330px",
                height: "1000px",
                flex: "none",
                order: "1",
                flexGrow: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "10px",
                  width: "330px",
                  height: "782px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                }}
              >
                <TextField
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  fullWidth
                  type="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  label="Name"
                />
                {nameError && (
                  <Typography variant="caption" color="error">
                    {nameError}
                  </Typography>
                )}
                <TextField
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  fullWidth
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  label="Email"
                />
                {emailError && (
                  <Typography variant="caption" color="error">
                    {emailError}
                  </Typography>
                )}
                <TextField
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  fullWidth
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  label="Username"
                />
                {usernameError && (
                  <Typography variant="caption" color="error">
                    {usernameError}
                  </Typography>
                )}
                <TextField
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  fullWidth
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  label="Password"
                />
                {passwordError && (
                  <Typography variant="caption" color="error">
                    {passwordError}
                  </Typography>
                )}
                <TextField
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  fullWidth
                  type="password"
                  id="cpass"
                  value={cpass}
                  onChange={handleCPasswordChange}
                  required
                  label="Confirm Password"
                />
                {cpassError && (
                  <Typography variant="caption" color="error">
                    {cpassError}
                  </Typography>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0px 0px 86px",
                    gap: "20px",
                    width: "330px",
                    height: "355px",
                    /* Inside auto layout */
                    flex: "none",
                    order: "4",
                    flexGrow: "0",
                  }}
                >

                  <button
                    onClick={handleSubmit}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center", // Add this line for center alignment
                      padding: "16px 20px",
                      gap: "12px",
                      width: "330px",
                      height: "46px",
                      background: isHovered ? "#FFFFFF" : "#A259FF",
                      color: isHovered ? "#A259FF" : "#FFFFFF",
                      border: "3px solid #A259FF",
                      // border: isHovered
                      //   ? "3px solid #A259FF"
                      //   : "3px solid #FFFFFF",
                      borderRadius: "20px",
                      flex: "none",
                      order: "0",
                      alignSelf: "stretch",
                      flexGrow: "0",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      fontWeight: "bold", // Add this line for bold text
                    }}
                  >
                    Sign Up
                  </button>

                  <Button
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    fullWidth
    style={{
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 20px",
      gap: "12px",
      width: "330px",
      height: "46px",
      background: isHovered ? "#A259FF" : "#FFFFFF",
      color: isHovered ? "#FFFFFF" : "#A259FF",
      border: `3px solid #A259FF`,
      borderRadius: "20px",
      flex: "none",
      order: "0",
      alignSelf: "stretch",
      flexGrow: "0",
      fontWeight: "bold",
    }}
    component={Link}
    to="/signuprecruiter"
  >
    Sign Up As Recruiter
  </Button>
                </div>
              </div>
            </div>
          </div>
        </body>

      </div>
    </ThemeProvider>
  );
}
export default SignUp;
