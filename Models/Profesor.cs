using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.Models
{
    public class Profesor
    {
        [Key]
        public int ProfesorID { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ProfeName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ProfeLastName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ProfeIdentification { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string ProfePhoneNumber { get; set; }
        [Required]
        public int ProfeAge { get; set; }
        [Column(TypeName = "varchar(150)")]
        public string ProfeAddress { get; set; }
        
        //Foreign Key
        [ForeignKey("MateriaProfesorID")]
        public virtual ICollection<Materia> MateriaFK { get; set; }
    }
}
