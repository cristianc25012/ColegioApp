using Microsoft.EntityFrameworkCore;
using ProyectoSincoVersionOne.Models;

namespace ProyectoSincoVersionOne.Models
{
    public class ContextDB:DbContext
    {
        public ContextDB(DbContextOptions dbContextOptions) : base(dbContextOptions) { }
        
        public DbSet<Student> Students { get; set; }
        public DbSet<Profesor> Profes { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<HistorialAcademico> Historials { get; set; }
        
    }
}
