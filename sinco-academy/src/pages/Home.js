import React, { useState } from 'react'
import './pages.css'
import Card from '../components/Card'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'

export default function Home() {
  const [active, setActive] = useState("false");
  return (
    <div className='HomeContainer'>
        <div>
        {active === "false" && <button onClick={() => setActive("true")} className='boton'><h2><RiEdit2Fill /></h2></button>}
        {active === "true" &&<button onClick={() => setActive("false")} className='boton'><h2><MdDelete /></h2></button>}
        </div>
      <div>
        {active === "true" && <Card />}
      </div>
    </div>
  )
}
