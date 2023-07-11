import React, { useEffect, useState } from 'react'
import './TablaDeLectura.css'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { BiSolidBookBookmark } from 'react-icons/bi'
import Form from './Form'
import Card from './Card'
import axios from 'axios'

function Fila({ datos, tipo, idopc}) {

    const [visible, setVisible] = useState("0");
    const [confirmacion, setConfirmacion] = useState(false);
    const [info, setInfo] = useState([]);
    
    useEffect(() => {
        if(tipo==="/Materias")
        {
            axios.get("http://localhost:5006/api/Profesors/" + datos.profesorID)
            .then((response) => { setInfo((response.data)) })
            .catch((err) => console.log(err));
        }
    }, []);

    const prb = () => {
        setVisible("0");
    };

    const prb2 = () => {
        setConfirmacion(false)
    }

    if (tipo === "/Profesors") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} prb2={prb2} tipo={tipo} idopc={idopc} /></div>
                <li key={datos.profesorID} className='row'>
                        <div className='mediumSize'>{datos.profeName}</div>{" "}
                        <div className='mediumSize'>{datos.profeLastName}</div>{" "}
                        <div className='mediumSize'>{datos.profeIdentification}</div>{" "}
                        <div className='smallerSize'>{datos.profeAge}</div>{" "}
                        <div className='mediumSize'>{datos.profePhoneNumber}</div>{" "}
                        <div className='largeSize'>{datos.profeAddress}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
    else if (tipo === "/Materias") {


        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} prb2={prb2} tipo={tipo} idopc={idopc} /></div>
                    <li key={datos.materiaID} className='row'>
                        <div className='mediumSize'>{datos.materiaName}</div>{" "}
                        <div className='smallSize'>{datos.materiaCode}</div>{" "}
                        <div className='largerSize'>{info.profeName} {info.profeLastName}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
    else if (tipo === "/Reporte") {
        return (
                <li key={1} className='row'>
                    <div className='smallerSize'>{datos.anhoAcademico}</div>{" "}
                    <div className='mediumSize'>{datos.identificacionEstudiante}</div>{" "}
                    <div className='mediumSize'>{datos.nombreEstudiante}</div>{" "}
                    <div className='mediumSize'>{datos.nombreMateria}</div>{" "}
                    <div className='smallSize'>{datos.codigoMateria}</div>{" "}
                    <div className='mediumSize'>{datos.identificacionProfesor}</div>{" "}
                    <div className='mediumSize'>{datos.nombreProfesor}</div>{" "}
                    <div className='smallerSize'>{datos.calificacionFinal}</div>{" "}
                    <div className='smallSize'>{datos.aprobacion ? "Aprobado" : "Reprobado"}</div>{" "}
                </li>
        );
    }
    else if (tipo === "/Students") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} prb2={prb2} tipo={tipo} idopc={idopc} /></div>
                    <li key={datos.studentID} className='row'>
                        <div className='mediumSize'>{datos.stuName}</div>{" "}
                        <div className='mediumSize'>{datos.stuLastName}</div>{" "}
                        <div className='mediumSize'>{datos.stuIdentification}</div>{" "}
                        <div className='smallerSize'>{datos.age}</div>{" "}
                        <div className='mediumSize'>{datos.stuPhoneNumber}</div>{" "}
                        <div className='largeSize'>{datos.stuAddress}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setVisible("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                        <div className='icono'><button className='boton historial' onClick={()=>setVisible("Calificar")}><h2><BiSolidBookBookmark /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
    else if (tipo === "/HistorialAcademicoes") {
        return (
            <div>
                <div><Form visible={visible} prb={prb} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} prb2={prb2} tipo={tipo} idopc={idopc} /></div>   
                    <li key={1} className='row'>
                        <div className='smallerSize'>{datos.year}</div>{" "}
                        <div className='mediumSize'>{datos.studentID}</div>{" "}
                        <div className='smallSize'>{datos.materiaID}</div>{" "}
                        <div className='smallerSize'>{datos.grade}</div>{" "}
                        <div className='smallSize'>{datos.calificacionFinal > 3 ? "Aprobado" : "Reprobado"}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setVisible("Calificar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
}

export default Fila