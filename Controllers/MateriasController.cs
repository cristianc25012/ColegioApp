using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.DTOs;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Controllers
{
    /// <summary>
    /// Controlador de la tabla Materias, permite crear, editar, consultar, consultar por ID y eliminar
    /// Adicionalmente se encarga de verificar la informacion y lanzar excepciones según sea necesario
    /// a fin de evitar registros no deseados y manejar de forma correcta los posibles errores durante su 
    /// implementacion
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {
        private readonly ContextDB _context;

        /// <summary>
        /// Recibe como contexto el modelo de base de datos y crea una instancia de este
        /// </summary>
        /// <param name="context"></param>
        public MateriasController(ContextDB context)
        {
            _context = context;
        }
        /// <summary>
        ///  metodo que obtiene todas las materias en la base de datos 
        /// </summary>
        /// <returns></returns
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
        ///  metodo que obtiene una materia en la base de datos usando id como filtro
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

        /// <summary>
        /// metodo que edita una materia en la base de datos usando id como filtro
        /// </summary>
        /// <param name="materiaDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMateria(MateriaDTO materiaDTO)
        {
            Materia materia = CreateMateria(materiaDTO);
            materia.MateriaID = materiaDTO.MateriaID;
            _context.Entry(materia).State = EntityState.Modified;

            var consulta = (from m in _context.Materias
                            where m.MateriaID == materiaDTO.MateriaID &&
                            m.MateriaCode == materiaDTO.MateriaCode
                            select m);

            if ((_context.Materias.Any(e => e.MateriaCode == materiaDTO.MateriaCode)) && consulta.Count()==0)
            {
                throw new Exception("Esta Materia ya se encuentra registrada y no puede volver a ser creada, utilice la opción editar registro");
            }


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

        /// <summary>
        ///  metodo que crea una materia en la base de datos 
        /// </summary>
        /// <param name="materiaDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
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

        /// <summary>
        /// metodo que elimina una materia en la base de datos usando id como filtro
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
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

        /// <summary>
        /// metodo que confirma si una materia existe
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool MateriaExists(int id)
        {
            return (_context.Materias?.Any(e => e.MateriaID == id)).GetValueOrDefault();
        }

        /// <summary>
        /// metodo que confirma si un profesor existe
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool ProfesorExists(int id)
        {
            return (_context.Profes?.Any(e => e.ProfesorID == id)).GetValueOrDefault();
        }

        /// <summary>
        ///  Método que permite crear una nueva materia temporal a partir de una materiaDTO
        /// </summary>
        /// <param name="materiaDTO"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
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
