import Fila from "./Fila"
import './TablaDeLectura.css'

function Tabla({ getData, tipo }) {

    return (
        <div className='TablaDeLectura'>{ getData.map( ( val, key ) => {
            return (
                <Fila   key = { (tipo === "/Profesors") ? val.profesorID : 
                                    (tipo === "/student") ? val.studentID : 
                                    (tipo === "/Materia") ? val.materiaID : 
                                    key } 
                            datos = { val } tipo = { tipo } />
            )
        })}</div>
    )
}

export default Tabla