import React, { useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "0%", // Adjust the left margin as needed
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 16,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: "50%",
  },
  button: {
    marginTop: 16,
  },
});

const Step3 = ({ handleSetProfileImage }) => {
  const classes = useStyles();
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewClick = () => {
    // Implement any custom logic when the profile image preview is clicked
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Profile Photo
      </Typography>

      <Box className={classes.uploadContainer}>
        <FormControl>
          {/* <InputLabel htmlFor="profile-image-input">Upload Image</InputLabel> */}
          <Input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <FormHelperText>Accepted formats: JPG, PNG</FormHelperText>
        </FormControl>
      </Box>

      {profileImage && (
        <Box className={classes.previewContainer}>
          <Avatar
            className={classes.avatar}
            alt="Profile Image"
            src={profileImage}
            onClick={handlePreviewClick}
          />
          <Typography variant="subtitle1">Preview</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleSetProfileImage(profileImage)}
          >
            Set Profile Picture
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Step3;
