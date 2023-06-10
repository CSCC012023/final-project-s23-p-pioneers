import React from 'react'
import {useState} from 'react';


function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const user = {
        username,
        email,
        password,
      };
  
      fetch('http://localhost:8000/signup', { // Replace with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Sign-up request failed.');
          }
        })
        .then((data) => {
          console.log(data); // handle the response from the server
          setUsername('');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    );
}

export default Login