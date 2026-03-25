namespace YoutubeClone.Application.Models.Request.Videos
{
    public class GetAllVideosRequest
    {
        public int Limit { get; set; }

        public int Offset { get; set; }

        public string? Title { get; set; }
    }
}
