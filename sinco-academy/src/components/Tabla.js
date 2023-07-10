import Fila from "./Fila"
import './TablaDeLectura.css'

function Tabla({ getData, tipo }) {

    return (
        <div className='TablaDeLectura'>{ getData.map( ( val, key ) => {
            return (
                <Fila   key = { (tipo === "/Profesors") ? val.profesorID : 
                                    (tipo === "/Students") ? val.studentID : 
                                    (tipo === "/Materias") ? val.materiaID : 
                                    key } 
                        idopc = { (tipo === "/Profesors") ? val.profesorID : 
                        (tipo === "/Students") ? val.studentID : 
                        (tipo === "/Materias") ? val.materiaID : 
                        key }     datos = { val } tipo = { tipo } />
            )
        })}</div>
    )
}

export default Tabla