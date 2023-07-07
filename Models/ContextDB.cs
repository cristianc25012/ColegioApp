using Microsoft.EntityFrameworkCore;

namespace ProyectoSincoVersionOne.Models
{
    public class ContextDB:DbContext
    {
        public ContextDB(DbContextOptions dbContextOptions) : base(dbContextOptions) { }
        
        public DbSet<Student> Students { get; set; }
        public DbSet<Profesor> Profes { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<HistorialAcademico> Historials { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Student>()
              .HasMany(x => x.HistorialFK)
              .WithOne(x => x.StudentFK)
              .HasForeignKey(x => x.StudentID);

            modelBuilder.Entity<Profesor>()
              .HasMany(x => x.MateriaFK)
              .WithOne(x => x.ProfesorFK)
              .HasForeignKey(x => x.ProfesorID);

            modelBuilder.Entity<Materia>()
              .HasMany(x => x.HistorialFK)
              .WithOne(x => x.MateriaFK)
              .HasForeignKey(x => x.MateriaID);
        }

    }
}
