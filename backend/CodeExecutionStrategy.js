class CodeExecutionStrategy {
    executeCode(code, tests) {
        throw new Error('You have to implement the method executeCode!');
    }
    evaluateCode(code, memoryUsage, timeUsage, tests) {
        throw new Error('You have to implement the method evaluateCode!');
        // should return the result of the execution as a score
        // evaluation should be based on the test cases passed, runtime, memory, clean code, time taken to write the code, etc.
    }
}

module.exports = CodeExecutionStrategy;