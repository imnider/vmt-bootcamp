namespace TalentInsights.Application.Models.DTOs
{
    public class SkillDto
    {
        public Guid SkillId { get; set; }
        public string Name { get; set; } = null!;
        public string? Category { get; set; }
    }
}
