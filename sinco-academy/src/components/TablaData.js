import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tabla from './Tabla';
import TitleRow from '../components/TitleRow'

//Esta sección obtiene los datos desde el API, esta función recibe como prop tipo lo cual representa la 
//tabla a inspeccionar, el tipo se utiliza para completar la url
function TablaData({tipo}) {
    
    const [dataApi, setDataApi] = useState([]);
    const [reload, setReload] = useState(0);
    
    function reloadComponent(){
      setReload(reload+1);
    }

    useEffect(() => {
      axios.get("http://localhost:5006/api" + tipo)
        .then((response) => { setDataApi((response.data)) });
    }, [reload]);
  
    return (
      <>
        <div>
        <TitleRow tipo={window.location.pathname} reloadComponent={reloadComponent}/>
      </div>
      <div>
        <Tabla key={1} getData={dataApi} tipo={tipo} reloadComponent={reloadComponent}/>
      </div>
      </>
    )
}

export default TablaData