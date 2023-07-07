namespace ProyectoSincoVersionOne.DTOs
{
    public class Reporte
    {
        public int AnhoAcademico { get; set; }
        public string IdentificacionEstudiante { get; set; }

        public string NombreEstudiante { get; set; }

        public string NombreMateria { get; set; }

        public string CodigoMateria { get; set; }

        public string IdentificacionProfesor { get; set; }

        public string NombreProfesor { get; set; }

        public float CalificacionFinal { get; set; }

        public bool Aprobacion { get; set; }
    }
}
