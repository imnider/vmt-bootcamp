using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Videos
{
    public class UpdateVideoRequest
    {
        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Title { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? Description { get; set; }

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        public string? ThumbnailUrl { get; set; }

        public bool? AgeRestriction { get; set; }
    }
}
