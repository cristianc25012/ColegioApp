import React from 'react'
import './TablaDeLectura.css'
import {IoPersonAddSharp} from 'react-icons/io5'
import {MdAddBox} from 'react-icons/md'

function TitleRow({ tipo }) {
    if (tipo === "/Profesors") {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div id='mediumSize'>Nombres</div>{" "}
                    <div id='mediumSize'>Apellidos</div>{" "}
                    <div id='mediumSize'>Identificacion</div>{" "}
                    <div id='smallerSize'>Edad</div>{" "}
                    <div id='mediumSize'>Telefono</div>{" "}
                    <div id='largeSize'>Dirección</div>{" "}
                    <div id='Icono'><h2><IoPersonAddSharp /></h2></div>{" "}
                </li>
            </div>
        );
    }
    else if (tipo === "/Students" ) {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div id='mediumSize'>Nombres</div>{" "}
                    <div id='mediumSize'>Apellidos</div>{" "}
                    <div id='mediumSize'>Identificacion</div>{" "}
                    <div id='smallerSize'>Edad</div>{" "}
                    <div id='mediumSize'>Telefono</div>{" "}
                    <div id='largeSize'>Dirección</div>{" "}
                    <div id='largeIcono'><h2><IoPersonAddSharp /></h2></div>{" "}
                </li>
            </div>
        );
    }
    else if (tipo === "/Materias") {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div id='mediumSize'>Nombre</div>{" "}
                    <div id='smallSize'>Codigo</div>{" "}
                    <div id='largeSize'>Profesor Asignado</div>{" "}
                    <div id='Icono'><h2><MdAddBox /></h2></div>{" "}
                </li>
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