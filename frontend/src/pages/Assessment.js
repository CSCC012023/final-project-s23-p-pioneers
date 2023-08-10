import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { useTimer } from "react-timer-hook";
import { useNavigate, useParams } from "react-router-dom";
import { python as codemirrorPython } from "@codemirror/lang-python"; // Update the import to use pythonLanguage

import "./Assessment.css";

function Assessment() {
  const { id } = useParams();

  const [res, setRes] = useState({
    assessmentId: "",
    title: "",
    description: "",
    boilerCode: "",
    code: "",
    testCases: [],
    exampleCases: "",
    datePosted: "",
    jobId: "",
  });
  const [result, setResult] = useState();

  // const [selectedProblem, setSelectedProblem] = useState(res.desc);
  const [selectedTab, setSelectedTab] = useState("description");
  const [inputValue, setInputValue] = useState(res.boilerCode);
  const [submissions, setSubmissions] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [description, setDescription] = useState("");

  const handleProblemSelect = (problem) => {
    // setSelectedProblem(problem);
    setSelectedTab("description");
    setInputValue(problem.starterCode);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const { seconds, minutes, start, pause, reset, expiryTimestamp } = useTimer({
    expiryTimestamp: null,
    autoStart: false,
  });

  // Set the fixed duration for the timer (e.g., 10 minutes)
  const fixedDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Function to handle timer expiration
  const handleTimerExpiration = () => {
    // Code to close the timer or perform any other actions when the timer expires
    // For example, you could stop the timer and submit the code automatically here
    pause();
    submitCode();
  };

  // Update the timer state every second

  useEffect(() => {
    const jobId = id; // Replace this with the actual jobId or assessmentId you want to fetch

    fetch(`http://localhost:8000/getassessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobId: jobId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Data contains the assessment object returned from the server
        setRes(data);
        console.log(data);
        const resObject = JSON.parse(data.description);
        setDescription(resObject.blocks[0].text);

        setInputValue(data.boilerCode);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Initialize the timer when the component mounts

  const addAssessment = async (code, score, username) => {
    const requestOptions = {
      username: username,
      codingQuestionResult: {
        code: code,
        score: score,
      },
      jobId: id,
    };
    try {
      const response = await fetch("http://localhost:8000/addcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestOptions),
      });

      if (!response.ok) {
        throw new Error("Failed to add assessment");
      }

      const data = await response.json();
      console.log(data); // Do something with the response data

      return data;
    } catch (error) {
      console.error("Error adding assessment:", error);
      throw error;
    }
  };
  const boilerPlate = `\n\nimport inspect\n\nimport sys\n\ndef parse_test_case(test_case, func):\n\n    signature = inspect.signature(func)\n\n    parameters = signature.parameters\n\n    args = []\n\n    kwargs = {}\n\n\n    if len(test_case) != len(parameters):\n\n        raise ValueError("Number of arguments in the test case doesn't match the function's signature.")\n\n\n    for i, (param_name, param) in enumerate(parameters.items()):\n\n        param_type = param.annotation\n\n        arg_value = test_case[i]\n\n\n        if param_name == 'self':\n\n            continue\n\n\n        if param.default != param.empty:\n\n            kwargs[param_name] = arg_value\n\n        else:\n\n            if param_type == inspect.Parameter.empty:\n\n                raise ValueError(f"Missing type annotation for parameter '{param_name}'.")\n\n            if isinstance(arg_value, param_type):\n\n                args.append(arg_value)\n\n            else:\n\n                raise TypeError(f"Argument '{arg_value}' for parameter '{param_name}' is of incorrect type.")\n\n\n    return args, kwargs\n\n\ndef run_test_case(func):\n\n    def wrapper(test_case, expected_result):\n\n        try:\n\n            args, kwargs = parse_test_case(test_case, func)\n\n            result = func(*args, **kwargs)\n\n            print("Expected Result:", expected_result)\n\n            print("Actual Result:", result)\n\n            assert result == expected_result, "Test Failed!"\n\n            print("Test Passed!")\n\n        except Exception as e:\n\n            print("Error:", e)\n\n\n    return wrapper\n\n\n# Find the function in the module dynamically\n\nfunction_name = [name for name, obj in globals().items() if inspect.isfunction(obj)][0]\n\nfunction = globals()[function_name]\n\n\n# Read test case and expected result from stdin\n\ndef read_test_case_and_expected_result():\n\n    test_case = eval(sys.argv[1])  # Using eval to parse the test case list\n\n    expected_result = eval(sys.argv[2])  # Using eval to parse the expected result\n\n    return test_case, expected_result\n\n\nif __name__ == "__main__":\n\n    test_case, expected_result = read_test_case_and_expected_result()\n\n    run_test_case(function)(test_case, expected_result)
`;

  const submitCode = () => {
    const requestData = {
      pythonCode: inputValue + "\n" + boilerPlate,
      tests: res.testCases,
    };

    // Get the username from local storage or any other source where you store it
    const username = localStorage.getItem("username");

    fetch("http://localhost:8000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setResult(data.score);
        console.log(data.score);
        if (inputValue.trim() !== "") {
          const newSubmission = {
            id: Date.now(),
            code: inputValue,
          };

          setSubmissions([
            ...submissions,
            { newSubmission: newSubmission, result: data.score },
          ]);
          // Pass the username to the addAssessment function
          
          addAssessment(inputValue, data.score, username);
          // setInputValue(res.boilerCode);
          setSelectedTab("submission");
        }
      })
      .catch((error) => {
        // Handle the error
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="left-content">
        <div className="tabs">
          <div
            className={`tab ${selectedTab === "description" ? "active" : ""}`}
            onClick={() => setSelectedTab("description")}
          >
            Description
          </div>
          <div
            className={`tab ${selectedTab === "submission" ? "active" : ""}`}
            onClick={() => setSelectedTab("submission")}
          >
            Submission
          </div>
        </div>
        <div className="content">
          {selectedTab === "description" && (
            <div className="description">
              <h1>{res.title}</h1>
              <p>{description}</p>
              <div className="example">
                {/* {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="example-box">
                    <h3>Example {index + 1}: </h3>
                    <div>
                      <strong>Input:</strong> {example.input}
                    </div>
                    <div>
                      <strong>Output:</strong> {example.output}
                    </div>
                    <div>
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          )}
          {selectedTab === "submission" && (
            <div className="submission">
              <h1>Submission</h1>
              {submissions.map((submission) => (
                <div
                  key={submission.newSubmission.id}
                  className={`${
                    submission.result === 100
                      ? "submission-boxgreen"
                      : "submission-boxred"
                  }`}
                >
                  <h3>Submission ID: {submission.id}</h3>
                  <pre>{submission.newSubmission.code}</pre>
                  <p>
                    <strong>Result:</strong> {submission.result}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="codeUI">
        <div className="timer">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
        <CodeMirror
          value={inputValue}
          onChange={handleInputChange}
          height="80vh"
          width="50vw"
          theme={dracula}
          extensions={[codemirrorPython()]} // Update the extensions to use pythonLanguage
          options={{
            mode: "python",
            theme: "dracula",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
          }}
        />
        {/* <div className="execute" onClick={executeJavaCode}>
          Execute Java Code
        </div> */}
        <div className="submit" onClick={submitCode}>
          Submit
        </div>
        {consoleOutput && (
          <div className="console-output">
            <h3>Console Output:</h3>
            <pre>{consoleOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assessment;
