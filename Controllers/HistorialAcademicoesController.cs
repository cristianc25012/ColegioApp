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
                throw new Exception("Historial Academico no encontrado con id suministrado");
            }

            return historialAcademico;
        }

        // PUT: api/HistorialAcademicoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorialAcademico(HistorialDTO historialDTO)
        {
            HistorialAcademico historialAcademico = CreateHistorial(historialDTO);
            historialAcademico.HistorialID = historialDTO.ID;
            _context.Entry(historialAcademico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialAcademicoExists(historialAcademico.HistorialID))
                {
                    throw new Exception("Historial Academico no encontrado con id suministrado");
                }
                else
                {
                    throw new Exception("No fue posible editar el historial academico, revise los datos e intente de nuevo");
                }
            }

            return NoContent();
        }

        // POST: api/HistorialAcademicoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistorialAcademico>> PostHistorialAcademico(HistorialDTO historialDTO)
        {
          if (_context.Historials == null)
          {
              return Problem("Entity set 'ContextDB.Historials'  is null.");
          }
            historialDTO.ID = 0;
            HistorialAcademico historialAcademico = CreateHistorial(historialDTO);
            _context.Historials.Add(historialAcademico);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("No fue posible crear el historial academico, revise los datos e intente de nuevo");
            }

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
                throw new Exception("No fue posible eliminar el registro, el registro no existe");
            }

            _context.Historials.Remove(historialAcademico);
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

        private bool HistorialAcademicoExists(int id)
        {
            return (_context.Historials?.Any(e => e.HistorialID == id)).GetValueOrDefault();
        }

        private HistorialAcademico CreateHistorial(HistorialDTO historialDTO)
        {
            var consulta = (from historial in _context.Historials
                            where historial.Year == historialDTO.PeriodoAcademico &&
                            historial.MateriaID == historialDTO.MateriaID &&
                            historial.StudentID == historialDTO.StudentID
                            select historial);

            if (historialDTO.Calificacion < 0 || historialDTO.Calificacion > 5)
            {
                throw new Exception("La calificación debe ser un número positivo menor o igual a 5.00");
            }
            else if (historialDTO.PeriodoAcademico < 0 || historialDTO.PeriodoAcademico > 2050)
            {
                throw new Exception("El periodo academico debe ser un número positivo menor a 2050");
            }
            else if (!(_context.Students.Any(e => e.StudentID == historialDTO.StudentID)))
            {
                throw new Exception("El estudiante suministrado no existe");
            }
            else if (!(_context.Materias.Any(e => e.MateriaID == historialDTO.MateriaID)))
            {
                throw new Exception("La Materia suministrada no existe");
            }
            else if (consulta.Count()>0)
                {
                  throw new Exception("El estudiante ya tiene asignada la materia "+ _context.Materias.Find(historialDTO.MateriaID).MateriaName + " para el periodo academico " + historialDTO.PeriodoAcademico);
                }
            else
            {
                HistorialAcademico historialAcademico = new()
                {
                    Year = historialDTO.PeriodoAcademico,
                    Grade = historialDTO.Calificacion,
                    MateriaID = historialDTO.MateriaID,
                    StudentID = historialDTO.StudentID
                };

                return historialAcademico;
            }
        }
    }
}
