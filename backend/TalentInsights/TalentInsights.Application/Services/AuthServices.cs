using Microsoft.Extensions.Configuration;
using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.Requests.Auth;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Domain.Exceptions;
using TalentInsights.Domain.Interfaces.Repositories;
using TalentInsights.Shared;

namespace TalentInsights.Application.Services
{
    public class AuthServices(ICollaboratorRepository collaboratorRepository, IConfiguration configuration, ICacheService cacheService) : IAuthService
    {
        public async Task<GenericResponse<string>> Login(LoginAuthRequest model)
        {
            var collaborator = await collaboratorRepository.Get(model.Email)
                ?? throw new BadRequestException("Usuario o contraseña incorrectos");

            var validatePassword = Hasher.ComparePassword(model.Password, collaborator.Password);
            if (!validatePassword)
            {
                throw new BadRequestException("Usuario o contraseña incorrectos");
            }

            var token = TokenHelper.Create(collaborator, configuration, cacheService);

            cacheService.Create($"auth:tokens:{token}", TimeSpan.FromMinutes(5), token);
            return ResponseHelper.Create(token);
        }
    }
}
