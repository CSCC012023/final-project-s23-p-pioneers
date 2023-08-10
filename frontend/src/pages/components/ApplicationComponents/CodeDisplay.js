import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { gml } from "react-syntax-highlighter/dist/esm/styles/hljs";

const PythonCodeBlock = ({ code }) => {
  return (
    <div>
      <SyntaxHighlighter
        language="python"
        style={gml}
        customStyle={{ height: "100vh" }}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const CodeDisplay = ({ appCode }) => {
  return (
    <div>
      <PythonCodeBlock
        code={appCode.code ? appCode.code : "Code Not Submitted"}
      />
    </div>
  );
};

export default CodeDisplay;
