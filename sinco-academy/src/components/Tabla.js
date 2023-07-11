import React, { useState } from 'react'
import Fila from "./Fila"
import './TablaDeLectura.css'

function Tabla({ getData, tipo}) {

    return (
        <div className='TablaDeLectura'>
            <ul className='FilasTotal'>
            {getData.map((val, key) => {
            return (
                <div key={key}>
                    <Fila idopc={(tipo === "/Profesors") ? val.profesorID :
                    (tipo === "/Students") ? val.studentID :
                        (tipo === "/Materias") ? val.materiaID : key}
                    datos={val} tipo={tipo}/>
                </div>
            )})}
            </ul>
       </div>
    )
}

export default Tabla