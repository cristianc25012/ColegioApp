using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.Clases;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private readonly ContextDB _context;
        public ReporteController(ContextDB context)
        {
            _context = context;
        }

        [HttpGet]

        public IActionResult ConsultarReporteConsolidado()
        {
            var consulta = (from historial in _context.Historials 
                            join student in _context.Students on historial.StudentID equals student.StudentID
                            join materia in _context.Materias on historial.MateriaID equals materia.MateriaID
                            join profe in _context.Profes on materia.ProfesorID equals profe.ProfesorID
                            select new Reporte { 
                                AnhoAcademico = historial.Year,
                                IdentificacionEstudiante = student.StuIdentification,
                                NombreEstudiante = student.StuName,
                                CodigoMateria = materia.MateriaCode,
                                NombreMateria = materia.MateriaName,
                                IdentificacionProfesor = profe.ProfeIdentification,
                                NombreProfesor = profe.ProfeName,
                                CalificacionFinal = historial.Grade,
                                Aprobacion = (historial.Grade>=3) 
                            } );

            return Ok(consulta.ToList());
        }

        
    }
}
