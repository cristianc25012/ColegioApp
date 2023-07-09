import React from 'react'
import Test from '../components/TablaData'
import TitleRow from '../components/TitleRow'


function Estudiantes() {
  return (
    <div className='HomeContainer'>
      <div>
        <TitleRow tipo={window.location.pathname} />
      </div>
      <div>
        <Test tipo={window.location.pathname} />
      </div>
    </div>
  )
}

export default Estudiantes