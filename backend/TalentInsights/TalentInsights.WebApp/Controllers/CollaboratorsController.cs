using Microsoft.AspNetCore.Mvc;
using TalentInsights.Application.Models.Request.Collaborator;
using TalentInsigts.Application.Models.Request.Collaborator;

namespace TalentInsights.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorsController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        {
            return Ok($"Usuario {model.FullName} creado!");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromBody] UpdateCollaboratorRequest model, Guid id)
        {
            return Ok($"Usuario actualizado: {id} - {model.FullName}");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"Usuario eliminado: {id}");
        }

        [HttpPatch("change-password/{id:guid}")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordCollaboratorRequest model)
        {
            return Ok($"Contraseña cambiada: {model.OldPassword} - {model.NewPassword}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCollaboratorRequest model)
        {
            return Ok($"Todos los usuarios: limit: {model.Limit}, offset: {model.Offset}, gitlab: {model.GitlabProfile}");
        }
    }
}
