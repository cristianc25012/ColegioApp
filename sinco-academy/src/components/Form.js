import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Card.css'

function Form({ visible, prb, data, tipo, idopc }) {

    const [formP, setForm] = useState(
        { name: "", lastName: "", identification: "", age: 0, phoneNumber: "", address: "" });
    const [formM, setFormM] = useState({ materiaName: "", materiaCode: "", profesorID: "" });
    const [formH, setFormH] = useState({ periodoAcademico: "", calificacion: "", studentID: "", materiaID: "" });

    const [dataMaterias, setDataMaterias] = useState([]);
    const [dataProfes, setDataProfes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5006/api/Materias")
            .then((response) => { setDataMaterias((response.data)) })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5006/api/Profesors")
            .then((response) => { setDataProfes((response.data)) })
            .catch((err) => console.log(err));
    }, []);


    //Seccion para la creacion de registros en la base de datos

    if (visible === "Crear") {

        if (tipo === "/Students" || tipo === "/Profesors") {

            const handleSubmit = () => {
                try {
                    const jsonData = JSON.stringify(formP);
                    axios.post("http://localhost:5006/api" + tipo, jsonData, {
                        headers: {'Content-Type': 'application/json'}
                    }).catch(function (error) {
                        console.log(error.toJSON());});
                } 
                catch (error) {
                    console.log("Caugth");
                }
            }

            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit}>
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
                                <button className='boton2 cancelar' onClick={prb}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else if (tipo === "/Materias") {

            const handleSubmit = () => {
                try {
                    const jsonData = JSON.stringify(formM);

                    const r = axios.post("http://localhost:5006/api" + tipo, jsonData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(r.formM);

                } catch (error) {
                    console.log('rs', error.r.data);
                    console.log('http', error.r.status);
                    console.log('es', error.message);
                }
            }
            const handleAbort = (e) => {

                console.log(e);
            }
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit} onAbort={handleAbort}>
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
                                <button className='boton2 cancelar' onClick={prb} type='reset'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    //Seccion para la edicion de la base de datos

    if (visible === "Editar") {

        if (tipo === "/Profesors") {

            formP.name = data.profeName;
            formP.lastName = data.profeLastName;
            formP.identification = data.profeIdentification;
            formP.age = data.profeAge;
            formP.phoneNumber = data.profePhoneNumber;
            formP.address = data.profeAddress;

            const handleSubmit = () => {
                try {
                    formP.id = idopc;
                    const jsonData = JSON.stringify(formP);

                    const r = axios.put("http://localhost:5006/api" + tipo + "/" + idopc, jsonData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(r.formP);

                } catch (error) {
                    console.log('rs', error.r.data);
                    console.log('http', error.r.status);
                    console.log('es', error.message);
                }
            }

            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit}>
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
                                <button className='boton2 cancelar' onClick={prb}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        if (tipo === "/Students") {

            formP.name = data.stuName;
            formP.lastName = data.stuLastName;
            formP.identification = data.stuIdentification;
            formP.age = data.age;
            formP.phoneNumber = data.stuPhoneNumber;
            formP.address = data.stuAddress;

            const handleSubmit = () => {
                try {
                    formP.id = idopc;
                    const jsonData = JSON.stringify(formP);

                    const r = axios.put("http://localhost:5006/api" + tipo + "/" + idopc, jsonData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(r.formP);

                } catch (error) {
                    console.log('rs', error.r.data);
                    console.log('http', error.r.status);
                    console.log('es', error.message);
                }
            }

            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit}>
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
                                <button className='boton2 cancelar' onClick={prb}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        else if (tipo === "/Materias") {

            formM.materiaName = data.materiaName;
            formM.materiaCode = data.materiaCode;
            formM.profesorID = data.profesorID;

            const handleSubmit = () => {
                try {

                    formM.materiaID = idopc;

                    const jsonData = JSON.stringify(formM);

                    const r = axios.put("http://localhost:5006/api" + tipo + "/" + idopc, jsonData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(r.formM);

                } catch (error) {
                    console.log('rs', error.r.data);
                    console.log('http', error.r.status);
                    console.log('es', error.message);
                }
            }
            const handleAbort = (e) => {

                console.log(e);
            }
            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit} onAbort={handleAbort}>
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
                                <button className='boton2 cancelar' onClick={prb} type='reset'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    if (visible === "Calificar") {

        const handleSubmit = () => {
            try {

                formH.studentID = data.studentID;

                const jsonData = JSON.stringify(formH);

                const r = axios.post("http://localhost:5006/api/HistorialAcademicoes", jsonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(r.formH);

            } catch (error) {
                console.log('rs', error.r.data);
                console.log('http', error.r.status);
                console.log('es', error.message);
            }
        }

        return (
            <div className='PanelBlur'>
                <div className='TablaFormulario'>
                    <div className='CardTitle'><div id='title'>{visible}</div></div>
                    <form className='Formulario' onSubmit={handleSubmit}>
                        <label>Materia</label>
                        <select onChange={(e) => formH.materiaID = e.target.value}>

                            {dataMaterias.map((val, key) => {
                                return (<option key={key} value={val.materiaID}>{val.materiaID}</option>)
                            })}
                        </select>
                        <label>Año</label>
                        <input
                            type='number' required
                            onChange={(e) => formH.periodoAcademico = e.target.value}
                        />
                        <label>Calificacion</label>
                        <input
                            type='number' required

                            onChange={(e) => formH.calificacion = e.target.value}
                        />
                        <div className='botones'>
                            <button className='boton2'>Guardar</button>
                            <button className='boton2 cancelar' onClick={prb} type='reset'>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }




}

export default Form