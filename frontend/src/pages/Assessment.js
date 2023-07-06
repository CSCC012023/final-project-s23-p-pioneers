import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';

import { javascript } from '@codemirror/lang-javascript';

function Assessment() {
  return (
    <div>
        <CodeMirror
            value="console.log('hello world!');"
            height="200px"
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
        />
    </div>
  )
}

export default Assessment