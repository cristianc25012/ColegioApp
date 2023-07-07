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
        [HttpPut]
        public async Task<IActionResult> PutStudent(StudentDTO studentDTO)
        {
            Student student = CreateStudent(studentDTO);
            student.StudentID = studentDTO.ID;
            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(student.StudentID))
                {
                    throw new Exception("Estudiante no encontrado con id suministrado");
                }
                else
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
            if(studentDTO.Age >= 0 && studentDTO.Age < 200)
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
            else
            {
                throw new Exception("La edad del estudiante debe ser un número positivo menor a 200");
            }
        }
    }
}
