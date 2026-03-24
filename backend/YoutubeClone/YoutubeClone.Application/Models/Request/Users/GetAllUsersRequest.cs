namespace YoutubeClone.Application.Models.Request.Users
{
    public class GetAllUsersRequest
    {
        public int Limit { get; set; }
        public int Offset { get; set; }
        public string? Username { get; set; }
        public string? DisplayName { get; set; }
    }
}
