import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tabla from './Tabla';

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