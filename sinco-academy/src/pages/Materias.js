import React from 'react'
import Test from '../components/TablaData'
import TitleRow from '../components/TitleRow'

export default function Materias() {
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
