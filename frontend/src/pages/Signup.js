// import React from 'react'

// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpass, setCPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [courses, setCourses] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    const user = {
      name,
      email,
      username,
      password,
      formData,
    };

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
        console.log(data); // handle the response from the server
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100px",
          background: "#2B2B2B",
          flex: "none",
          order: "0",
          alignSelf: "stretch",
          flexGrow: "0",
        }}
      >
        <div style={logoStyles}>
          <div
            style={{
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
            }}
          >
            <p
              style={{
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
              }}
            >
              CoBuild
            </p>
          </div>
        </div>
        <Link to={"/login"}>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 30px",
              gap: "12px",
              width: "114px",
              height: "60px",
              background: "#A259FF",
              borderRadius: "20px",
              flex: "none",
              order: "3",
              flexGrow: "0",
              color: "#FFFFFF",
              marginRight: "20px",
              fontWeight: "600",
              transition: "ease 0.3s",
              border: isHovered ? "3px solid #FFFFFF" : "3px solid #A259FF",
            }}
          >
            Sign In
          </button>
        </Link>
      </nav>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "100px 0px",
            gap: "40px",
            width: "100%",
            height: "1114px",
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
                  color: "2B2B2B",
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
                  color: "2B2B2B",
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
                  color: "2B2B2B",
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
                  color: "2B2B2B",
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
                  color: "2B2B2B",
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
                      border: "1px dashed #C1B2FA",
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
                  />
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "12px",
                    width: "330px",
                    height: "156px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "8px",
                      gap: "12px",
                      width: "310px",
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
                          width: "332px",
                          height: "18px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: 700,
                          fontSize: "14px",
                          lineHeight: "130%",
                          display: "flex",
                          alignItems: "center",
                          color: "#575361",
                        }}
                      >
                        Resume.pdf
                      </p>
                      <p
                        style={{
                          width: "332px",
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
                        12 KB
                      </p>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default SignUp;
