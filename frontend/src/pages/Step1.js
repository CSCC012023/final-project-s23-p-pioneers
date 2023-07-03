import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import Step2 from "./Step2";
import Step3 from "./Step3";

const languages = [
  { name: 'Java', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png' },
  { name: 'C', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png' },
  { name: 'Python', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png' },
  // Add more languages with their respective images
];

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  alignItems: "flex-start",
  justifyContent: "top",
  marginTop: "5%",
  // marginLeft: "20%", // Adjust the left margin as needed
});

const Container = styled("div")({
  width: "40%",
  marginLeft: "10%"
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

const Step1 = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3;

  const handleLanguageToggle = (language) => () => {
    const selectedIndex = selectedLanguages.indexOf(language);
    let newSelectedLanguages = [...selectedLanguages];

    if (selectedIndex === -1) {
      newSelectedLanguages = [...selectedLanguages, language];
    } else {
      newSelectedLanguages.splice(selectedIndex, 1);
    }

    setSelectedLanguages(newSelectedLanguages);
  };

  const handleContinue = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <Typography variant="h4" gutterBottom>
              What tools/languages do you use?
            </Typography>
            {languages.map((language) => (
              <LanguageBox key={language.name}>
                <LanguageImage src={language.image} alt={language.name} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes(language)}
                      onChange={handleLanguageToggle(language)}
                      color="primary"
                    />
                  }
                  label={language.name}
                />
              </LanguageBox>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContinueButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleContinue}
                >
                  Continue
                </ContinueButton>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth>
                  I'll do this later
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return <Step2 handleNext={handleContinue} />;
      case 3:
        return <Step3 handleNext={handleContinue}/>;
      default:
        return null;
    }
  };

  return (
    <RootContainer>
      <Container>
        <Box mb={2}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / totalSteps) * 100}
          />
        </Box>
        {renderStepContent()}
      </Container>
    </RootContainer>
  );
};

export default Step1;
