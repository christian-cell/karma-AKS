using Karma.Domain.Infrastructure;
using Karma.Models.Commands;
using Karma.Models.Responses;
using Karma.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karma.API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    
    public class UserController : Base
    {
        
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly IServiceProvider _serviceProvider;

        public UserController(ILogger<UserController> logger, IUserService userService, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _userService = userService;
            _serviceProvider = serviceProvider;
        }
        
        [HttpGet ("GreatUser")]
        [EnableCors("DevCors")]
        public string GreatingUsers()
        {
            var sales = _userService.GreatUserAsync();
            
            return sales;
        }
        
        [HttpGet]
        [EnableCors("DevCors")]
        public async Task<ActionResult<List<UserResponse>>> GetUsersAsync()
        {
            var sales = await _userService.GetUsersAsync();
            
            return Ok(sales);
        }

        [HttpPost]
        [EnableCors("DevCors")]
        public async Task<ActionResult<BaseResponse>> CreateUserAsync([FromBody] UserCommand command)
        {
            var response = await _userService.CreateUserAsync(command);
            
            return Ok(response);
        }

        [HttpPut]
        [EnableCors("DevCors")]
        public async Task<ActionResult<BaseResponse>> UpdateUserAsync([FromBody] UserUpdateCommand command)
        {
            var response = await _userService.UpdateUserAsync(command);

            return Ok(response);
        }

        [HttpDelete]
        [EnableCors("DevCors")]
        public async Task<ActionResult<BaseResponse>> DeleteUserAsync(Guid id)
        {
            var response = await _userService.DeleteUserAsync(id);
            return Ok(response);
        }
        
        [HttpPost("migrate")]
        public IActionResult MigrateDatabase()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<UserDbContext>();

                try
                {
                    Console.WriteLine("Checking for pending migrations...");
                    var pendingMigrations = dbContext.Database.GetPendingMigrations().ToList();

                    if (pendingMigrations.Any())
                    {
                        Console.WriteLine($"Pending migrations found: {string.Join(", ", pendingMigrations)}");
                        dbContext.Database.Migrate();
                        Console.WriteLine("Database migration completed successfully.");
                        return Ok("Database migration completed successfully.");
                    }
                    else
                    {
                        Console.WriteLine("No pending migrations found.");
                        return Ok("No pending migrations found.");
                    }
                }
                catch (Exception ex)
                {
                    // Log the error (you can use any logging framework)
                    Console.WriteLine($"An error occurred while migrating the database: {ex.Message}");
                    return StatusCode(500, $"An error occurred while migrating the database: {ex.Message}");
                }
            }
        }
    }
};