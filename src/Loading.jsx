import './App.css'
import spinner from './assets/spinner-of-dots.png'
export default function Loading(){
    return(
        <div style={{width:"100%",height:"70%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img className='loading-image' src={spinner} alt="" />
        </div>
    )
}