import React, { useState } from 'react'
import axios from 'axios';
import './Card.css'

function Form({ visible, prb, data, tipo }) {

    const [formNombre, setFormNombre] = useState("");
    const [formApellido, setFormApellido] = useState("");
    const [formIdentificacion, setFormIdentificacion] = useState("");
    const [formEdad, setFormEdad] = useState("");
    const [formTelefono, setFormTelefono] = useState("");
    const [formDireccion, setFormDireccion] = useState("");
    const [materiaName, setMateriaName] = useState("");
    const [materiaCode, setMateriaCode] = useState("");
    const [profesorID, setMateriaProfe] = useState("");

    if (visible === "Crear") {
        if (tipo === "/Profesors") {


            const handleSubmit = (e) => {
                e.preventDefault();
                const formData = { formNombre, formApellido, formIdentificacion, formEdad, formTelefono, formDireccion };

                console.log(formData);
            }

            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit}>
                            <label>Nombre</label>
                            <input
                                type="text" required value={data.profeName}
                                onChange={(e) => setFormNombre(e.target.value)}
                            />
                            <label>Apellidos</label>
                            <input
                                type="text" required value={data.profeLastName}
                                onChange={(e) => setFormApellido(e.target.value)}
                            />
                            <label>Identificacion</label>
                            <input
                                type="text" required value={data.profeIdentification}
                                onChange={(e) => setFormIdentificacion(e.target.value)}
                            />
                            <label>Edad</label>
                            <input
                                type='number' required value={data.profeAge}
                                onChange={(e) => setFormEdad(e.target.value)}
                            />
                            <label>Telefono</label>
                            <input
                                type="text" required value={data.profePhoneNumber}
                                onChange={(e) => setFormTelefono(e.target.value)}
                            />
                            <label>Direccion</label>
                            <input
                                type="text" required value={data.profeAddress}
                                onChange={(e) => setFormDireccion(e.target.value)}
                            />
                            <div className='botones'>
                                <button className='boton4'>Guardar</button>
                                <button className='boton4 cancelar' onClick={prb}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else if (tipo === "/Students") {

            const handleSubmit = (e) => {
                e.preventDefault();
                const formData = { formNombre, formApellido, formIdentificacion, formEdad, formTelefono, formDireccion };

                console.log(formData);
            }

            return (
                <div className='PanelBlur'>
                    <div className='TablaFormulario'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <form className='Formulario' onSubmit={handleSubmit}>
                            <label>Nombre</label>
                            <input
                                type="text" required value={data.stuName}
                                onChange={(e) => setFormNombre(e.target.value)}
                            />
                            <label>Apellidos</label>
                            <input
                                type="text" required value={data.stuLastName}
                                onChange={(e) => setFormApellido(e.target.value)}
                            />
                            <label>Identificacion</label>
                            <input
                                type="text" required value={data.stuIdentification}
                                onChange={(e) => setFormIdentificacion(e.target.value)}
                            />
                            <label>Edad</label>
                            <input
                                type='number' required value={data.age}
                                onChange={(e) => setFormEdad(e.target.value)}
                            />
                            <label>Telefono</label>
                            <input
                                type="text" required value={data.stuPhoneNumber}
                                onChange={(e) => setFormTelefono(e.target.value)}
                            />
                            <label>Direccion</label>
                            <input
                                type="text" required value={data.stuAddress}
                                onChange={(e) => setFormDireccion(e.target.value)}
                            />
                            <div className='botones'>
                                <button className='boton4'>Guardar</button>
                                <button className='boton4 cancelar' onClick={prb}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else if (tipo === "/Materias") {

            const handleSubmit = () => {
                const formData = { materiaName, materiaCode, profesorID };

                try {
                    const jsonData = JSON.stringify(formData);

                    const r = axios.post("http://localhost:5006/api" + tipo, jsonData, {headers: {
                        'Content-Type': 'application/json'
                    }});

                    console.log(r.formData);

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
                                type="text" required value={materiaName}
                                onChange={(e) => setMateriaName(e.target.value)}
                            />
                            <label>Codigo</label>
                            <input
                                type="text" required value={materiaCode}
                                onChange={(e) => setMateriaCode(e.target.value)}
                            />
                            <label>Profesor Encargado</label>
                            <input
                                type="text" required value={profesorID}
                                onChange={(e) => setMateriaProfe(e.target.value)}
                            />
                            <div className='botones'>
                                <button className='boton4'>Guardar</button>
                                <button className='boton4 cancelar' onClick={prb} type='reset'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

}

export default Form