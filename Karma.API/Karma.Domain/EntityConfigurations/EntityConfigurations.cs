using Karma.Repository.EntityConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karma.Domain.EntityConfigurations
{
    public class UserEntityConfiguration: BaseEntityConfiguration<Entities.User>
    {
        protected override void ConfigureDomainEntity(EntityTypeBuilder<Entities.User> builder)
        {
            builder.Property(x => x.FirstName).IsRequired();
            builder.Property(x => x.LastName).IsRequired();
            builder.Property(x => x.DocumentNumber).IsRequired();
            builder.Property(x => x.Email).IsRequired();
            builder.Property(x => x.Active).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.Age);
            
            builder.ToTable("Users" , "core");
        }
    }
};