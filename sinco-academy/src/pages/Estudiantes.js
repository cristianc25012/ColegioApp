import React from 'react'
import TablaData from '../components/TablaData'
import TitleRow from '../components/TitleRow'

//Pagina de Estudiantes
function Estudiantes() {
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

export default Estudiantes