import React, { useEffect, useState } from 'react'
import './TablaDeLectura.css'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { BiSolidBookBookmark } from 'react-icons/bi'
import Form from './Form'
import Card from './Card'
import axios from 'axios'

//Este componente dibuja los elementos dentro de cada fila dependiendo el tipo de tabla 
//El tipo de tabla se recibe como prop, este dato se obtiene del pathname que invoco la tabla
//Este componente recibe un arreglo de datos los cuales se dibujan dentro de la fila
//idopc representa el ID de los datos obtenidos
function Fila({ datos, tipo, idopc, reloadComponent}) {

    //Estos estados se utilizan para determinar el tipo de formulario que se dibujará al oprimir un boton en la fila,
    //confirmar si el usuario desea eliminar un registro y entregar información adicional a la recibida como prop según 
    //se requiera
    const [formularioTipo, setTipoFormulario] = useState("0");
    const [confirmacion, setConfirmacion] = useState(false);
    const [info, setInfo] = useState([]);

    
    //Esta funcion permite obtener los datos de los profesores desde la página de materias con el objetivo de cambiar el ID
    //del profesor asignado por el nombre y apellido de los mismos, facilitando la lectura del usuario
    useEffect(() => {
        if(tipo==="/Materias")
        {
            axios.get("http://localhost:5006/api/Profesors/" + datos.profesorID)
            .then((response) => { setInfo((response.data)) })
            .catch((err) => console.log(err));
        }
    }, []);

    useEffect(() => {
        reloadComponent(formularioTipo);
    }, [formularioTipo]);

    //Funcion que regresa el tipo de formulario a valor sin usar, escondiendo el formulario en el proceso
    function esconderForm(){
        setTipoFormulario("0"); 
    };

    //Función que esconde el cuadro de confirmación
    const esconderConf = () => {
        setConfirmacion(false)
        reloadComponent("esconderConf");
    }

    function cambiarForm(stf){
        setTipoFormulario(stf);
    }

    //Esta seccion dibujo los datos del profesor obtenido dentro de la fila 
    if (tipo === "/Profesors") {
        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} esconderConf={esconderConf} tipo={tipo} idopc={idopc} /></div>
                <li key={datos.profesorID} className='row'>
                        <div className='mediumSize'>{datos.profeName}</div>{" "}
                        <div className='mediumSize'>{datos.profeLastName}</div>{" "}
                        <div className='mediumSize'>{datos.profeIdentification}</div>{" "}
                        <div className='smallerSize'>{datos.profeAge}</div>{" "}
                        <div className='mediumSize'>{datos.profePhoneNumber}</div>{" "}
                        <div className='largeSize'>{datos.profeAddress}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => cambiarForm("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }

    
    //Esta seccion dibujo los datos de la materia obtenida dentro de la fila 
    else if (tipo === "/Materias") {

        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} esconderConf={esconderConf} tipo={tipo} idopc={idopc} /></div>
                    <li key={datos.materiaID} className='row'>
                        <div className='mediumSize'>{datos.materiaName}</div>{" "}
                        <div className='smallSize'>{datos.materiaCode}</div>{" "}
                        <div className='largerSize'>{info.profeName} {info.profeLastName}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setTipoFormulario("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
    
    //Esta seccion dibuja los datos del reporte obtenido dentro de la fila 
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
    
    //Esta seccion dibujo los datos del estudiante obtenido dentro de la fila 
    else if (tipo === "/Students") {
        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} data={datos} tipo={tipo} idopc={idopc} /></div>
                <div><Card confirmacion={confirmacion} esconderConf={esconderConf} tipo={tipo} idopc={idopc} /></div>
                    <li key={datos.studentID} className='row'>
                        <div className='mediumSize'>{datos.stuName}</div>{" "}
                        <div className='mediumSize'>{datos.stuLastName}</div>{" "}
                        <div className='mediumSize'>{datos.stuIdentification}</div>{" "}
                        <div className='smallerSize'>{datos.age}</div>{" "}
                        <div className='mediumSize'>{datos.stuPhoneNumber}</div>{" "}
                        <div className='largeSize'>{datos.stuAddress}</div>{" "}
                        <div className='icono'><button className='boton' onClick={() => setTipoFormulario("Editar")}><h2><RiEdit2Fill /></h2></button></div>{" "}
                        <div className='icono'><button className='boton borrar' onClick={() => setConfirmacion(true)}><h2><MdDelete /></h2></button></div>{" "}
                        <div className='icono'><button className='boton historial' onClick={()=>setTipoFormulario("Calificar")}><h2><BiSolidBookBookmark /></h2></button></div>{" "}
                    </li>
            </div>
        );
    }
}

export default Fila