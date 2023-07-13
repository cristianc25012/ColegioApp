using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.DTOs;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    /// <summary>
    /// Controlador de la tabla Students, permite crear, editar, consultar, consultar por ID y eliminar
    /// Adicionalmente se encarga de verificar la informacion y lanzar excepciones según sea necesario
    /// a fin de evitar registros no deseados y manejar de forma correcta los posibles errores durante su 
    /// implementacion
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ContextDB _context;

        /// <summary>
        /// Recibe como contexto el modelo de base de datos
        /// </summary>
        /// <param name="context"></param>
        public StudentsController(ContextDB context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Students Método que permite obtener todos los estudiantes en la base de datos
        /// </summary>
        /// <returns></returns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            return await _context.Students.ToListAsync();
        }

        /// <summary>
        /// Método que permite obtener un estudiante en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                throw new Exception("Estudiante no encontrado con id suministrado");
            }

            return student;
        }

        /// <summary>
        /// Método que permite editar un estudiante en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="studentDTO"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public  IActionResult PutStudent(StudentDTO studentDTO)
        {
            try 
            {
                Student student = new(studentDTO);
                student.StudentID = studentDTO.ID;
                _context.Entry(student).State = EntityState.Modified;

                var consulta = (from Student in _context.Students
                                where Student.StudentID == studentDTO.ID &&
                                Student.StuIdentification == studentDTO.Identification
                                select Student);

                if (!StudentExists(studentDTO.ID))
                {
                    throw new Exception("Estudiante no encontrado con id suministrado");
                }

                if ((_context.Students.Any(e => e.StuIdentification == studentDTO.Identification)) && consulta.Count() == 0)
                {
                    throw new Exception("Este estudiante ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
                }
                else
                {                    
                    _context.SaveChanges();
                }

                return Ok();
            }
            catch (DbUpdateConcurrencyException ex)
            {

               return BadRequest(new Exception("No fue posible editar el estudiante, revise los datos e intente de nuevo"));
            }
            catch (Exception ex) {

                return BadRequest(ex.ToString());
            }
           
        }

        /// <summary>
        /// Método que permite crear un estudiante en la base de datos
        /// </summary>
        /// <param name="studentDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> no se puede crear dos estudiantes con la misma identificacion o con datos fuera de rango</exception>
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(StudentDTO studentDTO)
        {

            if ((_context.Students.Any(e => e.StuIdentification == studentDTO.Identification)))
            {
                throw new Exception("Este estudiante ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
            }

            studentDTO.ID = 0;
            Student student = new(studentDTO);
            _context.Students.Add(student);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible crear el estudiante, revise la información e intente de nuevo");
            }

            return CreatedAtAction("GetStudent", new { id = student.StudentID }, student);
        }

        /// <summary>
        /// Método que permite eliminar un estudiante en la base de datos usando como filtro su id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"> Excepción si el estudiante no existe y en caso de otros errores </exception>
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student =  _context.Students.Find(id);
            if (student == null)
            {
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Students.Remove(student);

            try
            {
                 _context.SaveChanges();
            }
            catch
            {
                throw new Exception("No fue posible eliminar el registro");
            }

            return NoContent();
        }

        /// <summary>
        /// Método que confirma si un estudiante existe usando como filro el id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentID == id)).GetValueOrDefault();
        }

    }
}
