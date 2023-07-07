const CodeExecutionStrategy = require('./CodeExecutionStrategy');
const { PythonShell } = require("python-shell");
const _ = require('lodash');

class PythonExecutionStrategy extends CodeExecutionStrategy {
    async executeCode(code, tests) {

        var testResults = []
  
    
        // Execute the code for each test case
        for (const test of tests) {
            const input = test[0];
            const expectedResult = test[1];

            // Execute the code using the PythonShell library
            const options = {
                mode: 'text',
                pythonOptions: ['-u'], // get print results in real-time
                args: input
            };
            
            // console.log('Executing Python code for input:', input);
            // console.log(code);
            try {
              const messages = await PythonShell.runString(code, options);
              const result = messages[0]; // Access the first element of the messages array
      
              if (result === expectedResult.toString()) {
                testResults.push(result);
                // console.log('Correct');
              }
            } catch (error) {
              console.error('Error executing Python code:', error);
            }
          }
  
        // console.log(testResults)
        // console.log(Math.round((testResults.length / tests.length) * 100))
        return Math.floor((testResults.length / tests.length) * 100);


    
    }
    
}

module.exports = PythonExecutionStrategy;