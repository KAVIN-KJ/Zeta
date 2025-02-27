import { useState } from "react"
import axios from "axios"
export default function Complier() {
    const [code, setCode] = useState("")
    const [fosi, setFosi] = useState(16)
    const [output, setOutput] = useState("")
    const [input,setInput] = useState("")
    const [language,setLanguage] = useState(null)
    const handleLanguageChange = (e)=>{
        setLanguage(e.target.value)
        setCode(localStorage.getItem(e.target.value))
        let temp = localStorage.getItem(e.target.value);
        if (temp!=null) setCode(temp)
        else setCode("")
        console.log(localStorage.getItem(e.target.value));
    }
    const handlekey = (e) => {
        if (e.key === "Tab") {
            e.preventDefault()
            const text = e.target
            const start = text.selectionStart
            const end = text.selectionEnd
            text.value = text.value.substring(0, start) + "    " + text.value.substring(end)
            text.selectionStart = text.selectionEnd = start + 4;
        }
    }
    const runCode = () => {
        localStorage.setItem(language,code)
        axios.post("http://127.0.0.1:5000/run", { "code": code,"input":input,"language":language })
            .then((response) => {
                console.log(response)
                setOutput(response.data.output)
            })
            .catch(error => console.error(error))
    }
    return (
        <div className="compiler-container">
            <div className="buttons">
                <label htmlFor="fosi">Font-Size</label>
                <input className="fosi" name="fosi" value={fosi} onChange={(e) => { setFosi(e.target.value) }} type="number" />
                <select onChange={(e)=>{
                    handleLanguageChange(e)
                    console.log(language);
                }} className="language" name="Language" id="">
                    <option value={null}>Choose Language</option>
                    <option value="py">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>
                <button onClick={localStorage.setItem(language,code)} className="save-button">Save</button>
                <button onClick={runCode} className="run-button">Run</button>

            </div>
            <textarea value={code} onChange={(e) => { setCode(e.target.value)}}
                                         style={{ fontSize: fosi + "px" }} 
                                         onKeyDown={handlekey} className="text-editor"
                                         name="" id="" placeholder="Your code here">
            </textarea>
            <div className="input-output">
                <div className="input">
                    <h3>Input</h3>
                    <textarea onChange={(e)=>{setInput(e.target.value)}}  onKeyDown={handlekey} placeholder="Enter your Inputs here" ></textarea>
                </div>
                <pre className="output">
                    <h3>Output</h3>
                    {output}</pre>
            </div>
        </div>
    )
}