import React, { useState } from 'react'
import Fila from "./Fila"
import './TablaDeLectura.css'

//Este componente crea una tabla y mapea los datos recibidos dentro de los componentes filas.
//Este componente dibuja una fila por cada mapeo de la data obtenida. 
//Este componente recibe los datos desde el componente TablaData mediante el prop getData
//El tipo de tabla indica que controlador se esta usando para obtener los datos
function Tabla({ getData, tipo, reloadComponent}) {

    return (
        <div className='TablaDeLectura'>
            <ul className='FilasTotal'>
            {getData.map((val, key) => {
            return (
                <div key={key}>
                    <Fila idopc={(tipo === "/Profesors") ? val.profesorID :
                                 (tipo === "/Students") ? val.studentID :
                                 (tipo === "/Materias") ? val.materiaID : key}
                    datos={val} tipo={tipo} reloadComponent={reloadComponent}/>
                </div>
            )})}
            </ul>
       </div>
    )
}

export default Tabla