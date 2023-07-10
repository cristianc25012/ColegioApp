import React, { useState } from 'react'
import './pages.css'
import Form from '../components/Form'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'

export default function Home() {
  
  const [visible, setVisible ] = useState("0");
            
  const prb = () => {
      setVisible("0");
  };

  return (
    <div className='HomeContainer'>
      <div>
      <button onClick={()=>setVisible("Editar")} className='boton'><h2><RiEdit2Fill /></h2></button>
      <button onClick={()=>setVisible("Crear")} className='boton'><h2><MdDelete /></h2></button>
      </div>
      <div>
      {/* {visible==="Editar" && <Form visible={visible} prb={prb}/>} */}
      </div>
    </div>
  )
}
