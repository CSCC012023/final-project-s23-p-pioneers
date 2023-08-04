// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
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

  const [isHovered, setIsHovered] = useState(false);

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

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
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
      const uname = localStorage.getItem('username');
      const type = "resume";
      const extension = "pdf";
      const {url} = await fetch(`http://localhost:8000/s3Url?username=${uname}&type=${type}&extension=${extension}`).then(res => res.json());
      const finalUrl = url.split("?")[0];
      console.log("frontend", finalUrl)

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: file
      });

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
    <div style={{ background: "#2B2B2B" }}>
      <AppBar
        position="relative"
        style={{ background: "#2B2B2B", height: "80px" }}
      >
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            height: "80px",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            alt="Logo"
            src={Logo}
            style={{ width: "35px", height: "35px" }}
          />
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              marginLeft: "25px",
              fontSize: "30px",
              fontFamily: "work sans",
            }}
          >
            CoBuild
          </Typography>

          <Button
            component={Link}
            to="/login"
            style={{
              background: "#A259FF",
              marginLeft: "auto",
              width: "120px",
              height: "60px",
              borderRadius: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "140%",
              fontFamily: "work sans",
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "100px 0px",
            gap: "40px",
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
              gap: "40px",
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
                gap: "20px",
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
                  Choose a wallet you want to connect. There are several wallet
                  providers.
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
                gap: "15px",
                width: "330px",
                height: "782px",
                flex: "none",
                order: "0",
                alignSelf: "stretch",
                flexGrow: "0",
              }}
            >
              <input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px 20px",
                  gap: "12px",
                  width: "330px",
                  height: "46px",
                  background: "#FFFFFF",
                  border: "1px solid #858584",
                  borderRadius: "20px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                  color: "#000000",
                  transition: "transform 0.5s ease",
                }}
                onClick={(e) => {
                  e.target.style.animation = "circle 1s infinite linear";
                  e.target.style.transform = "scale(1.05)"; // Increase the scale on click
                }}
                onBlur={(e) => {
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1)"; // Reset the scale when focus is lost
                }}
                type="name"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                placeholder="Name"
              />
              {nameError && (
                <Typography variant="caption" color="error">
                  {nameError}
                </Typography>
              )}
              <input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px 20px",
                  gap: "12px",
                  width: "330px",
                  height: "46px",
                  background: "#FFFFFF",
                  border: "1px solid #858584",
                  borderRadius: "20px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                  color: "#000000",
                  transition: "transform 0.5s ease",
                }}
                onClick={(e) => {
                  e.target.style.animation = "circle 1s infinite linear";
                  e.target.style.transform = "scale(1.05)"; // Increase the scale on click
                }}
                onBlur={(e) => {
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1)"; // Reset the scale when focus is lost
                }}
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Email"
              />
              {emailError && (
                <Typography variant="caption" color="error">
                  {emailError}
                </Typography>
              )}
              <input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px 20px",
                  gap: "12px",
                  width: "330px",
                  height: "46px",
                  background: "#FFFFFF",
                  border: "1px solid #858584",
                  borderRadius: "20px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                  color:
                    (username.length === 0 ||
                      username.length < 3 ||
                      username.length > 6) &&
                    usernameError
                      ? "red"
                      : "#000000",

                  // color: "#000000",
                  transition: "transform 0.5s ease",
                }}
                onClick={(e) => {
                  e.target.style.animation = "circle 1s infinite linear";
                  e.target.style.transform = "scale(1.05)"; // Increase the scale on click
                }}
                onBlur={(e) => {
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1)"; // Reset the scale when focus is lost
                }}
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
                placeholder="Username"
              />
              {usernameError && (
                <Typography variant="caption" color="error">
                  {usernameError}
                </Typography>
              )}
              <input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px 20px",
                  gap: "12px",
                  width: "330px",
                  height: "46px",
                  background: "#FFFFFF",
                  border: "1px solid #858584",
                  borderRadius: "20px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                  color: "#000000",
                  transition: "transform 0.5s ease",
                }}
                onClick={(e) => {
                  e.target.style.animation = "circle 1s infinite linear";
                  e.target.style.transform = "scale(1.05)"; // Increase the scale on click
                }}
                onBlur={(e) => {
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1)"; // Reset the scale when focus is lost
                }}
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Password"
              />
              {passwordError && (
                <Typography variant="caption" color="error">
                  {passwordError}
                </Typography>
              )}
              <input
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "16px 20px",
                  gap: "12px",
                  width: "330px",
                  height: "46px",
                  background: "#FFFFFF",
                  border: "1px solid #858584",
                  borderRadius: "20px",
                  flex: "none",
                  order: "0",
                  alignSelf: "stretch",
                  flexGrow: "0",
                  color: "#000000",
                  transition: "transform 0.5s ease",
                }}
                onClick={(e) => {
                  e.target.style.animation = "circle 1s infinite linear";
                  e.target.style.transform = "scale(1.05)"; // Increase the scale on click
                }}
                onBlur={(e) => {
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1)"; // Reset the scale when focus is lost
                }}
                type="password"
                id="cpass"
                value={cpass}
                onChange={handleCPasswordChange}
                required
                placeholder="Confirm Password"
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
                <label
                  htmlFor="fileInput"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      width: "330px",
                      height: "160px",
                      background: "#F3F0FF",
                      border: "2px dashed #7A5FEC", // Adjust border color and thickness
                      borderRadius: "8px",
                      transition: "transform 0.3s ease",
                      transform: "scale(1)",
                      /* Inside auto layout */
                      flex: "none",
                      order: "0",
                      alignSelf: "stretch",
                      flexGrow: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7A5FEC",
                      WebkitTextStrokeWidth: "1px",
                      fontWeight: "normal",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.animation = "circle 1s infinite linear";
                      e.target.style.transform = "scale(1.05)"; // Increase the scale on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.animation = "none";
                      e.target.style.transform = "scale(1)"; // Reset the scale when not hovered
                    }}
                  >
                    Import Files
                  </span>
                  <input
                    type="file"
                    id="fileInput"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    required
                    capture="user"
                    onChange={(e) => {
                      const files = e.target.files;
                      const updatedFiles = [...uploadedFiles];

                      for (let i = 0; i < files.length; i++) {
                        updatedFiles.push(files[i]);
                      }

                      setUploadedFiles(updatedFiles);
                    }}
                  />
                </label>

                {uploadedFiles.map((file, index) => (
                  // <div key={index}>
                  //   <span>{file.name}</span>
                  // </div>

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "330px",
                      height: "160px", // Adjusted height to match the previous div length
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "8px",
                        gap: "12px",
                        width: "330px",
                        height: "72px",
                        background: "#FFFFFF",
                        boxShadow: "4px #EAE2FD",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "56px",
                          background: "#DAF2D9",
                          borderRadius: "4px",
                          flex: "none",
                          order: "0",
                          flexGrow: "0",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          padding: "0px",
                          gap: "4px",
                          width: "254px",
                          height: "56px",
                          flex: "none",
                          order: "1",
                          flexGrow: "1",
                        }}
                      >
                        <p
                          style={{
                            width: "254px", // Adjusted width to match the previous div width
                            height: "18px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "14px",
                            lineHeight: "130%",
                            display: "flex",
                            alignItems: "center",
                            color: "#575361",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          title={file.name} // Add the title attribute to display the full name on hover
                        >
                          {file.name}
                        </p>
                        <p
                          style={{
                            width: "254px", // Adjusted width to match the previous div width
                            height: "16px",
                            fontFamily: "'Inter'",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "130%",
                            display: "flex",
                            alignItems: "center",
                            color: "#857E95",
                            flex: "none",
                            order: "1",
                            alignSelf: "stretch",
                            flexGrow: "0",
                          }}
                        >
                          {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

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
  );
}
export default SignUp;
