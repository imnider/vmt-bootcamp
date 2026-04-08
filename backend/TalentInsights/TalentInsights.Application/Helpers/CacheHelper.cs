using Microsoft.Extensions.Configuration;
using TalentInsights.Application.Models.Helpers;
using TalentInsights.Shared.Constants;

namespace TalentInsights.Application.Helpers
{
    public static class CacheHelper
    {
        public static CacheKey AuthToken(string token, TimeSpan expiration)
        {
            return new CacheKey
            {
                Key = $"auth:tokens:{token}",
                Expiration = expiration
            };
        }

        public static CacheKey AuthRefreshToken(string value, IConfiguration configuration)
        {
            return new CacheKey
            {
                Key = $"auth:refresh_tokens:{value}",
                Expiration = TimeSpan.FromMinutes(Convert.ToInt32(configuration[ConfigurationConstants.AUTH_REFRESH_TOKEN_EXPIRATION_IN_DAYS] ?? "30"))
            };
        }
    }
}
