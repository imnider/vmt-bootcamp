using Microsoft.AspNetCore.Mvc;
using YoutubeClone.Application.Models.Request.Videos;

namespace YoutubeClone.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVideoRequest model)
        {
            return Ok($"¡Video creado éxitosamente!\n" +
                $"Título: {model.Title}");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromQuery] UpdateVideoRequest model, Guid id)
        {
            return Ok($"¡Video modificado con éxito!\n" +
                $"Título: {model.Title}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromBody] GetAllVideosRequest model)
        {
            return Ok($"¡Todos los videos han sido obtenidos con éxito!\n" +
                $"Limit: {model.Limit}\n" +
                $"Offset: {model.Offset}\n" +
                $"Título: {model.Title}");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"¡Video eliminado éxitosamente!\n" +
                $"Id: {id}");
        }
    }
}