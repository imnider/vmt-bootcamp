using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Channels
{
    public class CreateChannelRequest
    {
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(30, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string Handle { get; set; } = null!;

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(50, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string DisplayName { get; set; } = null!;

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Description { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? AvatarUrl { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? BannerUrl { get; set; }
    }
}
