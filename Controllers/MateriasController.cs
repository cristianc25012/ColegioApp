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
                throw new Exception("Materia no encontrada con id suministrado");
            }

            return materia;
        }

        // PUT: api/Materias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMateria(MateriaDTO materiaDTO)
        {
            Materia materia = CreateMateria(materiaDTO);
            materia.MateriaID = materiaDTO.MateriaID;
            _context.Entry(materia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MateriaExists(materiaDTO.MateriaID))
                {
                    throw new Exception("Materia no encontrada con id suministrado");
                }
                else
                {
                    throw new Exception("No fue posible editar la Materia, revise los datos e intente de nuevo");
                }
            }



            return NoContent();
        }

        // POST: api/Materias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Materia>> PostMateria(MateriaDTO materiaDTO)
        {
            if (_context.Materias == null)
            {
                return Problem("Entity set 'ContextDB.Materias'  is null.");
            }
            materiaDTO.MateriaID = 0;
            Materia materia = CreateMateria(materiaDTO);
            _context.Materias.Add(materia);

            if ((_context.Materias.Any(e => e.MateriaCode == materiaDTO.MateriaCode)))
            {
                throw new Exception("Esta Materia ya se encuentra registrada y no puede volver a ser creada, utilice la opción editar registro");
            }
            else
            {
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    throw new Exception("No fue posible crear la Materia, revise los datos e intente de nuevo");
                }
            }


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
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Materias.Remove(materia);

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

        private bool MateriaExists(int id)
        {
            return (_context.Materias?.Any(e => e.MateriaID == id)).GetValueOrDefault();
        }

        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        private Materia CreateMateria(MateriaDTO materiaDTO)
        {
            if (!ProfesorExists(materiaDTO.ProfesorID))
            {
                throw new Exception("El Profesor suministrado no existe");
            }
            else
            {
                Materia materia = new()
                {
                    MateriaName = materiaDTO.MateriaName,
                    MateriaCode = materiaDTO.MateriaCode,
                    ProfesorID = materiaDTO.ProfesorID
                };
                return materia;
            }
        }
    }
}
