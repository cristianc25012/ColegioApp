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
    public class HistorialAcademicoesController : ControllerBase
    {
        private readonly ContextDB _context;

        public HistorialAcademicoesController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/HistorialAcademicoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialAcademico>>> GetHistorials()
        {
          if (_context.Historials == null)
          {
              return NotFound();
          }
            return await _context.Historials.ToListAsync();
        }

        // GET: api/HistorialAcademicoes/5
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
                return NotFound();
            }

            return historialAcademico;
        }

        // PUT: api/HistorialAcademicoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorialAcademico(int id, HistorialAcademico historialAcademico)
        {
            if (id != historialAcademico.HistorialID)
            {
                return BadRequest();
            }

            _context.Entry(historialAcademico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialAcademicoExists(id))
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

        // POST: api/HistorialAcademicoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistorialAcademico>> PostHistorialAcademico(HistorialAcademico historialAcademico)
        {
          if (_context.Historials == null)
          {
              return Problem("Entity set 'ContextDB.Historials'  is null.");
          }
            _context.Historials.Add(historialAcademico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistorialAcademico", new { id = historialAcademico.HistorialID }, historialAcademico);
        }

        // DELETE: api/HistorialAcademicoes/5
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
                return NotFound();
            }

            _context.Historials.Remove(historialAcademico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialAcademicoExists(int id)
        {
            return (_context.Historials?.Any(e => e.HistorialID == id)).GetValueOrDefault();
        }
    }
}
