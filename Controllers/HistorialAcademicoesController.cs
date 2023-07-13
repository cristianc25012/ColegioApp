using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.DTOs;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    /// <summary>
    /// Controlador de la tabla Historial Academicoes, permite crear, editar, consultar, consultar por ID y eliminar
    /// Adicionalmente se encarga de verificar la informacion y lanzar excepciones según sea necesario
    /// a fin de evitar registros no deseados y manejar de forma correcta los posibles errores durante su 
    /// implementacion. Varios de sus métodos no se encuentran implementados en el front pero pueden usarse desde Swagger
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialAcademicoesController : ControllerBase
    {
        private readonly ContextDB _context;

        /// <summary>
        /// Recibe como contexto el modelo de base de datos y crea una instancia de este
        /// </summary>
        /// <param name="context"></param>
        public HistorialAcademicoesController(ContextDB context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Students Método que permite obtener todos los historiales academicos en la base de datos
        /// </summary>
        /// <returns></returns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialAcademico>>> GetHistorials()
        {
          if (_context.Historials == null)
          {
              return NotFound();
          }
            return await _context.Historials.ToListAsync();
        }

        /// <summary>
        /// Método que permite consultar un historial especifico en la base de datos usando como filtro el ID, actualmente este método no esta en uso en el front
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialAcademico>> GetHistorialAcademico(int id)
        {
          if (_context.Historials == null)
          {
              return NotFound();
          }
            var historialAcademico = await _context.Historials.FindAsync(id);

            if (historialAcademico == null)
            {
                throw new Exception("Historial Academico no encontrado con id suministrado");
            }

            return historialAcademico;
        }

        /// <summary>
        /// Metodo que permite editar un historial usando como filtro el id, actualmente el método no esta en uso en el front
        /// </summary>
        /// <param name="historialDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorialAcademico(HistorialDTO historialDTO)
        {
            HistorialAcademico historialAcademico = CreateHistorial(historialDTO);
            historialAcademico.HistorialID = historialDTO.ID;
            _context.Entry(historialAcademico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialAcademicoExists(historialAcademico.HistorialID))
                {
                    throw new Exception("Historial Academico no encontrado con id suministrado");
                }
                else
                {
                    throw new Exception("No fue posible editar el historial academico, revise los datos e intente de nuevo");
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Metodo que permite crear un historial nuevo
        /// </summary>
        /// <param name="historialDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost]
        public async Task<ActionResult<HistorialAcademico>> PostHistorialAcademico(HistorialDTO historialDTO)
        {
          if (_context.Historials == null)
          {
              return Problem("Entity set 'ContextDB.Historials'  is null.");
          }
            historialDTO.ID = 0;
            HistorialAcademico historialAcademico = CreateHistorial(historialDTO);
            _context.Historials.Add(historialAcademico);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible crear el historial academico, revise los datos e intente de nuevo");
            }

            return CreatedAtAction("GetHistorialAcademico", new { id = historialAcademico.HistorialID }, historialAcademico);
        }

        /// <summary>
        /// Metodo que elimina un historial usando como filtro el id, actualmente el método no esta en uso en el front
        /// </summary
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorialAcademico(int id)
        {
            if (_context.Historials == null)
            {
                return NotFound();
            }
            var historialAcademico = await _context.Historials.FindAsync(id);
            if (historialAcademico == null)
            {
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Historials.Remove(historialAcademico);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible eliminar el registro");
            }

            return NoContent();
        }

        /// <summary>
        /// Metodo que confirma si el historial existe usando como filtro el id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool HistorialAcademicoExists(int id)
        {
            return (_context.Historials?.Any(e => e.HistorialID == id)).GetValueOrDefault();
        }

        /// <summary>
        /// Método que permite crear un nuevo historial temporal a partir de un historialDTO
        /// </summary>
        /// <param name="historialDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private HistorialAcademico CreateHistorial(HistorialDTO historialDTO)
        {
            var consulta = (from historial in _context.Historials
                            where historial.Year == historialDTO.PeriodoAcademico &&
                            historial.MateriaID == historialDTO.MateriaID &&
                            historial.StudentID == historialDTO.StudentID
                            select historial);

            if (historialDTO.Calificacion < 0 || historialDTO.Calificacion > 5)
            {
                throw new Exception("La calificación debe ser un número positivo menor o igual a 5.00");
            }
            else if (historialDTO.PeriodoAcademico < 0 || historialDTO.PeriodoAcademico > 2050)
            {
                throw new Exception("El periodo academico debe ser un número positivo menor a 2050");
            }
            else if (!(_context.Students.Any(e => e.StudentID == historialDTO.StudentID)))
            {
                throw new Exception("El estudiante suministrado no existe");
            }
            else if (!(_context.Materias.Any(e => e.MateriaID == historialDTO.MateriaID)))
            {
                throw new Exception("La Materia suministrada no existe");
            }
            else if (consulta.Count()>0)
                {
                  throw new Exception("El estudiante ya tiene asignada la materia "+ _context.Materias.Find(historialDTO.MateriaID).MateriaName + " para el periodo academico " + historialDTO.PeriodoAcademico);
                }
            else
            {
                HistorialAcademico historialAcademico = new()
                {
                    Year = historialDTO.PeriodoAcademico,
                    Grade = historialDTO.Calificacion,
                    MateriaID = historialDTO.MateriaID,
                    StudentID = historialDTO.StudentID
                };

                return historialAcademico;
            }
        }
    }
}
