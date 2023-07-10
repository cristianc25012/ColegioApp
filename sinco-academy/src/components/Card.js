import React from 'react'
import './TablaDeLectura.css'

function Card({ visible, prb, data, tipo}) {
    
    if(visible === "Crear" || visible ==="Editar")
    {
        if(tipo === "/Profesors"){
            return(
                <div className='PanelBlur'>
                    <div className='TablaDeLectura'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <ul className='FilasTotal'>
                            <ul className='ColumnasTotal'>
                                <li className='column'>
                                    <div className='header' >Nombres</div>{" "}
                                    <div className='header'>Apellidos</div>{" "}
                                    <div className='header'>Identificacion</div>{" "}
                                    <div className='header'>Edad</div>{" "}
                                    <div className='header'>Telefono</div>{" "}
                                    <div className='header'>Direccion</div>{" "}
                                </li>
                                <li className='column' id='formulario'>
                                    <input className='campo' id="formName" defaultValue={data.profeName}></input>{" "}
                                    <input className='campo' id="formLastName" defaultValue={data.profeLastName}></input>{" "}
                                    <input className='campo' id="formID" defaultValue={data.profeIdentification}></input>{" "}
                                    <input className='campo' id="formAge" defaultValue={data.profeAge}></input>{" "}
                                    <input className='campo' id="formPhone" defaultValue={data.profePhoneNumber}></input>{" "}
                                    <input className='campo' id="formAddress" defaultValue={data.profeAddress}></input>{" "}
                                </li>
                            </ul>
        
                            <li className='row botones'>
                                <div id='largerSize'><button className='boton2' type='guardar'><h2> Guardar</h2></button></div>{" "}
                                <div id='largerSize'><button className='boton2 cancelar' onClick={prb}>
                                    <h2>Cancelar</h2></button></div>{" "}
                            </li>
                        </ul>
                    </div>
                </div> 
            )
        }
        else if(tipo === "/Materias"){
            return(
                <div className='PanelBlur'>
                    <div className='TablaDeLectura'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <ul className='FilasTotal'>
                            <ul className='ColumnasTotal'>
                                <li className='column'>
                                    <div className='header' >Nombre</div>{" "}
                                    <div className='header'>Codigo</div>{" "}
                                    <div className='header'>Profesor Encargado</div>{" "}
                                </li>
                                <li className='column'>
                                    <input className='campo' id="formprb" defaultValue={data.materiaName}></input>{" "}
                                    <input className='campo' defaultValue={data.materiaCode}></input>{" "}
                                    <input className='campo' defaultValue={data.profesorID}></input>{" "}
                                </li>
                            </ul>
        
                            <li className='row botones'>
                                <div id='largerSize'><button className='boton2'><h2> Guardar</h2></button></div>{" "}
                                <div id='largerSize'><button className='boton2 cancelar' onClick={prb}>
                                    <h2>Cancelar</h2></button></div>{" "}
                            </li>
                        </ul>
                    </div>
                </div> 
            )
        }
        else if(tipo === "/Students"){
            return(
                <div className='PanelBlur'>
                    <div className='TablaDeLectura'>
                        <div className='CardTitle'><div id='title'>{visible}</div></div>
                        <ul className='FilasTotal'>
                            <ul className='ColumnasTotal'>
                                <li className='column'>
                                    <div className='header' >Nombres</div>{" "}
                                    <div className='header'>Apellidos</div>{" "}
                                    <div className='header'>Identificacion</div>{" "}
                                    <div className='header'>Edad</div>{" "}
                                    <div className='header'>Telefono</div>{" "}
                                    <div className='header'>Direccion</div>{" "}
                                </li>
                                <li className='column'>
                                    <input className='campo' id="formprb" defaultValue={data.stuName}></input>{" "}
                                    <input className='campo' defaultValue={data.stuLastName}></input>{" "}
                                    <input className='campo' defaultValue={data.stuIdentification}></input>{" "}
                                    <input className='campo' defaultValue={data.age}></input>{" "}
                                    <input className='campo' defaultValue={data.stuPhoneNumber}></input>{" "}
                                    <input className='campo' defaultValue={data.stuAddress}></input>{" "}
                                </li>
                            </ul>
        
                            <li className='row botones'>
                                <div id='largerSize'><button className='boton2'><h2> Guardar</h2></button></div>{" "}
                                <div id='largerSize'><button className='boton2 cancelar' onClick={prb}>
                                    <h2>Cancelar</h2></button></div>{" "}
                            </li>
                        </ul>
                    </div>
                </div> 
            )
        }
        
    }
    
}

export default Card