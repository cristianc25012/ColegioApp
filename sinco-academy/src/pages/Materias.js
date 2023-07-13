import React from 'react'
import TablaData from '../components/TablaData'
import TitleRow from '../components/TitleRow'

//Pagina de Materias
export default function Materias() {
  return (
    <div className='HomeContainer'>
      <div>
        <TablaData tipo={window.location.pathname} />
      </div>
    </div>
  )
}
