using AutoMapper;
using Karma.Models.Commands;
using Karma.Models.Responses;

namespace Karma.Services.MapperProfiles
{
    public class UserMapperProfile: Profile
    {
        public UserMapperProfile()
        {
            CreateMap<Domain.Entities.User, UserResponse>();
            CreateMap<UserUpdateCommand,Domain.Entities.User>();
            CreateMap<Domain.Entities.User, UserCommand>();
            CreateMap<UserCommand, Domain.Entities.User>();
        }
    }
};