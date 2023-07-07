const CodeExecutionStrategy = require('./CodeExecutionStrategy');
const PythonExecutionStrategy = require('./PythonExecutionStrategy');

// Define the Context class that uses the Strategy
class CodeExecutionContext {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    executeCode(code, tests) {
      this.strategy.executeCode(code, tests);
      // should return the result of the execution (which test cases passed, runtime, memory, etc.)
    }
  }

// const pythonCode = `
// import sys

// def add(num1, num2):
//     return num1 + num2
  
// if __name__ == "__main__":
//     num1 = int(sys.argv[1])
//     num2 = int(sys.argv[2])
//     print(add(num1, num2))
// `;

//   const tests = [
//     [[2, 3], 5],   // Test case 1: num1 = 2, num2 = 3 => expected result: 5
//     [[-1, 7], 6],  // Test case 2: num1 = -1, num2 = 7 => expected result: 6
//     [[0, 0], 0],   // Test case 3: num1 = 0, num2 = 0 => expected result: 0
//     [[10, -5], 5], // Test case 4: num1 = 10, num2 = -5 => expected result: 5
//   ];

// const language = 'Python';
// const pythonStrategy = new PythonExecutionStrategy();
// const context = new CodeExecutionContext(pythonStrategy);
// context.executeCode(pythonCode, tests);

module.exports = CodeExecutionContext;