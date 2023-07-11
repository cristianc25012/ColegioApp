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
                        <div className='mediumSize'>Nombres</div>{" "}
                        <div className='mediumSize'>Apellidos</div>{" "}
                        <div className='mediumSize'>Identificacion</div>{" "}
                        <div className='smallerSize'>Edad</div>{" "}
                        <div className='mediumSize'>Telefono</div>{" "}
                        <div className='largeSize'>Dirección</div>{" "}
                        <div className='mediumIcono'><button className='boton add' 
                        onClick={() => setVisible("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
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
                        <div className='mediumSize'>Nombres</div>{" "}
                        <div className='mediumSize'>Apellidos</div>{" "}
                        <div className='mediumSize'>Identificacion</div>{" "}
                        <div className='smallerSize'>Edad</div>{" "}
                        <div className='mediumSize'>Telefono</div>{" "}
                        <div className='largeSize'>Dirección</div>{" "}
                        <div className='largeIcono'><button className='boton add' 
                        onClick={() => setVisible("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
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
                        <div className='mediumSize'>Nombre</div>{" "}
                        <div className='smallSize'>Codigo</div>{" "}
                        <div className='largerSize'>Profesor Asignado</div>{" "}
                        <div className='mediumIcono'><button className='boton add'
                         onClick={() => setVisible("Crear")}><h2><MdAddBox /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }
    else if (tipo === "/Reporte") {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div className='smallerSize'>Año</div>{" "}
                    <div className='mediumSize'>Identificacion del Estudiante</div>{" "}
                    <div className='mediumSize'>Nombre del Estudiante</div>{" "}
                    <div className='mediumSize'>Nombre de la Materia</div>{" "}
                    <div className='smallSize'>Codigo Materia</div>{" "}
                    <div className='mediumSize'>Identificacion del Profesor</div>{" "}
                    <div className='mediumSize'>Nombre del Profesor</div>{" "}
                    <div className='smallerSize'>Nota Final</div>{" "}
                    <div className='smallSize'>Estado</div>{" "}
                </li>
            </div>
        );
    }
    else if (tipo === "/HistorialAcademicoes") {
        return (
            <div className='TablaDeTitulo'>
                <li className='TitleRow'>
                    <div className='smallerSize'>Año</div>{" "}
                    <div className='mediumSize'>Identificacion del Estudiante</div>{" "}
                    <div className='smallSize'>Codigo Materia</div>{" "}
                    <div className='smallerSize'>Nota Final</div>{" "}
                    <div className='smallSize'>Estado</div>{" "}
                    <div className='mediumIcono'><button className='boton add' 
                    onClick={() => setVisible("Crear")}><h2><MdAddBox /></h2></button></div>{" "}
                </li>
            </div>
        );
    }
}

export default TitleRow