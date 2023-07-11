import React, { useState } from 'react'
import TablaData from '../components/TablaData'
import TitleRow from '../components/TitleRow'

export const Historial = () => {

  return (
    <div className='HomeContainer'>
      <div>
        <TitleRow tipo={window.location.pathname} />
      </div>
      <div>
        <TablaData tipo={window.location.pathname}/>
      </div>
    </div>
  )
}
