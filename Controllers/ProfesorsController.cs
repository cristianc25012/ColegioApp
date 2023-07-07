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
    public class ProfesorsController : ControllerBase
    {
        private readonly ContextDB _context;

        public ProfesorsController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Profesors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> GetProfes()
        {
          if (_context.Profes == null)
          {
              return NotFound();
          }
            return await _context.Profes.ToListAsync();
        }

        // GET: api/Profesors/5
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
                return NotFound();
            }

            return profesor;
        }

        // PUT: api/Profesors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfesor(int id, string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {

            Profesor profesor = CreateProfesor(Nombres, Apellidos, NumeroDeIdentificacion, Direccion, Telefono, Edad);
            profesor.ProfesorID = id;
            _context.Entry(profesor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Profesors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Profesor>> PostProfesor(string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {
          if (_context.Profes == null)
          {
              return Problem("Entity set 'ContextDB.Profes'  is null.");
          }
            Profesor profesor = CreateProfesor(Nombres, Apellidos, NumeroDeIdentificacion, Direccion, Telefono, Edad);

            _context.Profes.Add(profesor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfesor", new { id = profesor.ProfesorID }, profesor);
        }

        // DELETE: api/Profesors/5
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
                return NotFound();
            }

            _context.Profes.Remove(profesor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        private Profesor CreateProfesor(string Nombres, string Apellidos, string NumeroDeIdentificacion,
            string Direccion, string Telefono, int Edad)
        {
            Profesor profesor = new()
            {
                ProfeName = Nombres,
                ProfeLastName = Apellidos,
                ProfeIdentification = NumeroDeIdentificacion,
                ProfeAddress = Direccion,
                ProfePhoneNumber = Telefono,
                ProfeAge = Edad
            };

            return profesor;
        }
    }
}
