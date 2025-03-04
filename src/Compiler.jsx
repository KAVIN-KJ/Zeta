import { useState } from "react";
import axios from "axios";
import CodeMirror, { hoverTooltip } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import Loading from "./Loading";

export default function Compiler() {
    const [code, setCode] = useState("");
    const [fosi, setFosi] = useState(16);
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("js");
    const [theme, setTheme] = useState("dark")
    const [loading, setLoading] = useState(false)

    const getLanguage = () => {
        switch (language) {
            case "py":
                return python();
            case "java":
                return java();
            case "cpp":
                return cpp();
            case "js":
                return javascript();
            default:
                return [];
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
        localStorage.setItem("CurrentLang",e.target.value)
        setCode(localStorage.getItem(e.target.value))
        let temp = localStorage.getItem(e.target.value);
        if (temp != null) setCode(temp)
        else setCode("")
        console.log(localStorage.getItem(e.target.value));
    }

    const switchTheme = () => {
        theme == "light" ? setTheme("dark") : setTheme("light")
    }

    const runCode = () => {
        localStorage.setItem(language, code)
        setLoading(true)
        axios.post("http://127.0.0.1:5000/run", { "code": code, "input": input, "language": language })
            .then((response) => {
                console.log(response)
                setOutput(response.data.output)
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }
    return (
        <div className="compiler-container">
            <div className="buttons">
                <label htmlFor="fosi">Font-Size</label>
                <input className="fosi" name="fosi" value={fosi} onChange={(e) => { setFosi(e.target.value) }} type="number" />
                <select onChange={(e) => {
                    handleLanguageChange(e)
                    console.log(language);
                }} className="language" name="Language" id="">
                    <option value={null}>Choose Language</option>
                    <option value="py">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>
                <button onClick={switchTheme} className={"theme-button-" + theme} >Switch to {theme == "dark" ? "light theme" : "dark theme"}</button>
                <button onClick={() => localStorage.setItem(language, code)} className="save-button">Save</button>
                <button onClick={runCode} className="run-button">Run</button>

            </div>
            <div className="code-editor-chatbox">
                <CodeMirror
                    height="100%"
                    value={code}
                    theme={theme}
                    className="text-editor"
                    extensions={[getLanguage()]}
                    onChange={(value) => setCode(value)}
                    style={{ animation: "none", fontSize: `${fosi}px` }}
                />
                <div className="chat-bot">
                        {localStorage.getItem(localStorage.getItem("CurrentLang"))}
                </div>
            </div>
            <div className="input-output">
                <div className="input">
                    <h3>Input</h3>
                    <textarea onChange={(e) => { setInput(e.target.value) }} placeholder="Enter your Inputs here" ></textarea>
                </div>
                <pre className="output">
                    <h3>Output</h3>
                    {loading ? <Loading /> : output}
                </pre>
            </div>
        </div>
    )
}