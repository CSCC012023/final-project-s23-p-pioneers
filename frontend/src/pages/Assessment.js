import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { useTimer } from "react-timer-hook";

import "./Assessment.css";

function Assessment() {



  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Two Sum",
      description:
        "Given an array of integers, find two numbers such that they add up to a specific target.",
      language: "python",
      starterCode:
        'import sys\n\ndef add(num1, num2):\n    return\n\nif __name__ == "__main__":\n    num1 = int(sys.argv[1])\n    num2 = int(sys.argv[2])\n    print(add(num1, num2))',
      tests: [
        [[2, 3], 5],
        [[-1, 7], 6],
        [[0, 0], 0],
        [[10, -5], 5],
      ],
      examples: [
        {
          input: "[2, 7, 11, 15], target = 9",
          output: "[0, 1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        // More examples...
      ],
    },
    // Add more problems as needed
  ]);

  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [selectedTab, setSelectedTab] = useState("description");
  const [inputValue, setInputValue] = useState(problems[0].starterCode);
  const [submissions, setSubmissions] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [result, setResult] = useState();

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setSelectedTab("description");
    setInputValue(problem.starterCode);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
    expiryTimestamp,
  } = useTimer({ expiryTimestamp: null, autoStart: false });

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
    const timerInterval = setInterval(() => {
      if (expiryTimestamp) {
        const remainingTime = Math.max(0, expiryTimestamp - new Date().getTime());
        if (remainingTime === 0) {
          handleTimerExpiration();
        }
      }
    }, 1000);

    // Cleanup function to clear the timer interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [expiryTimestamp]);

  // Initialize the timer when the component mounts
  useEffect(() => {
    const savedExpiryTimestamp = localStorage.getItem("expiryTimestamp");
    if (savedExpiryTimestamp) {
      const remainingTime = Math.max(0, savedExpiryTimestamp - new Date().getTime());
      if (remainingTime > 0) {
        start(savedExpiryTimestamp);
      } else {
        // Timer has expired, perform actions here
        handleTimerExpiration();
      }
    } else {
      const expiryTime = new Date().getTime() + fixedDuration;
      start(expiryTime);
      localStorage.setItem("expiryTimestamp", expiryTime);
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      pause();
    };
  }, []);

  const addAssessment = async (code, score, username) => {
    const requestOptions = {
      username: username,
      codingQuestionResult: {
        code: code,
        score: score,
      },
    };
    try {
      const response = await fetch("http://localhost:8000/addcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestOptions }),
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

  const submitCode = () => {
    const requestData = {
      pythonCode: inputValue,
      tests: problems[0].tests,
    };

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
        setResult(data.result);
        console.log(data.result);
        if (inputValue.trim() !== "") {
          const newSubmission = {
            id: Date.now(),
            code: inputValue,
          };

          setSubmissions([
            ...submissions,
            { newSubmission: newSubmission, result: data.result },
          ]);
          addAssessment(
            inputValue,
            data.result,
            localStorage.getItem("username")
          );
          setInputValue(problems[0].starterCode);
          setSelectedTab("submission");
        }
      })
      .catch((error) => {
        // Handle the error
        console.error("Error:", error);
      });
  };

  const executeJavaCode = () => {
    const code = `
${inputValue}

class Main {
  public static void main(String[] args) {
    int[] nums = {2, 7, 11, 15};
    int target = 9;
    Solution solution = new Solution();
    int[] result = solution.twoSum(nums, target);
    System.out.println("Output: " + Arrays.toString(result));
  }
}`;

    const blob = new Blob([code], { type: "text/plain" });
    const file = window.URL.createObjectURL(blob);

    const newWindow = window.open(file, "_blank");
    newWindow.onload = () => {
      newWindow.document.title = `${selectedProblem.title} Execution`;
      newWindow.document.body.style.backgroundColor = "white";

      newWindow.console.log = (message) => {
        setConsoleOutput((prevOutput) => prevOutput + message + "\n");
      };
    };
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
              <h1>{selectedProblem.title}</h1>
              <p>{selectedProblem.description}</p>
              <div className="example">
                {selectedProblem.examples.map((example, index) => (
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
                ))}
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
          extensions={[javascript({ jsx: true }), java()]}
          options={{
            mode: "javascript",
            theme: "dracula",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
          }}
        />
        <div className="execute" onClick={executeJavaCode}>
          Execute Java Code
        </div>
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
