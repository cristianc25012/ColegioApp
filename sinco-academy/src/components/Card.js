import React from 'react'
import './Card.css'
import axios from 'axios'

function Card({ confirmacion, prb2, tipo, idopc }) {

    const deleteRecord = () => {
        try {

            axios.delete("http://localhost:5006/api" + tipo + "/" + idopc)
                .then(prb2, window.location.reload(true));

        } catch (error) {
            console.log('rs', error.r.data);
            console.log('http', error.r.status);
            console.log('es', error.message);
        }
    }

    if (confirmacion === true) {
        return (
            <div className='PanelBlur'>
                <div className='TablaFormulario'>
                    <div className='CardTitle'><div id='title'>Eliminar Registro</div></div>
                    <div className='mensaje'>
                        Desea eliminar este registro?
                    </div>
                    <div className='botones'>
                        <button className='boton2' onClick={() => deleteRecord()}>Guardar</button>
                        <button className='boton2 cancelar' onClick={prb2}>Cancelar</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Card