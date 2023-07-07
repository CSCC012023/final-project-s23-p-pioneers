const CodeExecutionStrategy = require('./CodeExecutionStrategy');
const { PythonShell } = require("python-shell");
const _ = require('lodash');

class PythonExecutionStrategy extends CodeExecutionStrategy {
    executeCode(code, tests) {
        
        const testResults = [];
    
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
            
            console.log('Executing Python code for input:', input);
            // console.log(code);
            PythonShell.runString(code, options).then(messages => {
                console.log(messages);

              });
        }


    
        return testResults;
    }
    
}

module.exports = PythonExecutionStrategy;