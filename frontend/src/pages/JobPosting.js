import React, { useState } from 'react';
import { RxOpenInNewWindow } from 'react-icons/rx';
import '../JobPosting.css'; // Import custom CSS file for styling
// import girlImage from 'https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279';


function JobPosting() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [datePosted, setDate] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const job = {
      title,
      location,
      jobDescription,
      deadline,
      datePosted,
    };

    fetch('http://localhost:8000/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Job posting request failed.');
        }
      })
      .then((data) => {
        console.log(data); // handle the response from the server
        setTitle('');
        setLocation('');
        setDescription('');
        setDeadline('');
        setDate('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="job-posting-container">
        <h2>Create Post</h2>
        <form className="job-form">
          <div className="form-group">
            <label htmlFor="title">Job Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Job Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description:</label>
            <textarea
              id="description"
              value={jobDescription}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="text"
              id="deadline"
              value={deadline}
              onChange={handleDeadlineChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              value={datePosted}
              onChange={handleDateChange}
              required
            />
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Create Job
          </button>
        </form>
      </div>

      <div id="more">More from this company</div>

      <div className="projects">
        <div className="projects-container">
          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>Meta</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <RxOpenInNewWindow />
              </button>
            </div>
          </div>

          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>Google</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <RxOpenInNewWindow />
              </button>
            </div>
          </div>

          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>Google</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <RxOpenInNewWindow />
              </button>
            </div>
          </div>

          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>FaceBook</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <RxOpenInNewWindow />
              </button>
            </div>
          </div>

          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>Microsoft</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <RxOpenInNewWindow />
              </button>
            </div>
          </div>

          <div className="portfolio-box">
            <img src="https://cdn.shopify.com/s/files/1/0578/3696/1997/t/9/assets/lofiboy.gif?v=103461765217895835051680702279" alt="" />
            <div className="portfolio-layer">
              <h3>Google</h3>
              <p></p>
              <button
                onClick={() => window.open('https://example.com')}
                rel="noopener noreferrer"
              >
                <i className="bx bx-link-external"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPosting;
