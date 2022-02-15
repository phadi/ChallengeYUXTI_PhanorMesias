using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Challenge_Back.ModelsDB
{
    public partial class ChallengeYuxiPMContext : DbContext
    {
        string _connStr;
        public ChallengeYuxiPMContext()
        {
        }

        public ChallengeYuxiPMContext(string connStr)
        {
            _connStr = connStr;
        }

        public ChallengeYuxiPMContext(DbContextOptions<ChallengeYuxiPMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LocationDb> LocationDb { get; set; }
        public static IConfiguration Configuration { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connection = string.IsNullOrEmpty(_connStr) ? Configuration.GetConnectionString("BdLocationDBContext") : _connStr;
                optionsBuilder.UseSqlServer(connection);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocationDb>(entity =>
            {
                entity.ToTable("LocationDB");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
