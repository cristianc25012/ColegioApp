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
                throw new Exception("Profesor no encontrado con id suministrado");
            }

            return profesor;
        }

        // PUT: api/Profesors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfesor(ProfeDTO profeDTO)
        {

            Profesor profesor = CreateProfesor(profeDTO);
            profesor.ProfesorID = profeDTO.ID;
            _context.Entry(profesor).State = EntityState.Modified;

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

        // POST: api/Profesors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

            try
            {
                await _context.SaveChangesAsync();
            }
            catch {
                throw new Exception("No fue posible crear el profesor, revise los datos e intente de nuevo");
            }


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

        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        private Profesor CreateProfesor(ProfeDTO profeDTO)
        {
            if(profeDTO.Age >=0 && profeDTO.Age<200)
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
            else
            {
                throw new Exception("La edad del estudiante debe ser un número positivo menor a 200");
            }
            
        }
    }
}
