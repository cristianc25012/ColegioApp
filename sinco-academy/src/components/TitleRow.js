import React, { useState } from 'react'
import './TablaDeLectura.css'
import { IoPersonAddSharp } from 'react-icons/io5'
import { MdAddBox } from 'react-icons/md'
import Card from './Card'
import Form from './Form'

function TitleRow({ tipo }) {

    const [visible, setVisible] = useState("0");

    const prb = () => {
        setVisible("0");
    };

    if (tipo === "/Profesors") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={0} tipo={tipo}/></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div id='mediumSize'>Nombres</div>{" "}
                        <div id='mediumSize'>Apellidos</div>{" "}
                        <div id='mediumSize'>Identificacion</div>{" "}
                        <div id='smallerSize'>Edad</div>{" "}
                        <div id='mediumSize'>Telefono</div>{" "}
                        <div id='largeSize'>Dirección</div>{" "}
                        <div id='Icono'><button className='boton3' onClick={() => setVisible("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }
    else if (tipo === "/Students") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} tipo={tipo} /></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div id='mediumSize'>Nombres</div>{" "}
                        <div id='mediumSize'>Apellidos</div>{" "}
                        <div id='mediumSize'>Identificacion</div>{" "}
                        <div id='smallerSize'>Edad</div>{" "}
                        <div id='mediumSize'>Telefono</div>{" "}
                        <div id='largeSize'>Dirección</div>{" "}
                        <div id='largeIcono'><button className='boton3' onClick={() => setVisible("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }
    else if (tipo === "/Materias") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} tipo={tipo} /></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div id='mediumSize'>Nombre</div>{" "}
                        <div id='smallSize'>Codigo</div>{" "}
                        <div id='largeSize'>Profesor Asignado</div>{" "}
                        <div id='Icono'><button className='boton3' onClick={() => setVisible("Crear")}><h2><MdAddBox /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }
    else if (tipo === "/Reporte") {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div id='smallerSize'>Año</div>{" "}
                    <div id='mediumSize'>Identificacion del Estudiante</div>{" "}
                    <div id='mediumSize'>Nombre del Estudiante</div>{" "}
                    <div id='mediumSize'>Nombre de la Materia</div>{" "}
                    <div id='smallSize'>Codigo Materia</div>{" "}
                    <div id='mediumSize'>Identificacion del Profesor</div>{" "}
                    <div id='mediumSize'>Nombre del Profesor</div>{" "}
                    <div id='smallerSize'>Nota Final</div>{" "}
                    <div id='smallSize'>Estado</div>{" "}
                </li>
            </div>
        );
    }
}

export default TitleRow