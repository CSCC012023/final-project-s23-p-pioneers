import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  dropdownMenu: {
    backgroundColor: "grey",
  },
});

const positions = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "UI Designer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Machine Learning Engineer",
    "Data Analyst",
    "Data Engineer",
    "DevOps Engineer",
    "Security Engineer",
    "Hardware Engineer",
    "Network Engineer",
    "Cloud Engineer",
  // Add more universities here
];

const degrees = [
    "Bachelors of Science",
    "Bachelors of Arts",
    "Bachelors of Engineering",
    "Bachelors of Computer Science",
    "Bachelors of Commerce",
    "Bachelors of Business Administration",
    "Bachelors of Mathematics",
    "Bachelors of Economics",
    "Bachelors of Accounting",
    "Bachelors of Statistics",
    "Bachelors of Finance",
    "Bachelors of Arts and Science",
    "Masters of Science",
    "Masters of Arts",
    "Masters of Engineering",
    "Masters of Computer Science",
    "PhD in Computer Science",
    "PhD in Mathematics",
    "PhD in Statistics",
    "PhD in Physics",
    "PhD in Chemistry",
]

const tags = [
    "IOS development",
    "Android development",
    "Web development",
    "Fullstack development",
    "Frontend development",
    "Backend development",
    "Machine learning",
    "Data science",
    "Data analytics",
    "Data engineering",
    "DevOps",
    "Cloud computing",
    "Security",
    "Hardware",
    "Network",
]

const RecruiterSteps2 = ({ handleNext, handlePrevious }) => {
  const classes = useStyles();
  const [university, setUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [courses, setCourses] = useState([]);
  const [activeStep, setActiveStep] = useState(2);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const navigate = useNavigate();


    const handleDegreeChange = (event, value) => {
        setSelectedDegrees(value);
    };

    const handleTagChange = (event, value) => {
        setSelectedTags(value);
    };

    const handlePositionChange = (event, value) => {
        setSelectedPositions(value);
    };

  const handleNextClick = async (event) => {
    // Execute the intermediate function here
    fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'positionList',
        value: selectedPositions, // Replace with the desired university value
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // Update program
    fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'degrees',
        value: selectedDegrees, // Replace with the desired program value
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // Update courses
    fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'tags',
        value: selectedTags, // Replace with the desired courses value (can be an array or string)
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // Call the parent class handler
    navigate("/recruiterstep3");
    //handleNext();
  };

  const handleAddPosition = (event, value) => {
    if (value) {
      let newPositions = [];
      if (Array.isArray(value)) {
        newPositions = value.map((position) => position.trim());
      } else if (typeof value === "string") {
        newPositions = value.split(",").map((position) => position.trim());
      }
      setSelectedPositions((prevPositions) => {
        const filteredPositions = prevPositions.filter(
          (position) => !newPositions.includes(position)
        );
        return [...filteredPositions, ...newPositions];
      });
    }
  };

  const handleRemovePosition = (position) => {
    setSelectedPositions((prevPositions) =>
      prevPositions.filter((p) => p !== position)
    );
  };


  const handleAddCourse = (event, value) => {
    if (value) {
      let newCourses = [];
      if (Array.isArray(value)) {
        newCourses = value.map((course) => course.trim());
      } else if (typeof value === "string") {
        newCourses = value.split(",").map((course) => course.trim());
      }
      setCourses((prevCourses) => {
        const filteredCourses = prevCourses.filter(
          (course) => !newCourses.includes(course)
        );
        return [...filteredCourses, ...newCourses];
      });
    }
  };

  const handleRemoveCourse = (course) => {
    setCourses((prevCourses) => prevCourses.filter((c) => c !== course));
  };

  const handleAddTag = (event, value) => {
    if (value) {
      let newTags = [];
      if (Array.isArray(value)) {
        newTags = value.map((tag) => tag.trim());
      } else if (typeof value === "string") {
        newTags = value.split(",").map((tag) => tag.trim());
      }
      setSelectedTags((prevTags) => {
        const filteredTags = prevTags.filter((tag) => !newTags.includes(tag));
        return [...filteredTags, ...newTags];
      });
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleNextContinueClick = (event) => {
    handleNextClick(event);
  };

  const handlePreviousClick = () => {
    handlePrevious(); // Trigger the navigation to Step1
  };

  return (
    <div>
        <Typography
            variant="h5"
            sx={{
            fontFamily: "work sans",
            fontWeight: "bold",
            fontSize: "35px",
            }}
            gutterBottom paddingTop={4}
        >
            Employee Background
        </Typography>

        <Autocomplete
        multiple
        freeSolo
        options={positions}
        value={selectedPositions}
        onChange={handlePositionChange}
        classes={{
          paper: 'dropdown-menu',
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Position"
            sx={{
              "& .MuiInputLabel-root": { color: 'primary.main' },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "primary.main" },
              },
            }}
            fullWidth
            InputProps={{
              ...params.InputProps,
              style: { color: "white" },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPosition(null, params.inputProps.value);
                params.inputProps.onChange(e);
              }
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((position, index) => (
            <Chip
              key={position}
              label={position}
              onDelete={() => handleRemovePosition(position)}
              {...getTagProps({ index })}
            />
          ))
        }
      />



        <style>{`
            .dropdown-menu {
            background-color: grey;
            }
            .dropdown-menu li {
            padding: 8px;
            }
            .dropdown-menu li.selected {
            background-color: lightgrey;
            }
        `}</style>


      <Box marginTop={2} />
{/* 
      <TextField
        label="Degrees Preferred"
        sx={{
          "& .MuiInputLabel-root": {color: 'primary.main'},
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "primary.main" },
          },
        }}
        fullWidth
        value={program}
        onChange={(event) => setProgram(event.target.value)}
        InputProps={{
          style: { color: "white" },
        }}
      /> */}


    <Autocomplete
        multiple
        freeSolo
        options={degrees}
        value={selectedDegrees}
        onChange={handleDegreeChange}
        classes={{
            paper: 'dropdown-menu',
        }}

        renderInput={(params) => (
            <TextField
              {...params}
              label="Degrees Preferred"
              sx={{
                "& .MuiInputLabel-root": { color: 'primary.main' },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "primary.main" },
                },
              }}
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: { color: "white" },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCourse(null, params.inputProps.value);
                  params.inputProps.onChange(e);
                }
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((course, index) => (
              <Chip
                key={course}
                label={course}
                onDelete={() => handleRemoveCourse(course)}
                {...getTagProps({ index })}
              />
            ))
          }
        />

        <style>{`
            .dropdown-menu {
            background-color: grey;
            }
            .dropdown-menu li {
            padding: 8px;
            }
            .dropdown-menu li.selected {
            background-color: lightgrey;
            }
        `}</style>


      <Box marginTop={2} />

      <Autocomplete
        multiple
        freeSolo
        options={tags}
        value={selectedTags}
        onChange={handleTagChange}
        classes={{
            paper: 'dropdown-menu',
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            sx={{
              "& .MuiInputLabel-root": { color: 'primary.main' },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "primary.main" },
              },
            }}
            fullWidth
            InputProps={{
              ...params.InputProps,
              style: { color: "white" },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(null, params.inputProps.value);
                params.inputProps.onChange(e);
              }
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((tag, index) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              {...getTagProps({ index })}
            />
          ))
        }
      />
        <style>{`
            .dropdown-menu {
            background-color: grey;
            }
            .dropdown-menu li {
            padding: 8px;
            }
            .dropdown-menu li.selected {
            background-color: lightgrey;
            }
        `}</style>


      <Grid container spacing={2} paddingTop={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleNextContinueClick}
          >
            Continue
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handlePreviousClick}>
            Previous
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecruiterSteps2;