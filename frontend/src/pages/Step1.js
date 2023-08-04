import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  TextField,
  Autocomplete,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const languages = [
  { label: "Java", image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png' },
  { label: "Python", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png' },
  { label: "C", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png' },
  { label: "C++", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png' },
  { label: "JavaScript", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' },
  { label: "PHP", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png' },
  { label: "SQL", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sql_data_base_with_logo.png/1200px-Sql_data_base_with_logo.png' },
  { label: "Ruby", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png' },
  { label: "Swift", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/1200px-Swift_logo.svg.png' },
  { label: "Go", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png' },
  { label: "R", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1200px-R_logo.svg.png' },
  { label: "MATLAB", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/1200px-Matlab_Logo.png' },
  // Add more languages with their respective images
];

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: (window.innerHeight),
  alignItems: "flex-start",
  justifyContent: "top",
});

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#c599ff", //light purple
    },
    secondary: {
      main: "#A259FF" // mid-light purple
    },
  },
});

const Container = styled("div")({
  width: (window.innerWidth/5) * 2,
  marginLeft: "30%",
});

const LanguageBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
}));

const LanguageImage = styled("img")({
  width: "30px",
  height: "30px",
  marginRight: "8px",
});

const ContinueButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Step1 = ({ handleNext }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;

  const handleLanguageToggle = (language) => () => {
    const newSelectedLanguages = selectedLanguages.filter(
      (selectedLanguage) => selectedLanguage.label !== language.label
    );
    setSelectedLanguages(newSelectedLanguages);
  };
  const formattedLanguages = selectedLanguages.map(language => language.label);

  const navigate = useNavigate();

  const handleContinue = () => {
    fetch('http://localhost:8000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        field: 'skills',
        value: formattedLanguages, // Replace with the desired skills array
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });


    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    navigate("/User"); // Navigate to the final page
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    if (event.key === "Enter" && value.trim() !== "") {
      const existingLanguage = languages.find(
        (language) => language.label.toLowerCase() === value.trim().toLowerCase()
      );

      if (!existingLanguage) {
        const newLanguage = {
          label: value.trim(),
          image: "", // Set a default image for new languages
        };
        setSelectedLanguages((prevSelectedLanguages) => [
          ...prevSelectedLanguages,
          newLanguage,
        ]);
      }

      event.target.value = "";
    }
  };

  const handleLanguageChange = (_, value) => {
    setSelectedLanguages(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value !== "") {
        const newLanguage = {
          label: value,
          image: "", // Set a default image for new languages
        };
        if (!selectedLanguages.some((language) => language.label === newLanguage.label)) {
          setSelectedLanguages((prevSelectedLanguages) => [
            ...prevSelectedLanguages,
            newLanguage,
          ]);
        }
        event.target.value = "";
      }
    }
  };

  const renderOption = (props, option, state) => (
    <li {...props} className={state.selected ? 'selected' : ''}>
      <Box display="flex" alignItems="center">
        <LanguageImage src={option.image} alt={option.label} />
        <Typography variant="body1">{option.label}</Typography>
      </Box>
    </li>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <Typography variant="h4" gutterBottom paddingTop={4}>
              What tools/languages do you use?
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={languages}
              value={selectedLanguages}
              onChange={handleLanguageChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Languages"
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                    },
                  }}
                  fullWidth
                  onKeyDown={handleKeyDown}
                  />
              )}
              renderOption={renderOption}
              renderTags={(value, getTagProps) =>
                value.map((language, index) => (
                  <Chip
                    key={language.label}
                    label={language.label}
                    onDelete={() => handleLanguageToggle(language)}
                    {...getTagProps({ index })}
                  />
                ))
              }
              classes={{
                paper: 'dropdown-menu',
              }}
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

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContinueButton
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleContinue}
                >
                  Continue
                </ContinueButton>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="secondary" fullWidth onClick={handleFinish} >
                  I'll do this later
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return <Step2 handleNext={handleContinue} handlePrevious={handlePrevious} />;
      case 3:
        return <Step3 handleNext={handleContinue} handlePrevious={handlePrevious}/>;
      case 4:
        return <Step4 handleNext={handleContinue} handlePrevious={handlePrevious}/>;
      default:
        return null;
    }
  };

  return (
    <RootContainer>
      <Container>
        <Box mb={2} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: (window.innerHeight/8)/5,
        }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / totalSteps) * 100}
          />
        </Box>
        <ThemeProvider theme={colorTheme}>
          {renderStepContent()}
        </ThemeProvider>
      </Container>
    </RootContainer>
  );
};

export default Step1;