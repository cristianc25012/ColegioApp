using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.Models
{
    public class Materia
    {
        [Key]
        public int MateriaID { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string MateriaName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string MateriaCode { get; set; }
        //Foreign Key
        public int ProfesorID { get; set; }
        public virtual Profesor ProfesorFK { get; set; }
        //Foreign Key 2
        [ForeignKey("MateriaVistaID")]
        public virtual ICollection<HistorialAcademico> HistorialFK { get; set; }

    }
}
