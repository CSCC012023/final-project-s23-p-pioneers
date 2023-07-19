import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const UploadAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [solution, setSolution] = useState(EditorState.createEmpty());
  const [testCases, setTestCases] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (editorState) => {
    setDescription(editorState);
  };

  const handleSolutionChange = (editorState) => {
    setSolution(editorState);
  };

  const handleTestCasesChange = (event) => {
    setTestCases(event.target.value);
  };

  const handleSubmit = () => {
    // Convert description and solution editor states to raw content
    const descriptionContent = convertToRaw(description.getCurrentContent());
    const solutionContent = convertToRaw(solution.getCurrentContent());

    const formData = {
      category,
      title,
      description: JSON.stringify(descriptionContent),
      solution: JSON.stringify(solutionContent),
      testCases: testCases.split("\n").map((testCase) => {
        const [input, output] = testCase.split(" -> ");
        return { input, output };
      }),
    };

    // TODO: Make API call to submit the assessment data

    // Reset the form fields
    setCategory("");
    setTitle("");
    setDescription(EditorState.createEmpty());
    setSolution(EditorState.createEmpty());
    setTestCases("");
  };

  const steps = [
    {
      label: "Background",
      content: (
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="category-select">Category</InputLabel>
            <Select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "grey",
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              <MenuItem value="Algorithms">Algorithms</MenuItem>
              <MenuItem value="Database">Database</MenuItem>
              <MenuItem value="Shell">Shell</MenuItem>
              <MenuItem value="Concurrency">Concurrency</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
            </Select>
            <FormHelperText>Select a category for the assessment</FormHelperText>
          </FormControl>

          <Box marginTop={2} />

          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      ),
    },
    {
      label: "Description",
      content: (
        <div>
          <Editor
            editorState={description}
            onEditorStateChange={handleDescriptionChange}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-content"
            placeholder="Enter description"
            toolbar={{
              options: ["inline", "blockType", "list"],
              inline: {
                options: ["bold", "italic", "underline"],
              },
              blockType: {
                options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
              },
              list: {
                options: ["unordered", "ordered"],
              },
            }}
          />
        </div>
      ),
    },
    {
      label: "Solution",
      content: (
        <div>
          <Editor
            editorState={solution}
            onEditorStateChange={handleSolutionChange}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-content"
            placeholder="Enter solution"
            toolbar={{
              options: ["inline", "blockType", "list"],
              inline: {
                options: ["bold", "italic", "underline"],
              },
              blockType: {
                options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
              },
              list: {
                options: ["unordered", "ordered"],
              },
            }}
          />
        </div>
      ),
    },
    {
      label: "Test Cases",
      content: (
        <div>
          <TextField
            label="Test Cases"
            fullWidth
            multiline
            rows={4}
            value={testCases}
            onChange={handleTestCasesChange}
            style={{ backgroundColor: "#2B2B2B", color: "white" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* <Typography variant="h4" gutterBottom>
        Upload Assessment
      </Typography> */}

      <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: "#3B3B3B" }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  root: "step-icon",
                  active: "step-icon-active",
                  completed: "step-icon-completed",
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box marginTop={2} />

      <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#3B3B3B", color: "white" }}>
        <div>{steps[activeStep].content}</div>

        <Box marginTop={2}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default UploadAssessment;
