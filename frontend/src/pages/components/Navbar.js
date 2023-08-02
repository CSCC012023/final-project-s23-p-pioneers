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


    if (userType == "user"){
        return (
            <>
              <Nav>
                <NavLink to="/">
                  <strong style={{ fontSize: "24px" }}>Cobuild</strong> &nbsp; &nbsp;
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
            </>
          );
    }else if (userType == "recruiter") {
        return (
            <>
              <Nav>
                <NavLink to="/">
                  <strong style={{ fontSize: "24px" }}>Cobuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                </NavLink>
                <Bars />
                <NavMenu>
                  <NavLink to="/about" activeStyle>
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
            </>
          );
    }else {
        return (
            <>
              <Nav>
                <NavLink to="/">
                  <strong style={{ fontSize: "24px" }}>Cobuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                  />
                </NavLink>
                <Bars />
                <NavMenu>
                  <NavLink to="/about" activeStyle>
                    About
                  </NavLink>
                  <NavLink to="/services" activeStyle>
                    Services
                  </NavLink>
                  <NavLink to="/contact-us" activeStyle>
                    Contact Us
                  </NavLink>
                  {/* Second Nav */}
                  {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                  <NavBtnLink to="/login">Sign In</NavBtnLink>
                  
                </NavBtn>
              </Nav>
            </>
          );
    }
  
};

export default Navbar;
