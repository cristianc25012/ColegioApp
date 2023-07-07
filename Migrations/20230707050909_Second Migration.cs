using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoSincoVersionOne.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_Profes_ProfesorID",
                table: "Materias");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_Profes_ProfesorID",
                table: "Materias",
                column: "ProfesorID",
                principalTable: "Profes",
                principalColumn: "ProfesorID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materias_Profes_ProfesorID",
                table: "Materias");

            migrationBuilder.AddForeignKey(
                name: "FK_Materias_Profes_ProfesorID",
                table: "Materias",
                column: "ProfesorID",
                principalTable: "Profes",
                principalColumn: "ProfesorID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
