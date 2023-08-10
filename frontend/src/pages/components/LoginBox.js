import React from 'react';
import './LoginBox.css'; // Import the CSS file for styling (create this file)

const LoginPage = () => {
  return (
    <div className="login-card-container">
      <div className="login-card">
        <div className="login-card-logo">
          <img src="logo.png" alt="logo" />
        </div>
        <div className="login-card-header">
          <h1>Sign In</h1>
          <div>Please login to use the platform</div>
        </div>
        <form className="login-card-form">
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded">mail</span>
            <input
              type="text"
              placeholder="Enter Email"
              id="emailForm"
              autoFocus
              required
            />
          </div>
          <div className="form-item">
            <span className="form-item-icon material-symbols-rounded">lock</span>
            <input
              type="password"
              placeholder="Enter Password"
              id="passwordForm"
              required
            />
          </div>
          <div className="form-item-other">
            <div className="checkbox">
              <input type="checkbox" id="rememberMeCheckbox" defaultChecked />
              <label htmlFor="rememberMeCheckbox">Remember me</label>
            </div>
            <a href="#">I forgot my password!</a>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="login-card-footer">
          Don't have an account? <a href="#">Create a free account.</a>
        </div>
      </div>
      <div className="login-card-social">
        <div>Other Sign-In Options</div>
        <div className="login-card-social-btns">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-facebook"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3"></path>
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-google"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
