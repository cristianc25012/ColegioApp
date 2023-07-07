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
    public class MateriasController : ControllerBase
    {
        private readonly ContextDB _context;

        public MateriasController(ContextDB context)
        {
            _context = context;
        }
        /// <summary>
        ///  metodo que obtiene las materias
        /// </summary>
        /// <returns></returns>
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Materia>>> GetMaterias()
        {
          if (_context.Materias == null)
          {
              return NotFound();
          }
            return await _context.Materias.ToListAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">id de meateria a consultar</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Materia>> GetMateria(int id)
        {
          if (_context.Materias == null)
          {
              return NotFound();
          }
            var materia = await _context.Materias.FindAsync(id);

            if (materia == null)
            {
                return NotFound();
            }

            return materia;
        }

        // PUT: api/Materias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMateria(int id, String nombre, String codigo, int profeEncargadoID)
        {
            Materia materia = CreateMateria(nombre, codigo, profeEncargadoID);
            materia.MateriaID = id;
            _context.Entry(materia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MateriaExists(id))
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

        // POST: api/Materias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Materia>> PostMateria(String nombre, String codigo, int profeEncargadoID)
        {
          if (_context.Materias == null)
          {
              return Problem("Entity set 'ContextDB.Materias'  is null.");
          }
            Materia materia = CreateMateria(nombre, codigo, profeEncargadoID);
            _context.Materias.Add(materia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMateria", new { id = materia.MateriaID }, materia);
        }

        // DELETE: api/Materias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMateria(int id)
        {
            if (_context.Materias == null)
            {
                return NotFound();
            }
            var materia = await _context.Materias.FindAsync(id);
            if (materia == null)
            {
                return NotFound();
            }

            _context.Materias.Remove(materia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MateriaExists(int id)
        {
            return (_context.Materias?.Any(e => e.MateriaID == id)).GetValueOrDefault();
        }

        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        private Materia CreateMateria(String nombre, String codigo, int profeEncargadoID)
        {
            if (ProfesorExists(profeEncargadoID))
            {
                if((_context.Materias.Any(e => e.MateriaCode == codigo)))
                {
                    throw new Exception(" Esta Materia ya esta asignada con otro profesor");
                }
                else
                {
                    Materia materia = new()
                    {
                        MateriaName = nombre,
                        MateriaCode = codigo,
                        ProfesorID = profeEncargadoID

                    };
                    return materia;
                }
            }
            else
                throw new Exception(" Este Profesor no existe");
        }
    }
}
