using System.ComponentModel.DataAnnotations;
using TalentInsights.Shared.Constants;

namespace TalentInsigts.Application.Models.Request.Collaborator
{
    public class UpdateCollaboratorRequest
    {
        [MaxLength(150, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? FullName { get; set; }
        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? GitlabProfile { get; set; }
        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? Position { get; set; }
    }
}
