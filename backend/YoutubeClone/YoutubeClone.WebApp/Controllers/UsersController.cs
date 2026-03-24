using Microsoft.AspNetCore.Mvc;
using YoutubeClone.Application.Models.Request.Users;

namespace YoutubeClone.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest model)
        {
            return Ok($"¡Usuario {model.Username} creado exitosamente!");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromQuery] UpdateUserRequest model, Guid id)
        {
            return Ok($"¡Usuario {model.DisplayName} actualizado con éxito!\n" +
                $"ID: {id}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromBody] GetAllUsersRequest model)
        {
            return Ok($"Todos los usuaios\n" +
                $"limit: {model.Limit}\n" +
                $"offset {model.Offset}\n" +
                $"Username: {model.Username}\n" +
                $"DisplayName: {model.DisplayName}");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"Usuario eliminado: {id}");
        }
    }
}
