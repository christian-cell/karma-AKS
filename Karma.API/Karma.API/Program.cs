using Karma.Domain.Entities;
using Karma.Domain.Infrastructure;
using Karma.Services.Configurations;
using Karma.Services.MapperProfiles;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

namespace Karma.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            
            // Azure AD Authentication
            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("Azure:Ad"))
                .EnableTokenAcquisitionToCallDownstreamApi()
                .AddInMemoryTokenCaches();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(
                c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Karma Web API", Version = "v1" });

                    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                    {
                        Description = "Karma AD",
                        Name = "Karma Azure Directory",
                        Type = SecuritySchemeType.OAuth2,
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri(string.Format(builder.Configuration["Azure:Ad:AuthorizationUrl"]!, builder.Configuration["Azure:Ad:Instance"]!, builder.Configuration["Azure:Ad:TenantId"]!)),
                                Scopes = new Dictionary<string, string>
                                {
                                    { builder.Configuration["Azure:Ad:Scopes"]!, "profile" }
                                }
                            }
                        }
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                            },
                            new[] { "" }
                        }
                    });
                });
            builder.Services.AddServices();
            builder.Services
                .AddAutoMapper(typeof(UserMapperProfile).Assembly, typeof(User).Assembly);
             
            builder.Services.AddDbContextDependencies(builder.Configuration["Azure:SQL:DockerConnectionString"]!);
            //builder.Services.AddDbContextDependencies(builder.Configuration["Azure:SQL:ConnectionString"]!);
             
            /*
             * just a reminder : stop program compilation and go to Domains location
             * dotnet ef migrations add Users --context UserDbContext --output-dir Migrations --startup-project ../Karma.API
             * dotnet ef database update --context UserDbContext --startup-project ../Karma.API
             */
            

            builder.Services.AddCors((options) =>
            {
                options.AddPolicy("DevCors", (corsBuilder) =>
                {
                    corsBuilder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
                options.AddPolicy("ProdCors", (corsBuilder) =>
                {
                    corsBuilder.WithOrigins("https://myProdWebSite.com")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            var app = builder.Build();
            
            if (app.Environment.IsDevelopment())
            {
                app.UseCors("DevCors");
                app.UseSwagger();
            }
            else
            {
                app.UseCors("ProdCors");
                app.UseHttpsRedirection();
                app.UseSwagger();
            }
            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Karma API v1");
                c.OAuthClientId(builder.Configuration["Azure:Ad:ClientId"]!);
                c.OAuthScopeSeparator(" ");
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            
            /*using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<UserDbContext>();

                if (dbContext.Database.GetPendingMigrations().Any())
                {
                    dbContext.Database.Migrate();
                }
            }*/

            app.Run();
        }
    }
};