import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";

import "./SearchBar.css";

function SearchBar() {
  const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    // Convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="main">
        <div className="search-left">
          <h1>Search Users</h1>
          <div className="search">
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
              color="primary"
              InputProps={{
                className: "search-input", // Apply custom styles to the input
                disableRipple: true, // Remove the ripple effect on click
              }}
              InputLabelProps={{
                className: "search-label", // Apply custom styles to the label
              }}
            />
          </div>
          <div className="users-list">
            <List input={inputText} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SearchBar;
