using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutStudent(int ID, string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {
            Student student = CreateStudent(Nombres, Apellidos, NumeroDeIdentificacion, Direccion, Telefono, Edad);
            student.StudentID = ID;
            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(student.StudentID))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception("estudiante no encontrado con id ");
                }
            }

            return NoContent();
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {
          if (_context.Students == null)
          {
              return Problem("Entity set 'ContextDB.Students'  is null.");
          }
            Student student = CreateStudent(Nombres, Apellidos, NumeroDeIdentificacion, Direccion, Telefono, Edad);
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

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
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentID == id)).GetValueOrDefault();
        }

        private Student CreateStudent(string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {
            Student student = new()
            {
                StuName = Nombres,
                StuLastName = Apellidos,
                StuIdentification = NumeroDeIdentificacion,
                StuAddress = Direccion,
                StuPhoneNumber = Telefono,
                Age = Edad
            };
            return student;
        }
    }
}
