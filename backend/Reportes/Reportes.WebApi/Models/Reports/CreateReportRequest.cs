using System.ComponentModel.DataAnnotations;

namespace Reportes.WebApi.Models.Reports
{
    public class CreateReportRequest
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Tipo { get; set; } = null!;
    }
}
