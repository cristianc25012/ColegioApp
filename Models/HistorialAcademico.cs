using System.ComponentModel.DataAnnotations;

namespace ProyectoSincoVersionOne.Models
{
    public class HistorialAcademico
    {
        [Key]
        public int HistorialID { get; set; }
        [Required]
        public int Year { get; set; }
        public float Grade { get; set; }
        //Foreign Key 1 
        public int StudentID { get; set; }
        public virtual Student StudentFK { get; set; }

        //Foreign Key 2 
        public int MateriaID { get; set; }
        public virtual Materia MateriaFK { get; set; }
    }
}
