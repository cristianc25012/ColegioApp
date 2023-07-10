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
    const [formMateriaName, setMateriaName] = useState(data.materiaName);
    const [formMateriaCode, setMateriaCode] = useState(data.materiaCode);
    const [formMateriaProfe, setMateriaProfe] = useState(data.profesorID);

    if (visible === "Crear" ||visible === "Editar") {
        if(tipo === "/Profesors") {


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
        else if(tipo === "/Students") {

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
        else if(tipo === "/Materias") {

            const handleSubmit = (e) => {
                e.preventDefault();
                const formData = {formMateriaName, formMateriaCode, formMateriaProfe};
                
                axios.post("http://localhost:5006/api" + tipo, {formData})
                .then(response => console.log(response))
                .catch(err=>console.log(err));

                console.log(formData);
            }
            const handleAbort = (e)=> {

                console.log("abort");
            }
            return (
            <div className='PanelBlur'>
                <div className='TablaFormulario'>
                    <div className='CardTitle'><div id='title'>{visible}</div></div>
                    <form className='Formulario' onSubmit={handleSubmit} onAbort={handleAbort}>
                        <label>Nombre</label>
                        <input
                            type="text" required value={formMateriaName}
                            onChange={(e) => setMateriaName(e.target.value)}
                        />
                        <label>Codigo</label>
                        <input
                            type="text" required value={formMateriaCode}
                            onChange={(e) => setMateriaCode(e.target.value)}
                        />
                        <label>Profesor Encargado</label>
                        <input
                            type="text" required value={formMateriaProfe}
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