using Karma.Domain.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Karma.Domain.Infrastructure
{
    public class UserDbContext : DbContext
    {
        public DbSet<Entities.User> Users { get; set; }
        
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
        }
    }
};