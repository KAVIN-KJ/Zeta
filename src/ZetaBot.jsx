import { useState, useEffect } from "react";
import './App.css'
import axios from "axios";
import ReactMarkdown from 'react-markdown'
export default function ZetaBot() {
    const [response, setResponse] = useState("")
    const [prompt, setPrompt] = useState("")

    const postRequest = () => {
        axios.post("http://127.0.0.1:5000/zetaBot", { code: "", prompt: prompt })
            .then((res) => {
                setResponse(res.data.response)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="ZetaBot">
            <pre className="Message">
                <ReactMarkdown children={response} />
                {/* {response} */}
            </pre>
            <div className="input-prompt">
                <input  onChange={(e) => setPrompt(e.target.value)} type="text" name="" id="" />
                <button onClick={postRequest} >Post</button>
            </div>
        </div>
    )
}