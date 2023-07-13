import React from 'react'
import TablaData from '../components/TablaData'
import TitleRow from '../components/TitleRow'

//Pagina de Materias
export default function Materias() {
  return (
    <div className='HomeContainer'>
      <div>
        <TitleRow tipo={window.location.pathname} />
      </div>
      <div>
        <TablaData tipo={window.location.pathname} />
      </div>
    </div>
  )
}
