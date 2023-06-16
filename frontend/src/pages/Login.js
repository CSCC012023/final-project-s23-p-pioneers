import React from "react";
import { useState } from "react";
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

  const handleClick = () => {
    navigate('/jobs');
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
        handleClick();
      })
      .catch((error) => {
        setLoginError("Incorrect username or password");
        console.error(error);
      });
  };

  return (
    <div
      style={{
        background: "#2B2B2B",
        fontFamily: "Work Sans, sans-serif",
      }}
    >
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
            to="/signup"
      
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
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <main style={{ display: "flex", flex: 1 }}>
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
            padding: "0 30px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "51px",
              width: "460px",
              height: "56px",
              fontWeight: 600,
              lineHeight: "110%",
              marginTop: "-10px",
              marginLeft: "40px",
            }}
          >
            Sign In
          </h1>
          <Typography
            style={{
              marginLeft: "40px",
              color: "white",
              width: "400px",
              fontSize: "22px",
              fontFamily: "work sans",
            }}
          >
            Welcome Back! enter your details and start applying, Searching and
            Coding on CoBuild.
          </Typography>
          {loginError && (
            <Typography
              variant="caption"
              color="error"
              marginLeft={5}
              marginTop={1}
            >
              {loginError}
            </Typography>
          )}
          <div style={{ marginTop: "20px", marginLeft: "40px" }}>
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
              marginLeft: "40px",
              fontFamily: "work sans",
            }}
            onClick={handleLoginFormSubmit}
          >
            sign in
          </Button>
          <Typography
            variant="caption"
            style={{
              color: "white",
              fontSize: "14px",
              marginTop: "20px",
              marginLeft: "40px",
              width: "610px",
              height: "35px",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "22px",
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
      <BottomNavigation
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
      </BottomNavigation>
    </div>
  );
}

export default Login;
