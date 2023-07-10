import React, { useState } from 'react'
import './TablaDeLectura.css'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { BiSolidBookBookmark } from 'react-icons/bi'
import Form from './Form'
import Card from './Card'

function Fila({ datos, tipo, idopc}) {

    const [visible, setVisible] = useState("0");
    const [confirmacion, setConfirmacion] = useState(false);

    const prb = () => {
        setVisible("0");
    };

    const prb2 = () =>{
        setConfirmacion(false)
    } 

    if (tipo === "/Profesors") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc}/></div>
                <div><Card confirmacion={confirmacion} prb2={prb2}/></div>
                <ul className='FilasTotal'>
                    <li key={datos.profesorID} className='row'>
                        <div id='mediumSize'>{datos.profeName}</div>{" "}
                        <div id='mediumSize'>{datos.profeLastName}</div>{" "}
                        <div id='mediumSize'>{datos.profeIdentification}</div>{" "}
                        <div id='smallerSize'>{datos.profeAge}</div>{" "}
                        <div id='mediumSize'>{datos.profePhoneNumber}</div>{" "}
                        <div id='largeSize'>{datos.profeAddress}</div>{" "}
                        <div id='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div id='icono'><button className='boton'onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
                </ul>
            </div>
        );
    }
    else if (tipo === "/Materias") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc}/></div>
                <ul className='FilasTotal'>
                    <li key={datos.materiaID} className='row'>
                        <div id='mediumSize'>{datos.materiaName}</div>{" "}
                        <div id='smallSize'>{datos.materiaCode}</div>{" "}
                        <div id='largeSize'>{datos.profesorID}</div>{" "}
                        <div id='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div id='icono'><button className='boton'><h2><MdDelete /></h2></button></div>{" "}
                    </li>
                </ul>
            </div>
        );
    }
    else if (tipo === "/Reporte") {
        return (
            <ul className='FilasTotal'>
                <li key={1} className='row'>
                    <div id='smallerSize'>{datos.anhoAcademico}</div>{" "}
                    <div id='mediumSize'>{datos.identificacionEstudiante}</div>{" "}
                    <div id='mediumSize'>{datos.nombreEstudiante}</div>{" "}
                    <div id='mediumSize'>{datos.nombreMateria}</div>{" "}
                    <div id='smallSize'>{datos.codigoMateria}</div>{" "}
                    <div id='mediumSize'>{datos.identificacionProfesor}</div>{" "}
                    <div id='mediumSize'>{datos.nombreProfesor}</div>{" "}
                    <div id='smallerSize'>{datos.calificacionFinal}</div>{" "}
                    <div id='smallSize'>{datos.aprobacion ? "Aprobado" : "Reprobado"}</div>{" "}
                </li>
            </ul>
        );
    }
    else if (tipo === "/Students") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc}/></div>
                <ul className='FilasTotal'>
                    <li key={datos.studentID} className='row'>
                        <div id='mediumSize'>{datos.stuName}</div>{" "}
                        <div id='mediumSize'>{datos.stuLastName}</div>{" "}
                        <div id='mediumSize'>{datos.stuIdentification}</div>{" "}
                        <div id='smallerSize'>{datos.age}</div>{" "}
                        <div id='mediumSize'>{datos.stuPhoneNumber}</div>{" "}
                        <div id='largeSize'>{datos.stuAddress}</div>{" "}
                        <div id='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div id='icono'><button className='boton'><h2><MdDelete /></h2></button></div>{" "}
                        <div id='icono'><button className='boton'><h2><BiSolidBookBookmark /></h2></button></div>{" "}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Fila