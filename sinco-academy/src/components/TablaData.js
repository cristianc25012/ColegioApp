import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tabla from './Tabla';

//Esta sección obtiene los datos desde el API, esta función recibe como prop tipo lo cual representa la 
//tabla a inspeccionar, el tipo se utiliza para completar la url
function TablaData({tipo}) {
    
    const [dataApi, setDataApi] = useState([]);
    
    useEffect(() => {
      axios.get("http://localhost:5006/api" + tipo)
        .then((response) => { setDataApi((response.data)) });
    }, []);
  
    return (
      <>
        <Tabla key={1} getData={dataApi} tipo={tipo}/>
      </>
    )
}

export default TablaData