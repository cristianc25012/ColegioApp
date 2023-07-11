using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.DTOs;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ContextDB _context;

        public StudentsController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            return await _context.Students.ToListAsync();
        }

        // GET: api/Students/5
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

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(StudentDTO studentDTO)
        {
            
            Student student = CreateStudent(studentDTO);
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

            if ((_context.Students.Any(e => e.StuIdentification == studentDTO.Identification)) && consulta.Count()==0)
            {
                throw new Exception("Este estudiante ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
            }

            else
            {
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {

                    throw new Exception("No fue posible editar el profesor, revise los datos e intente de nuevo");
                }
            }

            return NoContent();
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(StudentDTO studentDTO)
        {
          if (_context.Students == null)
          {
              return Problem("Entity set 'ContextDB.Students'  is null.");
          }


            if ((_context.Students.Any(e => e.StuIdentification == studentDTO.Identification)))
            {
                throw new Exception("Este estudiante ya se encuentra registrado y no puede volver a ser creado, utilice la opción editar registro");
            }

            studentDTO.ID = 0;
            Student student = CreateStudent(studentDTO);
            _context.Students.Add(student);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible crear el estudiante, revise los datos e intente de nuevo");
            }

            return CreatedAtAction("GetStudent", new { id = student.StudentID }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Students.Remove(student);

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

        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentID == id)).GetValueOrDefault();
        }

        private Student CreateStudent(StudentDTO studentDTO)
        {
            if(studentDTO.Age < 0 || studentDTO.Age > 200)
            {
                throw new Exception("La edad del estudiante debe ser un número positivo menor a 200");
            }
            else
            {
                Student student = new()
                {
                    StuName = studentDTO.Name,
                    StuAddress = studentDTO.Address,
                    StuIdentification = studentDTO.Identification,
                    StuLastName = studentDTO.LastName,
                    StuPhoneNumber = studentDTO.PhoneNumber,
                    Age = studentDTO.Age
                };
                return student;
            }
        }
    }
}
