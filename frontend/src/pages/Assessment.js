import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript} from '@codemirror/lang-javascript';
import {java} from '@codemirror/lang-java';
import {python} from '@codemirror/lang-python';
import {cpp} from '@codemirror/lang-cpp';

import './Assessment.css';

function Assessment() {
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers, find two numbers such that they add up to a specific target.',
      starterCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    // Your code here
  }
}`,
      examples: [
        {
          input: '[2, 7, 11, 15], target = 9',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        }, 
        {
          input: '[3, 2, 4], target = 6',
          output: '[1, 2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
        },
        {
          input: '[3, 3], target = 6',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',

        },
        // More examples...
      ],
    },
    {
      id: 2,
      title: 'Reverse Integer',
      description: 'Given a signed 32-bit integer, reverse the digits of an integer.',
      starterCode: `class Solution {
  public int reverse(int x) {
    // Your code here
  }
}`,
      examples: [
        {
          input: '123',
          output: '321',
          explanation: 'After reversing the digits, we get 321.',
        },
        // More examples...
      ],
    },
    // Add more problems as needed
  ]);

  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [selectedTab, setSelectedTab] = useState('description');
  const [inputValue, setInputValue] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setSelectedTab('description');
    setInputValue(problem.starterCode);
  };
  

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const submitCode = () => {
    if (inputValue.trim() !== '') {
      const newSubmission = {
        id: Date.now(),
        code: inputValue,
      };

      setSubmissions([...submissions, newSubmission]);
      setInputValue('');
      setSelectedTab('submission');
    }
  };

  return (
    <div className="container">
      <div className="left-content">
        <div className="tabs">
          <div
            className={`tab ${selectedTab === 'description' ? 'active' : ''}`}
            onClick={() => setSelectedTab('description')}
          >
            Description
          </div>
          <div
            className={`tab ${selectedTab === 'submission' ? 'active' : ''}`}
            onClick={() => setSelectedTab('submission')}
          >
            Submission
          </div>
        </div>
        <div className="content">
          {selectedTab === 'description' && (
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
          {selectedTab === 'submission' && (
            <div className="submission">
              <h1>Submission</h1>
              {submissions.map((submission) => (
                <div key={submission.id} className="submission-box">
                  <h3>Submission ID: {submission.id}</h3>
                  <pre>{submission.code}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="codeUI">
        <CodeMirror
          value={inputValue}
          onChange={handleInputChange}
          height="80vh"
          width="50vw"
          theme={dracula}
          extensions={[javascript({ jsx: true }), java(), python(), cpp()]}
          options={{
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
          }}
        />
        <div className="submit" onClick={submitCode}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default Assessment;
