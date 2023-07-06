﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProyectoSincoVersionOne.Models;

#nullable disable

namespace ProyectoSincoVersionOne.Migrations
{
    [DbContext(typeof(ContextDB))]
    [Migration("20230706051602_Initial Create")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.HistorialAcademico", b =>
                {
                    b.Property<int>("HistorialID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HistorialID"));

                    b.Property<float>("Grade")
                        .HasColumnType("real");

                    b.Property<int>("MateriaVistaID")
                        .HasColumnType("int");

                    b.Property<int>("StudentHistoryID")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("HistorialID");

                    b.HasIndex("MateriaVistaID");

                    b.HasIndex("StudentHistoryID");

                    b.ToTable("Historials");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Materia", b =>
                {
                    b.Property<int>("MateriaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MateriaID"));

                    b.Property<string>("MateriaCode")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("MateriaName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int>("MateriaProfesorID")
                        .HasColumnType("int");

                    b.HasKey("MateriaID");

                    b.HasIndex("MateriaProfesorID");

                    b.ToTable("Materias");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Profesor", b =>
                {
                    b.Property<int>("ProfesorID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProfesorID"));

                    b.Property<string>("ProfeAddress")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<int>("ProfeAge")
                        .HasColumnType("int");

                    b.Property<string>("ProfeIdentification")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ProfeLastName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ProfeName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("ProfePhoneNumber")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("ProfesorID");

                    b.ToTable("Profes");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Student", b =>
                {
                    b.Property<int>("StudentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("StuAddress")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<string>("StuIdentification")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StuLastName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StuName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("StuPhoneNumber")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("StudentID");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.HistorialAcademico", b =>
                {
                    b.HasOne("ProyectoSincoVersionOne.Models.Materia", "MateriaVista")
                        .WithMany("HistorialMaterias")
                        .HasForeignKey("MateriaVistaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ProyectoSincoVersionOne.Models.Student", "StudentHistory")
                        .WithMany("HistorialAcademicos")
                        .HasForeignKey("StudentHistoryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MateriaVista");

                    b.Navigation("StudentHistory");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Materia", b =>
                {
                    b.HasOne("ProyectoSincoVersionOne.Models.Profesor", "ProfesorEncargado")
                        .WithMany("Materias")
                        .HasForeignKey("MateriaProfesorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProfesorEncargado");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Materia", b =>
                {
                    b.Navigation("HistorialMaterias");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Profesor", b =>
                {
                    b.Navigation("Materias");
                });

            modelBuilder.Entity("ProyectoSincoVersionOne.Models.Student", b =>
                {
                    b.Navigation("HistorialAcademicos");
                });
#pragma warning restore 612, 618
        }
    }
}
