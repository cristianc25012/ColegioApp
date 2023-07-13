import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Card.css'

//Este componente crea un formulario el cual puede ser de tipo Crear, Editar o Calificar, tipo de formulario  
//esconderForm es un una función que sirve para cerrar el formulario, se recibe como prop desde el componente Fila. 
//data es obtenida por el componente tabla data y mapeada por el componente tabla, se recibe desde tabla. 
//idopc es el id de los datos enviados, este cambia segun el tipo, esto es asignado en el componente tabla
function Form({ formularioTipo, esconderForm, data, tipo, idopc }) {
    
    //Esta seccion de codigo son las constantes que almacenan los valores de los inputs, estos seran posteriormente
    //enviados en forma de arreglo desde los formularios con la funcion onSubmit. Se creó tres tipos diferentes de arreglos
    //teniendo en cuenta las diferencias entre la cantidad de campos y sus nombres. 
    const [formP, setForm] = useState({ name: "", lastName: "", identification: "", age: 0, phoneNumber: "", address: "" });
    const [formM, setFormM] = useState({ materiaName: "", materiaCode: "", profesorID: "" });
    const [formH, setFormH] = useState({ periodoAcademico: "", calificacion: "", studentID: "", materiaID: "" });
    
    //Esta seccion permite alamacenar los datos de materias y profesores para ser consultadas desde otras páginas y desde
    //los formularios
    const [dataMaterias, setDataMaterias] = useState([]);
    const [dataProfes, setDataProfes] = useState([]);

    //Esta funcion permite obtener los datos de los profesores desde la página de materias con el objetivo de cambiar el ID
    //del profesor asignado por el nombre y apellido de los mismos, facilitando la asignación de profesores, así mismo
    //permite obtener los datos de las materias desde la página de estudiantes con el objetivo de cambiar el ID
    //de la materia por el nombre de esta, facilitando la asignación de calificaciones
    useEffect(() => {
        if (tipo === "/Students") {
            axios.get("http://localhost:5006/api/Materias")
                .then((response) => { setDataMaterias((response.data)) })
                .catch((err) => console.log(err));

        }
        else if (tipo === "/Materias")
        axios.get("http://localhost:5006/api/Profesors")
            .then((response) => { setDataProfes((response.data)) })
            .catch((err) => console.log(err));
    }, []);

    //Esta funcion maneja los errores al momento de publicar o editar un registro 
    const showAlert = (errorShow) => {
        alert(errorShow.response.data.substring(errorShow.response.data.indexOf('at'), 18).trim());
    }

    //Esta funcion crea los registros en la base de datos, recibe como paremetro los datos a crear en forma de arreglo
    const postButton = (sentData) => {

        axios.post("http://localhost:5006/api" + tipo, JSON.stringify(sentData), {
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => showAlert(err.response));

    }

    //Esta funcion edita los registros en la base de datos, recibe como paremetro los datos a editar en forma de arreglo
    const putButton = (sentData) => {

        axios.put("http://localhost:5006/api" + tipo + "/" + idopc, JSON.stringify(sentData), {
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => showAlert(err));

    }

    //Seccion para la creacion de registros en la base de datos
    if (formularioTipo === "Crear") {

        //Esta seccion de codigo permite crear estudiantes o profesores en la base de datos
        if (tipo === "/Students" || tipo === "/Profesors") {

            //Esta seccion dibuja el formulario.
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                        <form className='Formulario' onSubmit={() => postButton(formP)}>
                            <label>Nombre</label>
                            <input
                                type="text" required
                                onChange={(e) => formP.name = e.target.value}
                            />
                            <label>Apellidos</label>
                            <input
                                type="text" required
                                onChange={(e) => formP.lastName = e.target.value}
                            />
                            <label>Identificacion</label>
                            <input
                                type="text" required 
                                onChange={(e) => formP.identification = e.target.value}
                            />
                            <label>Edad</label>
                            <input
                                type='number' required
                                onChange={(e) => formP.age = e.target.value}
                            />
                            <label>Telefono</label>
                            <input
                                type="text" required
                                onChange={(e) => formP.phoneNumber = e.target.value}
                            />
                            <label>Direccion</label>
                            <input
                                type="text" required
                                onChange={(e) => formP.address = e.target.value}
                            />
                            <div className='botones'>
                                <button className='boton2'>Guardar</button>
                                <button className='boton2 cancelar' onClick={esconderForm}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        //Esta seccion de codigo permite crear materias en la base de datos
        else if (tipo === "/Materias") {

            //Esta seccion dibuja el formulario.
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                        <form className='Formulario' onSubmit={() => postButton(formM)}>
                            <label>Nombre</label>
                            <input
                                type="text" required
                                onChange={(e) => formM.materiaName = e.target.value}
                            />
                            <label>Codigo</label>
                            <input
                                type="text" required
                                onChange={(e) => formM.materiaCode = e.target.value}
                            />
                            <label>Profesor Encargado</label>
                            <select onChange={(e) => formM.profesorID = e.target.value}>
                                {dataProfes.map((val, key) => {
                                    return (<option key={key} value={val.profesorID}>{val.profeName} {val.profeLastName}</option>)
                                })}
                            </select>
                            <div className='botones'>
                                <button className='boton2'>Guardar</button>
                                <button className='boton2 cancelar' onClick={esconderForm} type='reset'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    //Seccion para la edicion de la base de datos - Esta Seccion Cambia segun el tipo del formulario, el formulario
    //cambia con el objetivo de inicializar los inputs y cambiar el metodo submit del formulario. 
    if (formularioTipo === "Editar") {

        //Esta seccion de codigo permite editar los profesores
        if (tipo === "/Profesors") {

            //Esta seccion de codigo inicializa los inputs con los valores del profesor que se esta editando 
            formP.name = data.profeName;
            formP.lastName = data.profeLastName;
            formP.identification = data.profeIdentification;
            formP.age = data.profeAge;
            formP.phoneNumber = data.profePhoneNumber;
            formP.address = data.profeAddress;
            formP.id = idopc;

            //Esta seccion dibuja el formulario. 
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                        <form className='Formulario' onSubmit={() => putButton(formP)} >
                            <label>Nombre</label>
                            <input
                                type="text" required defaultValue={data.profeName}
                                onChange={(e) => formP.name = e.target.value}
                            />
                            <label>Apellidos</label>
                            <input
                                type="text" required defaultValue={data.profeLastName}
                                onChange={(e) => formP.lastName = e.target.value}
                            />
                            <label>Identificacion</label>
                            <input
                                type="text" required defaultValue={data.profeIdentification}
                                onChange={(e) => formP.identification = e.target.value}
                            />
                            <label>Edad</label>
                            <input
                                type='number' required defaultValue={data.profeAge}
                                onChange={(e) => formP.age = e.target.value}
                            />
                            <label>Telefono</label>
                            <input
                                type="text" required defaultValue={data.profePhoneNumber}
                                onChange={(e) => formP.phoneNumber = e.target.value}
                            />
                            <label>Direccion</label>
                            <input
                                type="text" required defaultValue={data.profeAddress}
                                onChange={(e) => formP.address = e.target.value}
                            />
                            <div className='botones'>
                                <button className='boton2'>Guardar</button>
                                <button className='boton2 cancelar' onClick={esconderForm}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        //Esta seccion de codigo permite editar los estudiantes
        if (tipo === "/Students") {

            //Esta seccion de codigo inicializa los inputs con los valores del estudiante que se esta editando 
            formP.name = data.stuName;
            formP.lastName = data.stuLastName;
            formP.identification = data.stuIdentification;
            formP.age = data.age;
            formP.phoneNumber = data.stuPhoneNumber;
            formP.address = data.stuAddress;
            formP.id = idopc;

            //Esta seccion dibuja el formulario. 
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                        <form className='Formulario' onSubmit={() => putButton(formP)}>
                            <label>Nombre</label>
                            <input
                                type="text" required defaultValue={data.stuName}
                                onChange={(e) => formP.name = e.target.value}
                            />
                            <label>Apellidos</label>
                            <input
                                type="text" required defaultValue={data.stuLastName}
                                onChange={(e) => formP.lastName = e.target.value}
                            />
                            <label>Identificacion</label>
                            <input
                                type="text" required defaultValue={data.stuIdentification}
                                onChange={(e) => formP.identification = e.target.value}
                            />
                            <label>Edad</label>
                            <input
                                type='number' required defaultValue={data.age}
                                onChange={(e) => formP.age = e.target.value}
                            />
                            <label>Telefono</label>
                            <input
                                type="text" required defaultValue={data.stuPhoneNumber}
                                onChange={(e) => formP.phoneNumber = e.target.value}
                            />
                            <label>Direccion</label>
                            <input
                                type="text" required defaultValue={data.stuAddress}
                                onChange={(e) => formP.address = e.target.value}
                            />
                            <div className='botones'>
                                <button className='boton2'>Guardar</button>
                                <button className='boton2 cancelar' onClick={esconderForm}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        //Esta seccion de codigo permite editar Materias
        else if (tipo === "/Materias") {

            //Esta seccion de codigo inicializa los inputs con los valores de la materia que se esta editando 
            formM.materiaName = data.materiaName;
            formM.materiaCode = data.materiaCode;
            formM.profesorID = data.profesorID;
            formM.materiaID = idopc;

            //Esta seccion dibuja el formulario. 
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                        <form className='Formulario' onSubmit={() => putButton(formM)}>
                            <label>Nombre</label>
                            <input
                                type="text" required
                                defaultValue={data.materiaName}
                                onChange={(e) => formM.materiaName = e.target.value}
                            />
                            <label>Codigo</label>
                            <input
                                type="text" required
                                defaultValue={data.materiaCode}
                                onChange={(e) => formM.materiaCode = e.target.value}
                            />
                            <label>Profesor Encargado</label>
                            <select onChange={(e) => formM.profesorID = e.target.value}>
                                {dataProfes.map((val, key) => {
                                    return (<option key={key} value={val.profesorID}>{val.profeName} {val.profeLastName}</option>)
                                })}
                            </select>

                            <div className='botones'>
                                <button className='boton2'>Guardar</button>
                                <button className='boton2 cancelar' onClick={esconderForm} type='reset'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    /// Este Sección del código sirve para abrir el panel de calificar un estudiante 
    if (formularioTipo === "Calificar") {

        //Esta seccion inicializa el ID del estudiante que se esta editando
        formH.studentID = data.studentID;

        //Esta seccion dibuja el formulario. 
        return (
            <div className='PanelBlur'>
                <div className='TablaFormulario'>
                    <div className='CardTitle'><div id='title'>{formularioTipo}</div></div>
                    <form className='Formulario' onSubmit={() => postButton(formH)}>
                        <label>Materia</label>
                        <select onChange={(e) => formH.materiaID = e.target.value}>
                            {dataMaterias.map((val, key) => {
                                return (<option key={key} value={val.materiaID}>{val.materiaName}</option>)
                            })}
                        </select>
                        <label>Año</label>
                        <input
                            type='number' required
                            onChange={(e) => formH.periodoAcademico = e.target.value}
                        />
                        <label>Calificacion</label>
                        <input
                            type='number'
                            title="Rate"
                            id="rate"
                            min="0.00"
                            step="0.01"
                            max="5.00"
                            presicion={2}
                            required
                            onChange={(e) => formH.calificacion = e.target.value}
                        />
                        <div className='botones'>
                            <button className='boton2'>Guardar</button>
                            <button className='boton2 cancelar' onClick={esconderForm} type='reset'>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }




}

export default Form