using Karma.Models.Commands;
using Karma.Models.Responses;

namespace Karma.Services.Abstractions
{
    public interface IUserService
    {
        string GreatUserAsync();
        Task<List<UserResponse>> GetUsersAsync();
        Task<BaseResponse> CreateUserAsync(UserCommand command);
        Task<BaseResponse> UpdateUserAsync(UserUpdateCommand command);
        Task<BaseResponse> DeleteUserAsync(Guid id);
    }
};