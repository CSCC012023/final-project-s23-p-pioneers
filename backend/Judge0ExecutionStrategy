class Judge0ExecutionStrategy extends CodeExecutionStrategy {
    executeCode(code, tests, language) {
        
        // Use Judge0 API to execute the code with tests
        const apiUrl = 'https://api.judge0.com/submissions';
        const apiKey = 'YOUR_API_KEY';

        // Create an array of promises for each test case
        const submissionPromises = tests.map(test => {
            // Extract the input and output from the test case
            const { input, output } = test;
      
            // Create the request body
            const data = {
              source_code: code,
              language_id: language,
              stdin: input
            };
      
            // Create the request headers
            const headers = {
              'Content-Type': 'application/json',
              'X-API-KEY': apiKey
            };
      
            // Send the request to the Judge0 API
            return fetch(apiUrl, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(data)
            })
              .then(response => response.json())
              .then(result => {
                const { stdout } = result;
                // Compare the stdout with the desired output and provide feedback
                const passed = stdout.trim() === output.trim();
                return { passed, stdout };
              })
              .catch(error => {
                console.error(error);
                return { passed: false, stdout: '' };
              });
          });
      
          // Wait for all test cases to complete
          return Promise.all(submissionPromises);
    }
}