import React, { useRef, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import './Assessment.css'

function Assessment() {
  const elementRef = useRef(null);
  const [totalPixels, setTotalPixels] = useState({ width: 0, height: 0 });
  const [inputValue, setInputValue] = useState('');// This is where the problem goes

  const submitCode = () => {
    console.log(inputValue)
  }
  

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const width = window.innerWidth / 2;
      const height = window.innerHeight;
      setTotalPixels({ width, height });
    }
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <div className='container'>
      <div className="description">
        <h1>Hello</h1>
      </div>
      <div className='codeUI'>
        <CodeMirror
          value={inputValue}
          onChange={handleInputChange}
          height={`${totalPixels.height}px`}
          width={`${totalPixels.width}px`}
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          ref={elementRef}
        />
        <div className='submit' onClick={submitCode}>Submit</div>
      </div>
    </div>
  );
}

export default Assessment;
