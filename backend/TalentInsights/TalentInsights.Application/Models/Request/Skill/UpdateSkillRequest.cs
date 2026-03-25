using System.ComponentModel.DataAnnotations;
using TalentInsights.Shared.Constants;

namespace TalentInsights.Application.Models.Request.Skill
{
    public class UpdateSkillRequest
    {
        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Name { get; set; }

        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Category { get; set; }
    }
}
