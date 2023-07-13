using ProyectoSincoVersionOne.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.Models
{
    [Serializable]
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
        public string StuAddress { get; set; }

        //Foreign Key
        [ForeignKey("StudentHistoryID")]
        public ICollection<HistorialAcademico> HistorialFK { get; set; }

        public Student() {}
        public Student(StudentDTO studentDTO)
        {

            if (studentDTO.Age < 0 || studentDTO.Age > 200)
            {
                throw new Exception("La edad del estudiante debe ser un número positivo menor a 200");
            }

            this.StuName = studentDTO.Name;
            this.StuAddress = studentDTO.Address;
            this.StuIdentification = studentDTO.Identification;
            this.StuLastName = studentDTO.LastName;
            this.StuPhoneNumber = studentDTO.PhoneNumber;
            this.Age = studentDTO.Age;

        }
    }
}
