import React from "react";
import { useState, useEffect } from "react";
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
import "@fontsource/work-sans";
import Logo from "../assets/images/CoBuildLogo.png";
import loginImage from "../assets/images/loginPlaceHolder.png";
import { useSignIn } from "react-auth-kit";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    localStorage.setItem("type", "")
  }, [])
  const handleClick = () => {
    localStorage.setItem("type", "user");
    navigate("/jobs");
  };
  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          // Unauthorized (email not verified)
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        } else if (res.status === 404) {
          // Not found (user not found)
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        } else {
          throw new Error("Login request failed");
        }
      })
      .then((data) => {
        setUsername("");
        setPassword("");
        setLoginError("");

        signIn({
          token: data.accessToken,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: user.username },
        });
        // handleClick();
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);

        handleClick();
      })
      .catch((error) => {
        setLoginError(error.message);
        console.error(error);
      });
  };

  return (
    <div
      style={{
        background: "#2B2B2B",
        fontFamily: "Work Sans, sans-serif",
        display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
        height: "100vh", // Set the height to fill the entire screen
      }}
    >
      <main style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            maxHeight: "800px",
          }}
        >
          <img
            alt="Image"
            src={loginImage}
            style={{
              width: "100%",
              objectFit: "cover",
              height: "100%",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start", // Align to the left (from the image's right)
            padding: "0 30px",
            maxWidth: "500px", // Limit the maximum width of the centered content
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "51px",
              fontWeight: 600,
              lineHeight: "110%",
              marginTop: "-10px",
            }}
          >
            Sign In
          </h1>
          <Typography
            style={{
              color: "white",
              fontSize: "22px",
              fontFamily: "work sans",
              textAlign: "center", // Center the text
            }}
          >
            Welcome Back! Enter your details and start applying, searching and
            coding on CoBuild.
          </Typography>
          {loginError && (
            <Typography
              variant="caption"
              color="error"
              marginTop={1}
            >
              {loginError}
            </Typography>
          )}
          <div style={{ marginTop: "20px" }}>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              variant="filled"
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
                borderRadius: "20px",
                width: "330px",
              }}
              InputProps={{
                disableUnderline: true,
                // startAdornment: (
                //   <InputAdornment position="start">
                //     <AccountCircle></AccountCircle>
                //   </InputAdornment>
                // ),
              }}
            />
          </div>
          <div>
            <TextField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              variant="filled"
              type="password"
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                width: "330px",
              }}
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <Button
            style={{
              background: "#A259FF",
              width: "330px",
              height: "46px",
              borderRadius: "20px",
              color: "white",
              marginTop: "30px",
              fontFamily: "work sans",
            }}
            onClick={handleLoginFormSubmit}
          >
            Sign In
          </Button>
          <Typography
            variant="caption"
            style={{
              color: "white",
              fontSize: "14px",
              marginTop: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "160%",
              fontFamily: "work sans",
              textDecorationLine: "underline",
              textTransform: "capitalize",
            }}
          >
            <Link to="/signup" style={{ color: "white" }}>
              Don't have an account? Sign up
            </Link>
          </Typography>
        </div>
      </main>
    </div>
  );
}

export default Login;
