using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Users
{
    public class UpdateUserRequest
    {
        [MaxLength(30, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? Username { get; set; }

        [MaxLength(50, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? DisplayName { get; set; }

        [MaxLength(60, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        [EmailAddress(ErrorMessage = ValidationConstants.EMAIL)]
        public string? Email { get; set; }

        public DateOnly? Bithday { get; set; }

        [MaxLength(30, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? Country { get; set; }
    }
}
