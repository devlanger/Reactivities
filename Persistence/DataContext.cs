using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<GameUser> GameUsers { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<GameUser>(g => g.HasKey(gu => new {gu.AppUserId, gu.GameId}));
            
            builder.Entity<GameUser>()
                .HasOne(u => u.AppUser)
                .WithMany(g => g.Games)
                .HasForeignKey(gu => gu.AppUserId);

            builder.Entity<GameUser>()
                .HasOne(u => u.Game)
                .WithMany(g => g.Participants)
                .HasForeignKey(gu => gu.GameId);
        }
    }
}