import { Avatar, Typography, BottomNavigation } from "@mui/material";
import Logo from "../../assets/images/CoBuildLogo.png";

const BottomNavBar = () => {
  return (
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
  );
};

export default BottomNavBar;
