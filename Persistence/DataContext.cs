using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Game> Games { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {

        }
    }
}