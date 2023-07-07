import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../assets/images/CoBuildLogo.png";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  background: "#F5F5F5",
  borderRadius: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: "#333333",
}));

const UploadContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

const PreviewAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  borderRadius: "50%",
  cursor: "pointer",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const PreviewText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: "#333333",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BioField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: "100%",
}));

const Step4 = ({ handleSetProfileImage, handlePrevious }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleProfileImageSubmit = async () => {
    // Handle the submission logic for the profile image
    navigate("/step3"); // Navigate to Step3
  };

  const handleProfileImageChange = (event) => {
    // Handle the profile image change logic
    if (
      !event.target ||
      !event.target.files ||
      event.target.files.length <= 0
    )
      return;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Add the uploaded file to the state
      const updatedFiles = [...uploadedFiles];
      updatedFiles.push(file);
      setUploadedFiles(updatedFiles);
    }
  };

  const handlePreviewClick = () => {
    // Implement any custom logic when the profile image preview is clicked
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handlePreviousClick = () => {
    handlePrevious(); // Trigger the navigation to Step3
  };

  const handleFinish = () => {
    // Handle the finish button logic
    navigate("/User"); // Navigate to the final page
  };

  return (
    <RootContainer>
      <Title variant="h4" gutterBottom>
        Set Profile Picture & Bio
      </Title>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UploadContainer>
            <FormControl>
              <Input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              <FormHelperText>Accepted formats: JPG, PNG</FormHelperText>
            </FormControl>
          </UploadContainer>

          {profileImage && (
            <PreviewContainer>
              <PreviewAvatar
                alt="Profile Image"
                src={profileImage}
                onClick={handlePreviewClick}
              />
              <PreviewText variant="subtitle1">Preview</PreviewText>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleProfileImageSubmit}
              >
                Set Profile Picture
              </StyledButton>
            </PreviewContainer>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <BioField
            label="Bio"
            multiline
            rows={4}
            variant="outlined"
            value={bio}
            onChange={handleBioChange}
          />
        </Grid>
      </Grid>

      <Box marginTop={2}>
        <Button variant="outlined" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleFinish}>
          Finish
        </Button>
      </Box>
    </RootContainer>
  );
};

export default Step4;
