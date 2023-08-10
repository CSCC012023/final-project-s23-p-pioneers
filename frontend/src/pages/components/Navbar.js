import React, { useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";


const Navbar = ({ userType }) => {
    const navbarStyle = {
      borderBottom: "1px solid white",
    };

    if (userType == "user"){
        return (
            <>
            <div style={navbarStyle}>
              <Nav>
                <NavLink to="/homepage">
                  <strong style={{ fontSize: "24px" }}>CoBuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                </NavLink>
                <Bars />
                <NavMenu>
                  <NavLink to="/jobs" activeStyle>
                    Jobs
                  </NavLink>
                  <NavLink to="/user" activeStyle>
                    Profile
                  </NavLink>
                  <NavLink to="/search" activeStyle>
                    Search
                  </NavLink>
                  {/* Second Nav */}
                  {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                  <NavBtnLink to="/">Sign Out</NavBtnLink>
                </NavBtn>
              </Nav>
            </div>
            </>
          );
    }else if (userType == "recruiter") {
        return (
            <>
            <div style={navbarStyle}>
              <Nav>
                <NavLink to="/homepage">
                  <strong style={{ fontSize: "24px" }}>CoBuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                </NavLink>
                <Bars />
                <NavMenu>
                  <NavLink to="/home" activeStyle>
                    Dashboard
                  </NavLink>
                  <NavLink to="/createpost" activeStyle>
                    Create Post
                  </NavLink>
                  {/* Second Nav */}
                  {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                  <NavBtnLink to="/">Sign Out</NavBtnLink>
                </NavBtn>
              </Nav>
            </div>
            </>
          );
    }else {
        return (
            <>
            <div style={navbarStyle}>
              <Nav>
                <NavLink to="/homepage">
                  <strong style={{ fontSize: "24px" }}>CoBuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                </NavLink>
                <Bars />
                
                <NavBtn>
                  <NavBtnLink to="/login">Sign In</NavBtnLink>
                  
                </NavBtn>
              </Nav>
            </div>
            </>
          );
    }
  
};

export default Navbar;
