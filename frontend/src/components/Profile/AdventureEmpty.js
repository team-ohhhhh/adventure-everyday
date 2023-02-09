import style from "./AdventureEmpty.module.css"
import { BsPlusCircle } from 'react-icons/bs'


const AdventureEmpty = function({text}){
  
  return(
    <div className={style.banner}>
      <div style={{marginBottom:"10px"}}>{text}</div>
      <BsPlusCircle className={style.plus}/>
    </div>
  )
}

export default AdventureEmpty