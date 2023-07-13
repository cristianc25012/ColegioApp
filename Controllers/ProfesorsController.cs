using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.DTOs;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    /// <summary>
    /// Controlador de la tabla Profesors, permite crear, editar, consultar, consultar por ID y eliminar
    /// Adicionalmente se encarga de verificar la informacion y lanzar excepciones según sea necesario
    /// a fin de evitar registros no deseados y manejar de forma correcta los posibles errores durante su 
    /// implementacion
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorsController : ControllerBase
    {
        private readonly ContextDB _context;

        /// <summary>
        /// Recibe como contexto el modelo de base de datos y crea una instancia de este
        /// </summary>
        /// <param name="context"></param>
        public ProfesorsController(ContextDB context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Students Método que permite obtener todos los profesores en la base de datos
        /// </summary>
        /// <returns></returns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> GetProfes()
        {
          if (_context.Profes == null)
          {
              return NotFound();
          }
            return await _context.Profes.ToListAsync();
        }

        /// <summary>
        /// Método que permite obtener un profesor en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpGet("{id}")]
        public async Task<ActionResult<Profesor>> GetProfesor(int id)
        {
          if (_context.Profes == null)
          {
              return NotFound();
          }
            var profesor = await _context.Profes.FindAsync(id);

            if (profesor == null)
            {
                throw new Exception("Profesor no encontrado con id suministrado");
            }

            return profesor;
        }

        /// <summary>
        /// Método que permite editar un profesor en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="profeDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> no se puede crear dos profesores con la misma identificacion o con datos fuera de rango</exception>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfesor(ProfeDTO profeDTO)
        {

            Profesor profesor = CreateProfesor(profeDTO);
            profesor.ProfesorID = profeDTO.ID;
            _context.Entry(profesor).State = EntityState.Modified;

            var consulta = (from profesorC in _context.Profes
                            where profesorC.ProfesorID == profeDTO.ID &&
                            profesorC.ProfeIdentification == profeDTO.Identification
                            select profesorC);

            if ((_context.Profes.Any(e => e.ProfeIdentification == profeDTO.Identification)) && consulta.Count()==0)
            {
                throw new Exception("Este profesor ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorExists(profeDTO.ID))
                {
                    throw new Exception("Profesor no encontrado con id suministrado");
                }
                else
                {
                    throw new Exception("No fue posible editar el profesor, revise los datos e intente de nuevo");
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Método que permite crear un profesor en la base de datos 
        /// </summary>
        /// <param name="profeDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> no se puede crear dos profesores con la misma identificacion o con datos fuera de rango</exception>
        [HttpPost]
        public async Task<ActionResult<Profesor>> PostProfesor(ProfeDTO profeDTO)
        {
          if (_context.Profes == null)
          {
              return Problem("Entity set 'ContextDB.Profes'  is null.");
          }
            profeDTO.ID = 0;
            Profesor profesor = CreateProfesor(profeDTO);
            _context.Profes.Add(profesor);
            
            if ((_context.Profes.Any(e => e.ProfeIdentification == profeDTO.Identification)))
            {
                throw new Exception("Este profesor ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible crear el profesor, revise los datos e intente de nuevo");
            }

            return CreatedAtAction("GetProfesor", new { id = profesor.ProfesorID }, profesor);
        }

        /// <summary>
        /// Método que permite borrar un profesor en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> Excepcion en caso de no encontrar el id solicitado</exception>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesor(int id)
        {
            if (_context.Profes == null)
            {
                return NotFound();
            }
            var profesor = await _context.Profes.FindAsync(id);
            if (profesor == null)
            {
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Profes.Remove(profesor);

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
        /// Método que permite confirmar si un profesro existe usando como filtro su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        /// <summary>
        /// Método que permite crear un nuevo profesor temporal a partir de un profesorDTO 
        /// </summary>
        /// <param name="profeDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> Esta excepción se lanza si la edad esta fuera de rango</exception>
        private Profesor CreateProfesor(ProfeDTO profeDTO)
        {
            if(profeDTO.Age <0 || profeDTO.Age>200)
            {
                throw new Exception("La edad del profesor debe ser un número positivo menor a 200");
            }
            else
            {
                Profesor profesor = new()
                {
                    ProfeName = profeDTO.Name,
                    ProfeAddress = profeDTO.Address,
                    ProfeAge = profeDTO.Age,
                    ProfeIdentification = profeDTO.Identification,
                    ProfeLastName = profeDTO.LastName,
                    ProfePhoneNumber = profeDTO.PhoneNumber
                };

                return profesor;
            }
            
        }
    }
}
