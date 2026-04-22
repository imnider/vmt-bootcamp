using Microsoft.AspNetCore.Mvc;
using Reportes.WebApi.Channels;
using Reportes.WebApi.Classes;
using Reportes.WebApi.Models.Dto;
using Reportes.WebApi.Models.Reports;

namespace Reportes.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReporteController(ReportsChannel reportsChannel, Cache<OrderDto> cache) : ControllerBase
    {
        [HttpPost("crear")]
        public async Task<IActionResult> Crear(CreateReportRequest model)
        {
            var newOrder = new OrderDto
            {
                ID = Guid.NewGuid(),
                Name = model.Name,
                Tipo = model.Tipo,
            };
            cache.Add(newOrder.ID.ToString(), newOrder);
            await reportsChannel.PublishAsync(newOrder);
            return Ok(newOrder);
        }

        [HttpGet("consultar/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var order = cache.Get(id.ToString());
            return Ok(order);
        }
    }
}
