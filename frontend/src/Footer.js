import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import React, { useEffect, useState } from "react";


const Footer = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        // Set the visibility of the footer based on the scroll position
        setIsFooterVisible(window.scrollY > 200); // Adjust the scroll threshold as needed
      };
  
      // Add scroll event listener when the component mounts
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
return (
    <Box
      style={{
        transform: isFooterVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease", marginTop: "50px",
      }}
    >
      <h1
        style={{
          color: "green",
          textAlign: "center",
          marginTop: "-50px",
          marginBottom: "30px",
        }}
      ></h1>
    
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Aim</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Testimonials</FooterLink>
		</Column>
		<Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Writing</FooterLink>
			<FooterLink href="#">Internships</FooterLink>
			<FooterLink href="#">Coding</FooterLink>
			<FooterLink href="#">Teaching</FooterLink>
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
			<FooterLink href="#">Vikram Narra</FooterLink>
			<FooterLink href="#">Ashwin Malik</FooterLink>
			<FooterLink href="#">Dhruvin Patel</FooterLink>
            <FooterLink href="#">Minjun Aneel</FooterLink>
			<FooterLink href="#">Andrew Aucie</FooterLink>
			<FooterLink href="#">Ansh Aneel</FooterLink>
			<FooterLink href="#">Vedat Goktepe</FooterLink>

		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
