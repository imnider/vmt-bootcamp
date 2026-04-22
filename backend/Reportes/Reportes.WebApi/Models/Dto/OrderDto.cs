namespace Reportes.WebApi.Models.Dto
{
    public class OrderDto
    {
        public Guid ID { get; set; }
        public string Name { get; set; } = null!;
        public string Tipo { get; set; } = null!;
        public string Status { get; set; } = "Sin generar";
    }
}
