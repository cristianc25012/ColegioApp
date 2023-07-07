using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.Models
{
    public class Student
    {
        [Key]
        public int StudentID { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string StuName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string StuLastName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string StuIdentification { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string StuPhoneNumber { get; set; }
        [Required]
        public int Age { get; set; }
        [Column(TypeName = "varchar(150)")]
        public string StuAddress { get; set;}

        //Foreign Key
        [ForeignKey("StudentHistoryID")]
        public ICollection<HistorialAcademico> HistorialFK { get; set; }
    }
}
