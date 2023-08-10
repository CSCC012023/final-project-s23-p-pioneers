# Example function
def add_list(num1: int, num2: int, num3: int):
    return num1 + num2 + num3

import inspect

import sys
def parse_test_case(test_case, func):
    signature = inspect.signature(func)
    parameters = signature.parameters
    args = []
    kwargs = {}

    if len(test_case) != len(parameters):
        raise ValueError("Number of arguments in the test case doesn't match the function's signature.")

    for i, (param_name, param) in enumerate(parameters.items()):
        param_type = param.annotation
        arg_value = test_case[i]

        if param_name == 'self':
            continue

        if param.default != param.empty:
            kwargs[param_name] = arg_value
        else:
            if param_type == inspect.Parameter.empty:
                raise ValueError(f"Missing type annotation for parameter '{param_name}'.")
            if isinstance(arg_value, param_type):
                args.append(arg_value)
            else:
                raise TypeError(f"Argument '{arg_value}' for parameter '{param_name}' is of incorrect type.")

    return args, kwargs

def run_test_case(func):
    def wrapper(test_case, expected_result):
        try:
            args, kwargs = parse_test_case(test_case, func)
            result = func(*args, **kwargs)
            # print("Expected Result:", expected_result)
            # print("Actual Result:", result)
            assert result == expected_result, "Test Failed!"
            print("Test Passed!")
        except Exception as e:
            print("Test Failed")

    return wrapper

# Find the function in the module dynamically
function_name = [name for name, obj in globals().items() if inspect.isfunction(obj)][0]
function = globals()[function_name]

# Read test case and expected result from stdin
def read_test_case_and_expected_result():
    test_case = eval(sys.argv[1].strip())  # Using eval to parse the test case list
    expected_result = eval(sys.argv[2].strip())  # Using eval to parse the expected result
    return test_case, expected_result

if __name__ == "__main__":
    test_case, expected_result = read_test_case_and_expected_result()
    run_test_case(function)(test_case, expected_result)