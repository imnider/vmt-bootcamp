using Microsoft.AspNetCore.Mvc;
using YoutubeClone.Application.Models.Request.Channels;

namespace YoutubeClone.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromQuery] CreateChannelRequest model)
        {
            return Ok($"¡Canal {model.DisplayName} creado exitosamente!");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromBody] UpdateChannelRequest model, Guid id)
        {
            return Ok($"¡Canal {model.DisplayName} actualizado con éxito!\n" +
                $"ID: {id}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllChannelRequest model)
        {
            return Ok($"Todos los canales\n" +
                $"limit: {model.Limit}\n" +
                $"offset {model.Offset}\n" +
                $"Handle: {model.Handle}\n" +
                $"DisplayName: {model.DisplayName}");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"Canal eliminado: {id}");
        }
    }
}
