using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.DTOs
{
    public class MateriaDTO
    {
        public int MateriaID { get; set; }
        public string MateriaName { get; set; }
        public string MateriaCode { get; set; }
        public int ProfesorID { get; set; }
    }
}
