import React, { useState } from 'react'
import './TablaDeLectura.css'
import { IoPersonAddSharp } from 'react-icons/io5'
import { MdAddBox } from 'react-icons/md'
import Form from './Form'

//Esta componente dibuja una barra de titulo sobre la tabla, se recibe como parametro el tipo de tabla 
//a fin de determinar los titulos a dibujar 
function TitleRow({ tipo }) {

    //Estos estados se utilizan para determinar el tipo de formulario que se dibujará al oprimir un boton en la fila
    const [formularioTipo, setformularioTipo] = useState("0");

    //Funcion que regresa el tipo de formulario a valor sin usar, escondiendo el formulario en el proceso
    const esconderForm = () => {
        setformularioTipo("0");
    };

    //Esta seccion dibuja al barra de titulo para la pagina profesores
    if (tipo === "/Profesors") {
        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} data={0} tipo={tipo}/></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div className='mediumSize'>Nombres</div>{" "}
                        <div className='mediumSize'>Apellidos</div>{" "}
                        <div className='mediumSize'>Identificacion</div>{" "}
                        <div className='smallerSize'>Edad</div>{" "}
                        <div className='mediumSize'>Telefono</div>{" "}
                        <div className='largeSize'>Dirección</div>{" "}
                        <div className='mediumIcono'><button className='boton add' 
                        onClick={() => setformularioTipo("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }

    //Esta seccion dibuja al barra de titulo para la pagina estudiantes
    else if (tipo === "/Students") {
        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} tipo={tipo} /></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div className='mediumSize'>Nombres</div>{" "}
                        <div className='mediumSize'>Apellidos</div>{" "}
                        <div className='mediumSize'>Identificacion</div>{" "}
                        <div className='smallerSize'>Edad</div>{" "}
                        <div className='mediumSize'>Telefono</div>{" "}
                        <div className='largeSize'>Dirección</div>{" "}
                        <div className='largeIcono'><button className='boton add' 
                        onClick={() => setformularioTipo("Crear")}><h2><IoPersonAddSharp /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }

    //Esta seccion dibuja al barra de titulo para la pagina materias
    else if (tipo === "/Materias") {
        return (
            <div>
                <div><Form formularioTipo={formularioTipo} esconderForm={esconderForm} tipo={tipo} /></div>
                <div className='TablaDeTitulo'>
                    <li className='TitleRow'>
                        <div className='mediumSize'>Nombre</div>{" "}
                        <div className='smallSize'>Codigo</div>{" "}
                        <div className='largerSize'>Profesor Asignado</div>{" "}
                        <div className='mediumIcono'><button className='boton add'
                         onClick={() => setformularioTipo("Crear")}><h2><MdAddBox /></h2></button></div>{" "}
                    </li>
                </div>
            </div>
        );
    }

    //Esta seccion dibuja al barra de titulo para la pagina reporte
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
}

export default TitleRow