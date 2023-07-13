import React from 'react'
import {PiStudentBold} from 'react-icons/pi'
import {MdOutlineSmartToy} from 'react-icons/md'
import {BsCodeSlash} from 'react-icons/bs'
import {TbReportSearch} from 'react-icons/tb'
import logo from '../Logo/rombo.png'

//En esta sección se determinan los datos a ser dibujados en el panel de navegacion lateral
export const SidebarData = [
    {
        title: "Sinco Academy",
        icon: <img src={logo} />,
        link: "/Home"
    },
    {
        title: "Estudiantes",
        icon: <PiStudentBold/>,
        link: "/Students"
    },
    {
        title: "Profesores",
        icon: <MdOutlineSmartToy />,
        link: "/Profesors"
    },
    {
        title: "Materias",
        icon: <BsCodeSlash />,
        link: "/Materias"
    },
    {
        title: "Reporte",
        icon: <TbReportSearch />,
        link: "/Reporte"
    }
]


