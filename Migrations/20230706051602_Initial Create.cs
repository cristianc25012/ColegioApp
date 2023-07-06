using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoSincoVersionOne.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Profes",
                columns: table => new
                {
                    ProfesorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfeName = table.Column<string>(type: "varchar(50)", nullable: false),
                    ProfeLastName = table.Column<string>(type: "varchar(50)", nullable: false),
                    ProfeIdentification = table.Column<string>(type: "varchar(50)", nullable: false),
                    ProfePhoneNumber = table.Column<string>(type: "varchar(50)", nullable: false),
                    ProfeAge = table.Column<int>(type: "int", nullable: false),
                    ProfeAddress = table.Column<string>(type: "varchar(150)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profes", x => x.ProfesorID);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StuName = table.Column<string>(type: "varchar(50)", nullable: false),
                    StuLastName = table.Column<string>(type: "varchar(50)", nullable: false),
                    StuIdentification = table.Column<string>(type: "varchar(50)", nullable: false),
                    StuPhoneNumber = table.Column<string>(type: "varchar(50)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    StuAddress = table.Column<string>(type: "varchar(150)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentID);
                });

            migrationBuilder.CreateTable(
                name: "Materias",
                columns: table => new
                {
                    MateriaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MateriaName = table.Column<string>(type: "varchar(50)", nullable: false),
                    MateriaCode = table.Column<string>(type: "varchar(50)", nullable: false),
                    MateriaProfesorID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materias", x => x.MateriaID);
                    table.ForeignKey(
                        name: "FK_Materias_Profes_MateriaProfesorID",
                        column: x => x.MateriaProfesorID,
                        principalTable: "Profes",
                        principalColumn: "ProfesorID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Historials",
                columns: table => new
                {
                    HistorialID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Grade = table.Column<float>(type: "real", nullable: false),
                    StudentHistoryID = table.Column<int>(type: "int", nullable: false),
                    MateriaVistaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Historials", x => x.HistorialID);
                    table.ForeignKey(
                        name: "FK_Historials_Materias_MateriaVistaID",
                        column: x => x.MateriaVistaID,
                        principalTable: "Materias",
                        principalColumn: "MateriaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Historials_Students_StudentHistoryID",
                        column: x => x.StudentHistoryID,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Historials_MateriaVistaID",
                table: "Historials",
                column: "MateriaVistaID");

            migrationBuilder.CreateIndex(
                name: "IX_Historials_StudentHistoryID",
                table: "Historials",
                column: "StudentHistoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Materias_MateriaProfesorID",
                table: "Materias",
                column: "MateriaProfesorID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Historials");

            migrationBuilder.DropTable(
                name: "Materias");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Profes");
        }
    }
}
