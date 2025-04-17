import { useEffect, useState } from "react";
import axios from "axios";
import CodeMirror, { hoverTooltip } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import Loading from "./Loading";
import ZetaBot from "./ZetaBot";
import { addDocument, auth } from "./firebase";
import { signOut } from "firebase/auth";
import FileList from "./FileList";

export default function Compiler() {
    const url = import.meta.env.VITE_VM_HOST
    const [code, setCode] = useState("");
    const [fosi, setFosi] = useState(16);
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("js");
    const [theme, setTheme] = useState("dark")
    const [loading, setLoading] = useState(false)
    const [popup,setPopup] = useState(false)
    const [files, setFiles] = useState([])
    const [openFile,setOpenfile] = useState(files[0]?.id)
    const [openFilename,setOpenFileName] = useState("Untitled");

    const saveFile = async () => {
        localStorage.setItem(language, code);
        let obj = files.find(file => file.id===openFile);
        obj.content = code;
        console.log(obj)
        const updatedFiles = files.map(file=>
            file.id===openFile ? {...file,content:code} : file
        );
        setFiles(updatedFiles);

        // await addDocument(obj)
    }

    useEffect(()=>{
        const setOpen = ()=>{
            const file = files.find(file=> file.id===openFile)
            if(file&& file.filename){
                setOpenFileName(file.filename);
                console.log(file.filename)
            }
            else{
                setOpenFileName(files[0]?.filename)
            }
        }
        setOpen()
    },[openFile])

    useEffect(() => {
            const updateDoc = async () => {
                if(files.length>0)
                    await addDocument({ uid: localStorage.getItem("currentUser"), files:files })
            }
            updateDoc()
        }, [files, loading])
    


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


    const switchTheme = () => {
        theme == "light" ? setTheme("dark") : setTheme("light")
    }

    const logout = async () =>{
        try{
            await signOut(auth);
            localStorage.clear("currentUser")
        }
        catch(e){
            console.error(e)
        }
        finally{
            window.location.reload();
        }
    }

    const runCode = () => {
        localStorage.setItem(language, code)
        setLoading(true)
        saveFile()
        axios.post(url + "/run", { "code": code, "input": input, "language": language })
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
                <h3 className="filename-heading" >{openFilename}</h3>
                <div className="button-group">
                <label htmlFor="fosi">Font-Size</label>
                <input className="fosi" name="fosi" value={fosi} onChange={(e) => { setFosi(e.target.value) }} type="number" />
                <button onClick={switchTheme} className={"theme-button-" + theme} >Switch to {theme == "dark" ? "light theme" : "dark theme"}</button>
                <button onClick={() => saveFile()} className="save-button">Save</button>
                <button onClick={()=>setPopup(true)} className="files-button" >Files</button>
                <button onClick={runCode} className="run-button">Run</button>
                <button onClick={logout} className="logout-button" >Logout</button>
                </div>
 
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
                    <ZetaBot code={code} />
                </div>
            </div>
            <div className="input-output">
                <div className="input">
                    <h3>Input</h3>
                    <textarea onChange={(e) => { setInput(e.target.value) }} placeholder="Enter your Inputs here" ></textarea>
                </div>
                <div className="output">
                    <h3>Output</h3>
                    <pre>
                        {loading ? <Loading /> : output}
                    </pre>
                </div>
            </div>
            {
                popup && <FileList setOpenfile={setOpenfile} files={files} setFiles={setFiles} setLanguage={setLanguage} setCode={setCode} setPopup={setPopup} />
            }
            
        </div>
    )
}