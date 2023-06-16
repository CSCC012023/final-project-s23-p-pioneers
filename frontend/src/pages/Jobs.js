import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import JobPosting from './components/Card';


function Jobs() {


    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      fetchJobIds();
    }, []);
  
    const fetchJobIds = () => {
        console.log("hello")
      fetch('http://localhost:8000/getpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(data => {
            console.log(data)
          setJobs(data);
        })
        .catch(error => {
          console.error('Error fetching job posts:', error);
        });
    };
  
    return (
      <div>
        {/* Render job list or perform actions with jobIds */}
        <JobPosting prop={jobs} />

      </div>
    );

}

export default Jobs