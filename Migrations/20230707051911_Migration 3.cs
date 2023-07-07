using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoSincoVersionOne.Migrations
{
    /// <inheritdoc />
    public partial class Migration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Historials_Materias_MateriaID",
                table: "Historials");

            migrationBuilder.DropForeignKey(
                name: "FK_Historials_Students_StudentID",
                table: "Historials");

            migrationBuilder.AddForeignKey(
                name: "FK_Historials_Materias_MateriaID",
                table: "Historials",
                column: "MateriaID",
                principalTable: "Materias",
                principalColumn: "MateriaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Historials_Students_StudentID",
                table: "Historials",
                column: "StudentID",
                principalTable: "Students",
                principalColumn: "StudentID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Historials_Materias_MateriaID",
                table: "Historials");

            migrationBuilder.DropForeignKey(
                name: "FK_Historials_Students_StudentID",
                table: "Historials");

            migrationBuilder.AddForeignKey(
                name: "FK_Historials_Materias_MateriaID",
                table: "Historials",
                column: "MateriaID",
                principalTable: "Materias",
                principalColumn: "MateriaID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Historials_Students_StudentID",
                table: "Historials",
                column: "StudentID",
                principalTable: "Students",
                principalColumn: "StudentID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
