using Karma.Domain.Infrastructure;
using Karma.Services.Abstractions;
using Karma.Services.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Karma.Services.Configurations
{
    public static class DependencyInjection
    {
        
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            
            return services;
        }
        
        public static IServiceCollection AddDbContextDependencies(this IServiceCollection services, string cnx)
        {
            services.AddDbContext<DbContext, UserDbContext>(options =>
            {
                var mycnx = cnx;
                options.UseSqlServer(cnx);
            });

            return services;
        }
    }
};