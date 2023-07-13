import React from 'react'
import './Card.css'
import axios from 'axios'

//Este componente dibuja un panel de confirmacion sobre la pagina, con el objetivo de realizar una segunda verificación
//antes de eliminar un registro, este componente recibe un boolean 'confirmacion' el cual se utiliza para mostrar el
//panel en caso de que sea true, también recibe una función esconderConf que asigna la confirmación en false al ser invocada y 
//por lo tanto esconde el panel.
//El tipo y el idopc se utilizan para completar la url, donde el tipo representa la tabla y el idopc representa el id del
//registro a eliminar
function Card({ confirmacion, esconderConf, tipo, idopc }) {

    //Esta sección elimina el registro seleccionado
    const deleteRecord = () => {
        axios.delete("http://localhost:5006/api" + tipo + "/" + idopc)
            .catch(err => alert(err.response.data.substring(err.response.data.indexOf('at'), 18).trim()))
            .then(esconderConf, window.location.reload(true));
    }

    //Esta seccion dibuja el conponente que sirve como panel de confirmacion en caso de que el prop confirmacion se true
    if (confirmacion === true) {
        return (
            <div className='PanelBlur'>
                <div className='TablaFormulario'>
                    <div className='CardTitle'><div id='title'>Eliminar Registro</div></div>
                    <div className='mensaje'>
                        Desea eliminar este registro?
                    </div>
                    <div className='botones'>
                        <button className='boton2' onClick={() => deleteRecord()}>Confirmar</button>
                        <button className='boton2 cancelar' onClick={esconderConf}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card