import React, { useState, useEffect } from 'react';
import "./List.css";
import { useNavigate } from "react-router-dom";

const placeholderImage = "https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg";

function List(props) {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const signedInUsername = localStorage.getItem("username");

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword: props.input.toLowerCase() }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data); // Corrected the variable name to data
        setUserData(data); // Set the fetched data in the state
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData(); // Call the function to fetch data when the component mounts or when the input changes
  }, [props.input]);
  
  const handleItemClick = (username) => {
    if (username === signedInUsername) {
      navigate(`/user`); // Redirect to "/user" if it's the signed-in user's profile
    } else {
      navigate(`/viewprofile/${username}`); // Redirect to the profile view if it's another user's profile
    }
  };
  

  return (
    <ul>
      {userData.map((item) => (
        <li key={item.id} onClick={() => handleItemClick(item.username)}>
          {item.profilepic ? (
            <img src={item.profilepic} alt="Profile" />
          ) : (
            <img src={placeholderImage} alt="Profile Placeholder" />
          )}
          <div>
            <p>Username: {item.username}</p>
            <p>Name: {item.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default List;
