import React, { useState } from 'react'
import axios from 'axios';
import './Card.css'

function Form({ visible, prb, data, tipo, opc }) {

    const [materiaObjeto, setFormNombre] = useState(
        {
            materiaName: "", materiaCode: "", profesorID: ""
        });

    if (tipo === "/Materias") {
        const handleSubmit = () => {

            try {
                const jsonData = JSON.stringify(materiaObjeto);

                const r = axios.post("http://localhost:5006/api" + tipo, jsonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(r.materiaObjeto);

            } catch (error) {
                console.log(error);
            }

        }
        const handleAbort = (e) => {

            console.log(e);
        }

        return (
            <>
                {visible === true &&
                    <div className='PanelBlur'>
                        <div className='TablaFormulario'>
                            <div className='CardTitle'><div id='title'>{opc}</div></div>
                            <form className='Formulario' onSubmit={handleSubmit} onAbort={handleAbort}>
                                <label> Nombre </label>
                                {opc === "e" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.materiaName = e.target.value)}
                                        onChange={() => (console.log("Hola"))}
                                        value={data.materiaName}
                                    />
                                }
                                {opc === "c" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.materiaName = e.target.value)}
                                    />
                                }
                                <label>Codigo</label>
                                {opc === "e" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.materiaCode = e.target.value)}
                                        onChange={() => (console.log("Hola"))}
                                        value={data.materiaCode}
                                    />
                                }
                                {opc === "c" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.materiaCode = e.target.value)}
                                    />
                                }
                                <label>Profesor Encargado</label>
                                {opc === "e" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.profesorID = e.target.value)}
                                        onChange={() => (console.log("Hola"))}
                                        value={data.profesorID}
                                    />
                                }
                                {opc === "c" &&
                                    <input
                                        id="materiaName"
                                        type="text" required
                                        onBlur={(e) => (materiaObjeto.profesorID = e.target.value)}
                                    />
                                }
                                <div className='botones'>
                                    <button className='boton4'>Guardar</button>
                                    <button className='boton4 cancelar' onClick={prb} type='reset'>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </>

        )

    }



}

export default Form