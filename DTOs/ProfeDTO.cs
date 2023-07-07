using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoSincoVersionOne.DTOs
{
    public class ProfeDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Identification { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
    }
}
