import React from "react";
import {
  Container,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./components/NavbarElements";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {

  // Create a new theme based on the default MUI theme
  const whiteTheme = createTheme({
    palette: {
      background: {
        default: "#FFFFFF", // Set the background color to white
      },
    },
  });

  const handleContinueClick = () => {
    // Get the current scroll position
    const currentScrollPosition = window.scrollY;
    // Scroll down by an additional 100vh to reach 300vh
    window.scrollTo(0, currentScrollPosition + window.innerHeight);
  };

  const handleBeginJourneyClick = () => {
    window.open("/signup", "_blank");
  };
  const backgroundImageURL =
    "https://unblast.com/wp-content/uploads/2021/01/Space-Background-Images.jpg";


  return (
    <div>
      {/* First div for 0vh to 100vh window */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${backgroundImageURL})`, // Set the background image on the Container
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
          backgroundSize: "100% 89vh",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            textAlign="left"
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-200px",
            }}
          >
             <div>
                  <strong style={{ fontSize: "60px", fontWeight:"bold" }}>CoBuild</strong> &nbsp; &nbsp;
                  &nbsp;
                  <img
                    src={require("./components/logo.png")}
                    alt="logo"
                    style={{ height: "40px" }}
                    
                  />
                </div>
            {/* <Typography
              variant="h2"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              WELCOME TO COBUILD
            </Typography>
             */}
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", marginTop: "10px" }}
            >
              Jump Start Your Development Career Like Never Before
            </Typography>

            {/* Add spacing between the buttons */}
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                endIcon={<FlightTakeoffIcon />}
                onClick={handleBeginJourneyClick}
                sx={{
                  padding: "10px 20px 10px 20px",
                  // Set the width to match the "About" box
                  fontWeight: "bold",
                  color: "white",
                  background: "#3B3B3B",
                  borderRadius: "20px 20px 20px 20px", // Rounded corners at the bottom
                  "&:hover": {
                    background: "#2B2B2B", // Change the background color on hover
                    color: "white", // Change the text color to white on hover
                  },
                }}
              >
                Begin Journey
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SearchIcon />}
                sx={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  padding: "10px 20px 10px 20px",
                  color: "white",
                  background: "#3B3B3B",
                  borderRadius: "20px 20px 20px 20px", // Rounded corners at the bottom
                  "&:hover": {
                    background: "#2B2B2B", // Change the background color on hover
                    color: "white", // Change the text color to white on hover
                  },
                }}
                onClick={handleContinueClick}
              >
                Explore
              </Button>
            </Box>
          </Box>
          <img
          src="https://i.pinimg.com/originals/17/a9/e6/17a9e68fdff310166dc3fac28e5c64b5.png"
          alt="Floating Image 1"
          style={{
            position: "absolute",
            top: "59%", // Adjust the top and left positions to place the image where you want
            left: "5%",
            width: "300px", // Set the size of the image as per your requirements
          }}
        />
        </Container>
      </div>

      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          // marginTop: "-80px", // Decrease the margin-top to move the title closer to the top
        }}
      >
        <Container maxWidth="md">
          <Box
            textAlign="left"
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: "white", fontWeight: "bold", marginBottom: "20px",
              }}

            >
              Our Aim
            </Typography>
            <Box
              sx={{
                width: "75%",
                margin: "0 auto",
                background: "#3B3B3B",
                borderRadius: "20px 20px 0 0",
                padding: "5px", // Add 5px padding
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "30px", // Add 20px padding to the text
                }}
              >
                Our aim is to provide a transformative platform that empowers
                individuals to advance their careers and technical prowess. By
                offering a seamless fusion of professional networking and
                technical challenges, we aim to create an inclusive and dynamic
                ecosystem where knowledge is shared, connections are formed, and
                innovation thrives. Through our commitment to excellence, we
                aspire to be the catalyst that unlocks endless opportunities for
                personal and professional development. Our ultimate goal is to
                revolutionize the way professionals connect, collaborate, and
                succeed in an ever-evolving world.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "75%", // Set the width to match the "About" box
                fontWeight: "bold",
                color: "white",
                background: "#3B3B3B",
                borderRadius: "0 0 20px 20px", // Rounded corners at the bottom
                "&:hover": {
                  background: "#2B2B2B", // Change the background color on hover
                  color: "white", // Change the text color to white on hover
                },
              }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          </Box>
        </Container>
      </div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          // marginTop: "-80px", // Decrease the margin-top to move the title closer to the top
        }}
      >
        <Container maxWidth="md">
          <Box
            textAlign="left"
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}
            >
              Vision
            </Typography>
            <Box
              sx={{
                width: "75%",
                margin: "0 auto",
                background: "#3B3B3B",
                borderRadius: "20px 20px 0 0",
                padding: "5px", // Add 5px padding
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "30px", // Add 20px padding to the text
                }}
              >
                Our vision is to be the leading platform that revolutionizes the
                way professionals connect and excel in the technical realm. By
                fostering a vibrant community, we aim to empower individuals to
                embrace their full potential and drive meaningful impact in
                their careers. With a seamless blend of networking and technical
                challenges, we envision a future where our platform becomes the
                go-to destination for personal and professional growth.
                Together, we aspire to redefine success and create a world where
                innovation and collaboration know no bounds.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "75%", // Set the width to match the "About" box
                fontWeight: "bold",
                color: "white",
                background: "#3B3B3B",
                borderRadius: "0 0 20px 20px", // Rounded corners at the bottom
                "&:hover": {
                  background: "#2B2B2B", // Change the background color on hover
                  color: "white", // Change the text color to white on hover
                },
              }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          </Box>
        </Container>
      </div>
      <div
        style={{
          height: "130vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          // marginTop: "-80px", // Decrease the margin-top to move the title closer to the top
        }}
      >
        <Container maxWidth="md">
          <Box
            textAlign="left"
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}
            >
              Testimonials
            </Typography>
            <Box
              sx={{
                width: "75%",
                background: "#3B3B3B",
                borderRadius: "20px 20px 20px 20px", // Rounded corners at the bottom
                padding: "5px", // Add 5px padding
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "30px", // Add 20px padding to the text
                }}
              >
                "I am truly amazed by the impact this platform has had on my
                career. It's more than just a networking site; it's a hub of
                technical excellence and collaboration. The challenges and
                opportunities for growth have sharpened my skills and opened
                doors I never thought possible. I've made invaluable connections
                with like-minded professionals, and together, we've achieved
                great things. This platform is a game-changer for anyone looking
                to take their career to new heights. I highly recommend it!" -
                [Dhruvin Patel], [Software Engineer]
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  padding: "30px", // Add 20px padding to the text
                }}
              >
                "Joining this platform has been a game-changer for my career
                journey. The blend of professional networking and technical
                challenges has been a breath of fresh air. I've not only
                expanded my network but also honed my technical skills through
                engaging and thought-provoking exercises. The community is
                incredibly supportive, and I've found mentors and collaborators
                who have helped me reach new heights. This platform is a
                goldmine for anyone seeking growth, innovation, and exciting
                opportunities. I can't recommend it enough!" - [Ansh Goatya],
                [McDonalds Sweeper]
              </Typography>
            </Box>

          </Box>
        </Container>
      </div>
      <div
        style={{
          height: "5vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          // marginTop: "-80px", // Decrease the margin-top to move the title closer to the top
        }}
      >
        <Container maxWidth="md">
          <Box
            textAlign="left"
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button
                variant="contained"
                color="primary"
                endIcon={<FlightTakeoffIcon />}
                onClick={handleBeginJourneyClick}
                sx={{
                  padding: "10px 20px 10px 20px",
                  // Set the width to match the "About" box
                  fontWeight: "bold",
                  color: "white",
                  background: "#A259FF",
                  borderRadius: "20px 20px 20px 20px", // Rounded corners at the bottom
                  "&:hover": {
                    background: "#2B2B2B", // Change the background color on hover
                    color: "white", // Change the text color to white on hover
                  },
                  marginBottom:"20px",
                }}
              >
                Begin Journey
              </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Home;
