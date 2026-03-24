using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Channels
{
    public class UpdateChannelRequest
    {
        [MaxLength(30, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? Handle { get; set; }

        [MaxLength(50, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string? DisplayName { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Description { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? AvatarUrl { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? BannerUrl { get; set; }
    }
}
