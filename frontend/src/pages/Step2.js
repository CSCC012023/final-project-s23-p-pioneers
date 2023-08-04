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

const useStyles = makeStyles({
  dropdownMenu: {
    backgroundColor: "grey",
  },
});

const universities = [
  "University of Toronto",
  "University of Waterloo",
  "University of British Columbia",
  "McGill University",
  "University of Alberta",
  "University of Calgary",
  "Western University",
  // Add more universities here
];

const Step2 = ({ handleNext, handlePrevious }) => {
  const classes = useStyles();
  const [university, setUniversity] = useState("");
  const [program, setProgram] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log("University changed:", university);
  }, [university]);

  useEffect(() => {
    console.log("Program changed:", program);
  }, [program]);


  const handleNextClick = () => {
    // Execute the intermediate function here
    fetch('http://localhost:8000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        field: 'university',
        value: university, // Replace with the desired university value
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
    fetch('http://localhost:8000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        field: 'program',
        value: program, // Replace with the desired program value
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
    fetch('http://localhost:8000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        field: 'courses',
        value: courses, // Replace with the desired courses value (can be an array or string)
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
    handleNext();
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

  const handlePreviousClick = () => {
    handlePrevious(); // Trigger the navigation to Step1
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Educational Background
      </Typography>

      <Autocomplete
        freeSolo
        options={universities}
        value={university}
        onChange={(event, value) => setUniversity(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiInputLabel-root": {color: 'primary.main'},
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "primary.main" },
                "&:hover fieldset": { borderColor: "secondary.main" },
              },
            }}
            label="University"
            fullWidth
            InputProps={{
              ...params.InputProps,
              style: { color: "white" },
            }}
          />
        )}
        classes={{
          paper: classes.dropdownMenu,
        }}
      />

      <Box marginTop={2} />

      <TextField
        label="Program"
        sx={{
          "& .MuiInputLabel-root": {color: 'primary.main'},
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "primary.main" },
            "&:hover fieldset": { borderColor: "secondary.main" },
          },
        }}
        fullWidth
        value={program}
        onChange={(event) => setProgram(event.target.value)}
        InputProps={{
          style: { color: "white" },
        }}
      />

      <Box marginTop={2} />

      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={courses}
        onChange={handleAddCourse}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Courses"
            sx={{
              "& .MuiInputLabel-root": {color: 'primary.main'},
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "primary.main"},
                "&:hover fieldset": { borderColor: "secondary.main" },
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
        classes={{
          paper: classes.dropdownMenu,
        }}
      />

      <Grid container spacing={2} paddingTop={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleNextClick}
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

export default Step2;