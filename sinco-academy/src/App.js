import './App.css';
import Sidebar from './components/Sidebar';
import Estudiantes from './pages/Estudiantes'
import Home from './pages/Home'
import Profesores from './pages/Profesores'
import Materias from './pages/Materias'
import Reporte from './pages/Reporte'
import { Historial } from './pages/Historial';

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home/>
      break;
    case "/Students":
      component = <Estudiantes/>
      break;
    case "/Profesors":
      component = <Profesores/>
      break;
    case "/Materias":
      component = <Materias/>
      break;
    case "/Reporte":
      component = <Reporte/>
      break;
      case "/HistorialAcademicoes":
        component = <Historial/>
        break;
    default:
      component = <Home/>
      break;
  }
  return (
    <div className='App'>
      <div className='Container'>
        <div className='LeftPanel'><Sidebar/></div>
        <div className='RigthPanel'> {component} </div> 
      </div>  
    </div>
  );
}

export default App;
