import { useState, useEffect } from "react";
import './App.css'
import axios from "axios";
import { configDotenv } from "dotenv";
import ReactMarkdown from 'react-markdown'
import sendLight from './assets/send-button-white.svg'
import Loading from "./Loading";
export default function ZetaBot(props) {
    const [response, setResponse] = useState("")
    const [prompt, setPrompt] = useState("")
    const [useCode, setUseCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [convo, setConvo] = useState([{}]);
    const url = import.meta.env.VITE_VM_HOST
    const postRequest = () => {
        setLoading(true)
        setConvo(convo => [...convo, { content: prompt, role: "user" }]);
        setPrompt("");
        axios.post(url + "/zetaBot", { code: useCode ? props.code : "", prompt: prompt })
            .then((res) => {
                setResponse(res.data.response)
                setConvo(convo => [...convo, { content: res.data.response, role: "bot" }])
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <div className="ZetaBot">
            <pre className="Message">
                {convo.map((msg, key) => {
                    if (msg.content)
                        if (msg.role == "user") {
                            return (<div className={"message-" + msg.role} style={{ width: "100%" }} key={key}><div className="message-user-content" >{msg.content}</div></div>)
                        }
                        else {
                            return (
                                <div key={key} className={"message-" + msg.role} >
                                    {
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    }
                                </div>
                            );
                        }
                })

                }
            </pre>
            <div className="input-prompt">
                <input onChange={(e) => { setUseCode(e.target.checked) }} className="code-check" name="code-context" type="checkbox" />
                <label htmlFor="code-context">Use code</label>
                <input value={prompt} className="prompt-input" onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        postRequest();
                    }
                }} onChange={(e) => setPrompt(e.target.value)} type="text" name="" id="" />
                {
                    loading ? <Loading style={{border:"1px solid"}} /> : <button onClick={postRequest} > <img width={30} src={sendLight} alt="" /> </button>
                }
                
            </div>
        </div>
    )
}