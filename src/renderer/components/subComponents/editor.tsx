
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Box } from "@mui/material";

import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
  "rat"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const defaultValue = '';
const Editor=()=> {
 const onLoad =() => {
    console.log("i've loaded");
  }
 const onChange =(newValue:String)=> {
    console.log("change", newValue);
  window.electron.ipcRenderer.writeFile(newValue);
  }

 const onSelectionChange =(newValue:String, event:any) => {
    console.log("select-change", newValue);
    console.log("select-change-event", event);
  }

 const onCursorChange =(newValue:String, event:any)=> {
    console.log("cursor-change", newValue);
    console.log("cursor-change-event", event);
  }

 const onValidate =(annotations:any)=> {
    console.log("onValidate", annotations);
  }

  const [value, setValue] = useState(defaultValue);
  const [placeholder, setPlaceholder] = useState("Placeholder Text");
  const [theme, setTheme] = useState("rat");
  const [mode, setMode] = useState("javascript");

  const [enableBasicAutocompletion, setEnableBasicAutocompletion] = useState(true);
  const [enableLiveAutocompletion, setEnableLiveAutocompletion] = useState(true);
  const [enableSnippets, setEnableSnippets] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [highlightActiveLine, setHighlightActiveLine] = useState(true);

  const [fontSize, setFontSize] = useState(14);
  
  useEffect(()=>{
    window.electron.ipcRenderer.on('show-file',(arg:any)=>{
      console.log(arg);
        setMode(arg);
    })

    window.electron.ipcRenderer.on('load-file',(arg:any)=>{
      console.log(arg);
      setValue(arg);
    })
  })

    return (
        <Box sx={{gridArea:'file',borderRadius:'5px'}}>
          <AceEditor
            mode={mode}
            theme={theme}
            name="blah2"
            height="100%"
            width="100%"
            onLoad={onLoad}
            onChange={onChange}
            onSelectionChange={onSelectionChange}
            onCursorChange={onCursorChange}
            onValidate={onValidate}
            value={value}
            fontSize={fontSize}
            highlightActiveLine={highlightActiveLine}
            commands={[{
              name:"change-fontSize-plus",
              bindKey:{win: "Ctrl-Q", mac:"Command-Q"},
              exec:()=>{setFontSize(fontSize+1)}
            },
            {
              name:"change-fontSize-minus",
              bindKey:{win: "Ctrl-E", mac:"Command-E"},
              exec:()=>{setFontSize(fontSize-1)}
            },
          ]}
            setOptions={{
              enableLiveAutocompletion: enableLiveAutocompletion,
              enableSnippets:enableSnippets,
              showLineNumbers: showLineNumbers,
              vScrollBarAlwaysVisible: false,
              tabSize: 2,
              enableEmmet:true,
              printMargin: false,
              selectionStyle: 'line',
              behavioursEnabled: true,
              wrapBehavioursEnabled: true,
              autoScrollEditorIntoView: true,
              wrap: true
            }}
          />
        </Box>
    );
}


export default Editor