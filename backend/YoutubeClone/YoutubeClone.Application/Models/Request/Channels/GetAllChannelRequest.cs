namespace YoutubeClone.Application.Models.Request.Channels
{
    public class GetAllChannelRequest
    {
        public int Limit { get; set; }

        public int Offset { get; set; }

        public string? Handle { get; set; }

        public string? DisplayName { get; set; }
    }
}
