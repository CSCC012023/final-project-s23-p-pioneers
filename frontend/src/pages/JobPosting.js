import React from 'react'
import {useState} from 'react';


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
        datePosted
      };
  
      fetch('http://localhost:8000/createpost', { // Replace with your server URL
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
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Job Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Job Description:</label>
          <input
            type="text"
            id="description"
            value={jobDescription}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="text"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={datePosted}
            onChange={handleDateChange}
            required
          />
        </div>
        <button onClick={handleSubmit}>Create Job</button>
      </div>
    );
}

export default JobPosting