import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { json } from "@codemirror/lang-json";

import { python as codemirrorPython } from "@codemirror/lang-python"; // Update the import to use pythonLanguage

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
  Grid,
} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  nightOwl,
  dracula as draculaSyntax,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import pythonHighlightJS from "highlight.js/lib/languages/python";
import { json as jsonSyntaxHighlighter } from "react-syntax-highlighter/dist/esm/languages/hljs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

SyntaxHighlighter.registerLanguage("python", pythonHighlightJS);

const myKeyBindingFn = (e) => {
  // Check if the key pressed is the tab key and no modifier keys are pressed
  if (e.keyCode === 9 && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    // Return the command to insert the tab character
    return "insert-tab";
  }
  // Use the default key binding for other keys
  return getDefaultKeyBinding(e);
};

const UploadAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [solution, setSolution] = useState(EditorState.createEmpty());
  const [testCases, setTestCases] = useState(EditorState.createEmpty());
  const [codeEditorState, setCodeEditorState] = useState(
    EditorState.createEmpty()
  );

  const [solutionValue, setSolutionValue] = useState(
    "#Type your solution here"
  );
  const [testcasesValue, setTestcasesValue] = useState("[ \n \n ]");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

      //Api Call
      // Replace 'your-backend-url' with the actual URL of your backend server

  
  };

  const handleInputChangeSolution = (value) => {
    setSolutionValue(value);
  };

  const handleInputChangeTestcases = (value) => {
    setTestcasesValue(value);
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

  const handleSolutionChange = (value) => {
    setSolutionValue(value);
  };

  const handleCodeEditorChange = (editorState) => {
    setCodeEditorState(editorState);
  };

  const handleTestCasesChange = (value) => {
    setTestcasesValue(value);
  };

  const highlightCode = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const code = contentState.getPlainText();
    return (
      <SyntaxHighlighter language="python" style={nightOwl}>
        {code}
      </SyntaxHighlighter>
    );
  };

  const handleSubmit = () => {


    const boilerPlate = `\n\nimport inspect\n\ndef parse_test_case(test_case, func):\n\n    signature = inspect.signature(func)\n\n    parameters = signature.parameters\n\n    args = []\n\n    kwargs = {}\n\n\n    if len(test_case) != len(parameters):\n\n        raise ValueError("Number of arguments in the test case doesn't match the function's signature.")\n\n\n    for i, (param_name, param) in enumerate(parameters.items()):\n\n        param_type = param.annotation\n\n        arg_value = test_case[i]\n\n\n        if param_name == 'self':\n\n            continue\n\n\n        if param.default != param.empty:\n\n            kwargs[param_name] = arg_value\n\n        else:\n\n            if param_type == inspect.Parameter.empty:\n\n                raise ValueError(f"Missing type annotation for parameter '{param_name}'.")\n\n            if isinstance(arg_value, param_type):\n\n                args.append(arg_value)\n\n            else:\n\n                raise TypeError(f"Argument '{arg_value}' for parameter '{param_name}' is of incorrect type.")\n\n\n    return args, kwargs\n\n\ndef run_test_case(func):\n\n    def wrapper(test_case, expected_result):\n\n        try:\n\n            args, kwargs = parse_test_case(test_case, func)\n\n            result = func(*args, **kwargs)\n\n            print("Expected Result:", expected_result)\n\n            print("Actual Result:", result)\n\n            assert result == expected_result, "Test Failed!"\n\n            print("Test Passed!")\n\n        except Exception as e:\n\n            print("Error:", e)\n\n\n    return wrapper\n\n\n# Find the function in the module dynamically\n\nfunction_name = [name for name, obj in globals().items() if inspect.isfunction(obj)][0]\n\nfunction = globals()[function_name]\n\n\n# Read test case and expected result from stdin\n\ndef read_test_case_and_expected_result():\n\n    test_case = eval(input().strip())  # Using eval to parse the test case list\n\n    expected_result = eval(input().strip())  # Using eval to parse the expected result\n\n    return test_case, expected_result\n\n\nif __name__ == "__main__":\n\n    test_case, expected_result = read_test_case_and_expected_result()\n\n    run_test_case(function)(test_case, expected_result)
`;
    const finalCod = solutionValue + "\n" + boilerPlate;
    const finalCod2 = testcasesValue;
    console.log(finalCod, testcasesValue);
    const backendUrl = "http://localhost:8000/createassessment";
    const rawContentState = convertToRaw(description.getCurrentContent());

    // Convert the raw content to a JSON string
    const descriptionString = JSON.stringify(rawContentState);
    
    console.log(descriptionString);
    // Sample data for the request body
    const requestBody = {
      title: title,
      description: descriptionString,
      code: finalCod,
      testCases: JSON.parse(testcasesValue),
      boilerCode: solutionValue,
      exampleCases: "Example: input => output",
      jobId: localStorage.getItem("tempJobId"),
    };

    // Make the Fetch API call
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Assessment created successfully:", data);
        // Handle the response data here
        localStorage.removeItem("tempJobId");

      })
      .catch((error) => {
        console.error("Error creating assessment:", error);
        // Handle any errors that occurred during the API call
      });

  };

  const instructions = [
    "Great titles are concise, descriptive, and specific.",
    "Clearly describe your question, and check our question set to make sure your problem isn’t already there.",
    "Sample: Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  ];

  const codeString = `class Solution(object):
  def twoSum(self, nums, target):
      match = {}
      for idx, n in enumerate(nums):
          if n not in match:
        match[target - n] = idx
          else:
              return match[n], idx
      return -1, -1`;

  const jsonSample = `testCases = [
    {   //Test Case 1
        "input": [2, 3],
        "output": "hello"
    },
    {   //Test Case 2
        "input": [2, 3],
        "output": "hello"
    }

]`;
  const renderInstructionsCard = () => {
    let title;
    let description;

    switch (activeStep) {
      case 1:
        title = "Share your solution*";
        description =
          "Explain your solution and the reasoning behind it. Provide code or pseudo-code as needed.";
        break;
      case 2:
        title = "Create test cases*";
        description =
          "Write test cases to validate your solution. Include both input and expected output.";
        break;
      default:
        title = "Question";
        description =
          "1. Great titles are concise, descriptive, and specific. Clearly describe your question.";
        break;
    }

    return (
      <Box
        sx={{
          backgroundColor: "#3B3B3B",
          color: "white",
          padding: "20px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        {/* Light bulb icon */}
        <LightbulbIcon sx={{ marginRight: "10px" }} />

        {/* Instructions */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {/*add margin */}
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {description}
        </Typography>

        {activeStep === 0 && (
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", marginTop: "8px" }}
          >
            {/* Example input/output here */}
            2. Clearly describe your question, and check our question set to
            make sure your problem isn’t already there.
            {"\n\n"} {/* Use two newline characters to create a new line */}
            Sample: Given an array of integers, return indices of the two
            numbers such that they add up to a specific target. You may assume
            that each input would have exactly one solution, and you may not use
            the same element twice.
            {"\n\n"}
            Example:{"\n"}
            Given{" "}
            <span style={{ backgroundColor: "rgba(255, 255, 0, 0.25)" }}>
              nums = [2, 7, 11, 15]
            </span>
            ,
            <span style={{ backgroundColor: "rgba(255, 255, 0, 0.25)" }}>
              target = 9
            </span>
            , Because{" "}
            <span style={{ backgroundColor: "rgba(255, 255, 0, 0.25)" }}>
              nums[0]
            </span>{" "}
            +{" "}
            <span style={{ backgroundColor: "rgba(255, 255, 0, 0.2)" }}>
              nums[1]
            </span>{" "}
            = 2 + 7 = 9, return{" "}
            <span style={{ backgroundColor: "rgba(255, 255, 0, 0.25)" }}>
              [0, 1]
            </span>
          </Typography>
        )}

        {activeStep === 1 && (
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", marginTop: "8px" }}
          >
            {/* Example input/output here */}
            Sample: The idea is: When we iterate the array, we put target -
            current and index as (key, value) into a dictionary. We check if the
            current number already exists in the dictionary. If it exists, then
            we have found the answer. If not, we keep searching until we find
            the answer or reach the end of the array. And have a psuedocode
            field that highlights the syntax of the code:
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#011627",
                borderRadius: "5px",
              }}
            >
              <SyntaxHighlighter language="python" style={nightOwl}>
                {codeString}
              </SyntaxHighlighter>
            </Box>
          </Typography>
        )}

        {activeStep === 2 && (
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", marginTop: "8px" }}
          >
            {/* Example input/output here */}

            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#011627",
                borderRadius: "5px",
              }}
            >
              <SyntaxHighlighter language="json" style={nightOwl}>
                {jsonSample}
              </SyntaxHighlighter>
            </Box>
          </Typography>
        )}
      </Box>
    );
  };

  const steps = [
    // Background Step
    {
      label: "Question",
      content: (
        <div>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          >
            <InputLabel
              htmlFor="category-select"
              sx={{
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" }, // Change color on focus
              }}
              shrink
            >
              Category
            </InputLabel>
            <Select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                "& .MuiSelect-root": {
                  color: "#FFFFFF", // White text color for the selected text on the text bar
                },
                "& .MuiSelect-icon": {
                  color: "#FFFFFF", // White color for the select icon
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF", // White border color by default
                  "&:hover": {
                    borderColor: "#A259FF", // Purple border color on hover
                  },
                },
              }}
              inputProps={{
                classes: {
                  icon: "icon",
                },
              }}
              IconComponent={() => (
                <span
                  className="icon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    color: "#FFFFFF",
                  }}
                >
                  &#9660; {/* Down arrow icon */}
                </span>
              )}
            >
              <MenuItem
                value=""
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                <em>Select a category</em>
              </MenuItem>
              <MenuItem
                value="Algorithms"
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                Algorithms
              </MenuItem>
              <MenuItem
                value="Database"
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                Database
              </MenuItem>
              <MenuItem
                value="Shell"
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                Shell
              </MenuItem>
              <MenuItem
                value="Concurrency"
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                Concurrency
              </MenuItem>
              <MenuItem
                value="JavaScript"
                sx={{
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#A259FF", // Grey background on hover
                  },
                }}
              >
                JavaScript
              </MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#A259FF" }}>
              Select a category for the assessment
            </FormHelperText>
          </FormControl>

          <Box marginTop={2} />

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFFFFF", // White border color
                },
                "&:hover fieldset": {
                  borderColor: "#A259FF", // Purple border color on hover
                },
                "& input": {
                  color: "#FFFFFF", // White text color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF", // White text color for the label
              },
            }}
          ></TextField>

          <Box marginTop={2} />

          <Editor
            editorState={description}
            onEditorStateChange={handleDescriptionChange}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-content"
            placeholder="Enter description"
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "textAlign",
                "link",
                "emoji",
                "remove",
                "history",
              ],
            }}
          />
        </div>
      ),
    },

    // Solution Step
    {
      label: "Solution",
      content: (
        <div>
          <Box
            sx={{
              padding: "1rem",
              backgroundColor: "#011627",
              borderRadius: "5px",
              marginBottom: "20px",
              color: "white",
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "1.6",
              minHeight: "300px", // Set the minimum height to show the editor
            }}
          >
            {/* Render the solution editor */}

            <CodeMirror
              value={solutionValue}
              onChange={handleSolutionChange}
              height="50vh"
              width="55vw"
              extensions={[codemirrorPython()]} // Update the extensions to use pythonLanguage
              theme={dracula}
              options={{
                mode: "python", // Update the mode to use pythonLanguage
                theme: "dracula",
                lineNumbers: true,
                indentUnit: 2,
                tabSize: 2,
                autofocus: true,
              }}
            />
          </Box>
        </div>
      ),
    },

    // Test Cases Step
    {
      label: "Test Cases",
      content: (
        <div>
          <Box
            sx={{
              padding: "1rem",
              backgroundColor: "#011627",
              borderRadius: "5px",
              marginBottom: "20px",
              color: "white",
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "1.6",
              minHeight: "300px", // Set the minimum height to show the editor
            }}
          >
            {/* Render the solution editor */}

            {/* {highlightCode(testCases)} */}

            <CodeMirror
              value={testcasesValue}
              onChange={handleTestCasesChange}
              height="50vh"
              width="55vw"
              extensions={[json()]} // Update the extensions to use pythonLanguage
              theme={dracula}
              options={{
                mode: "json",
                theme: "dracula",
                lineNumbers: true,
                indentUnit: 2,
                tabSize: 2,
                autofocus: true,
              }}
            />
          </Box>
        </div>
      ),
    },
  ];

  return (
    <Grid container spacing={7} sx={{ marginTop: "10px" }}>
      {/* Left half of the screen */}
      <Grid item xs={7} sx={{ marginLeft: "5%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "work sans",
                fontWeight: "bold",
                fontSize: "35px",
              }}
            >
              Name and describe your question*
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "work sans",
                fontSize: "20px",
              }}
            >
              It's good to provide examples which will help users understand
              easily.
            </Typography>
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "work sans",
                fontWeight: "bold",
                fontSize: "35px",
              }}
            >
              Share your solution*
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "work sans",
                fontSize: "20px",
              }}
            >
              Explain your solution and the reasoning behind it. Provide code or
              pseudo-code as needed.
            </Typography>
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "work sans",
                fontWeight: "bold",
                fontSize: "35px",
              }}
            >
              Create test cases*
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "work sans",
                fontSize: "20px",
              }}
            >
              Write test cases to validate your solution. Include both input and
              expected output.
            </Typography>
          </Box>
        )}

        <Box marginTop={6} />

        <div>{steps[activeStep].content}</div>

        <Box marginTop={2} display="flex" justifyContent="space-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              background: "#A259FF",
              width: "120px",
              height: "60px",
              borderRadius: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "140%",
              fontFamily: "work sans",
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            sx={{
              background: "#A259FF",
              width: "120px",
              height: "60px",
              borderRadius: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "140%",
              fontFamily: "work sans",
            }}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Grid>

      {/* Right half of the screen */}
      <Grid item xs={3} sx={{ marginTop: "2%" }}>
        {renderInstructionsCard()}
      </Grid>
    </Grid>
  );
};

export default UploadAssessment;
