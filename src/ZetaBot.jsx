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
    const [loading,setLoading] = useState(false)
    const url = import.meta.env.VITE_VM_HOST
    const postRequest = () => {
        setLoading(true)
        axios.post(url+"/zetaBot", { code: props.code, prompt: prompt })
            .then((res) => {
                setResponse(res.data.response)
            })
            .catch(error => console.error(error))
            .finally(()=>setLoading(false))
    }

    return (
        <div className="ZetaBot">
            <pre className="Message">
                {loading ? <Loading/> :  <ReactMarkdown children={response} />}
               
                {/* {response} */}
            </pre>
            <div className="input-prompt">
                <input  onChange={(e) => setPrompt(e.target.value)} type="text" name="" id="" />
                <button onClick={postRequest} > <img width={30} src={sendLight} alt="" /> </button>
            </div>
        </div>
    )
}