import React, { useEffect, useState } from 'react'
import { db, auth, getDocument, addDocument } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import deleteIcon from './assets/delete-light.svg';
import './styles/FileList.css'
import newfile from './assets/new-file.svg'
import newfileLight from './assets/new-file-light.svg'
const FileList = (props) => {
    const [uid, setUid] = useState(localStorage.getItem("currentUser"));
    const [userDoc, setUserDoc] = useState({})
    const [loading, setLoading] = useState(false);
    const [newFile, setNewfile] = useState()
    useEffect(() => {

        const fetchDoc = async () => {
            setUid(localStorage.getItem("currentUser"))
            setLoading(true);
            const res = await getDocument(uid)
            setUserDoc(res);
            props.setFiles(res.files ? res.files : [])
            setLoading(false);
            console.log(userDoc)
        }
        fetchDoc()
    }, [])

    const openFile = (obj)=>{
        const lang = obj.filename.split(".")[1];
        props.setLanguage(lang ? lang : "txt")
        props.setCode(obj.content)
        props.setOpenfile(obj.id)
        props.setPopup(false)
        localStorage.setItem("openfile",JSON.stringify(obj))
    }

    const deleteFile = (id) => {
        const updatedList = props.files.filter(i => i.id !== id);
        props.setFiles(updatedList);
        console.log(updatedList)
    }

    const addFile = () => {
        if (props.files.length >= 10) {
            alert("Max file limit reached");
            return;
        }
        if (!newFile) {
            alert("Filename can't be empty");
            return;
        }
        const type = newFile.split(".")[1] ? newFile.split(".")[1] : "txt"
        const updatedFiles = [...props.files,
        {
            id: uuidv4(),
            filename: newFile,
            type: type,
            content: type==="py" ? "# Welcome Programmer !" : "// Welcome Programmer !"
        }
        ]
        props.setFiles(updatedFiles)
        setNewfile("");
    }

    useEffect(() => {
        const updateDoc = async () => {
            await addDocument({ uid: uid, files: props.files.length>0 ? props.files : [] })
        }
        updateDoc()
    }, [props.files, loading])

    const exitFiles = ()=>{
        console.log("Exit")
        props.setPopup(false);
    }


    return (
        <div tabIndex={0} onKeyDown={(e)=>{
            if(e.key==='Escape'){
                exitFiles()
            }
        }} className='filelist-overlay' >
            <button onClick={exitFiles} className='close-button' >close</button>
            {!loading ? (
                <div className='filelist-container'>
                    <div className='newfile' >
                        <input type="text" onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                addFile()
                            }
                        }} 
                        onChange={(e) => setNewfile(e.target.value)} 
                        placeholder='New file name' />
                        <button onClick={addFile}><img width="20px" src={newfileLight} alt="" /></button>
                    </div>
                    <div className='filelist'>
                        {
                            props.files.map((i, key) => {
                                return (
                                    <div className='file' key={key} >
                                        <span onClick={()=>openFile(i)} >{i.filename}</span>
                                        <button className='deletebutton' onClick={() => deleteFile(i.id)} ><img width="20px" src={deleteIcon} alt="" /></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
                :
                <Loading />
            }

        </div>
    )
}

export default FileList
