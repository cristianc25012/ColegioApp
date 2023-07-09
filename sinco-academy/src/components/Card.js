import React from 'react'
import './TablaDeLectura.css'

function Card() {
    return (
        <div className='TablaDeLectura'>
            <ul className='ColumnasTotal'>
                <li className='column'>
                    <div id='header'>Nombres</div>{" "}
                    <div id='header'>Apellidos</div>{" "}
                    <div id='header'>Identificacion</div>{" "}
                    <div id='header'>Edad</div>{" "}
                    <div id='header'>Telefono</div>{" "}
                    <div id='header'>Dirección</div>{" "}
                </li>
                <li className='column'>
                    <input id='campo'></input>{" "}
                    <div id='campo'>Apellidos</div>{" "}
                    <div id='campo'>Identificacion</div>{" "}
                    <div id='campo'>Edad</div>{" "}
                    <div id='campo'>Telefono</div>{" "}
                    <div id='campo'>Dirección</div>{" "}
                </li>
            </ul>
            <li className='row'>
                    <div id='campo'>Nombres</div>{" "}
                    <div id='campo'>Apellidos</div>{" "}
            </li>
        </div>
    )
}

export default Card