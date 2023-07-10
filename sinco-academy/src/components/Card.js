import React from 'react'
import './TablaDeLectura.css'

function Card({ confirmacion, prb2 }) {

    if (confirmacion === true) {
        return (
            <div className='PanelBlur'>
                <div className='TablaDeLectura'>
                    <div className='CardTitle'><div id='title'>Eliminar Registro</div></div>
                    <div>
                        Desea Eliminar?
                    </div>
                    <button className='boton4'>Guardar</button>
                    <button className='boton4 cancelar' onClick={prb2}>Cancelar</button>
                </div>
            </div>
        )
    }
}

export default Card