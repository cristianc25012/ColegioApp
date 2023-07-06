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
        public int StudentHistoryID { get; set; }
        public virtual Student StudentHistory { get; set; }

        //Foreign Key 2 
        public int MateriaVistaID { get; set; }
        public virtual Materia MateriaVista { get; set; }
    }
}
