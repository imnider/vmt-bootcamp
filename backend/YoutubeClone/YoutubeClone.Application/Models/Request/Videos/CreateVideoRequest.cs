using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Videos
{
    public class CreateVideoRequest
    {
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public Guid ChannelId { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string Title { get; set; } = null!;

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Description { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public int DurationSeconds { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string ThumbnailUrl { get; set; } = null!;

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public bool AgeRestriction { get; set; }
    }
}
