import React, { useState } from "react";
import { Typography, Box, Button, TextField, Autocomplete, Chip } from "@mui/material";
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

const Step2 = ({ handleNext }) => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
  
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
  
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Education and Courses
        </Typography>
  
        <Autocomplete
          freeSolo
          options={universities}
          renderInput={(params) => (
            <TextField
              {...params}
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
  
        <Box marginTop={2}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </div>
    );
  };
  
  export default Step2;
  