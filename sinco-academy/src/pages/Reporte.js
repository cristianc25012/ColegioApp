import React from 'react'
import TablaData from '../components/TablaData'
import TitleRow from '../components/TitleRow'

//Pagina de Reporte
export default function Reporte() {
  return (
    <div className='HomeContainer'>
      <div>
        <TablaData tipo= {window.location.pathname}/>
      </div>
    </div>
  )
}

