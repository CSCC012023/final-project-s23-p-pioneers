import React, { useEffect, useState } from "react";
import { Paper, TextField, Button, Typography, Grid } from "@mui/material";
import Logo from "../assets/images/CoBuildLogo.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Verification() {
  const { id } = useParams();
  const [uniqueString, setUniqueString] = useState(id);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    const response = await fetch("http://localhost:8000/verifyemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueString }),
    });
    const data = await response.json();
    setMessage(data.message);
    setIsValid(data.isValid);
    console.log(data);
  };

  useEffect(() => {
    verifyEmail();
  }, [uniqueString]);

  const constHandleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          bgcolor: "#1b1b1b",
          p: 4,
          width: "800px",
          height: "600px",
          textAlign: "center",
          fontFamily: "Work Sans",
        }}
        elevation={3}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <img
              src={Logo}
              alt="CoBuild Logo"
              style={{
                width: "70px",
                marginRight: "10px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" component="h3">
              CoBuild
            </Typography>
          </Grid>
        </Grid>
        {!isValid ? (
          <Typography variant="h6" sx={{ mt: 20, mb: 3 }}>
            {message}
          </Typography>
        ) : (
          <>
            <Typography variant="h4" component="h2" sx={{ mb: 2, mt: 7 }}>
              Congratulations!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your account has been verified
            </Typography>
            <Typography variant="body1" sx={{ mb: 7 }}>
              You can now explore job opportunities, connect with other
              developers, code, innovate, and build!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Please login to continue and explore CoBuild
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            bgcolor: "#A259FF",
            width: "330px",
            height: "46px",
            borderRadius: "20px",
            color: "white",
            fontFamily: "work sans",
            "&:hover": {
              bgcolor: "#7E38C2", // Change this to the darker purple you want
            },
          }}
          onClick={constHandleLogin}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default Verification;
