namespace Calculator.Startup.Models
{
    internal class Option
    {
        public required int Id { get; set; }
        public required string DisplayName { get; set; }
        public required string Usage { get; set; }
        public required string Return { get; set; }
    }
}