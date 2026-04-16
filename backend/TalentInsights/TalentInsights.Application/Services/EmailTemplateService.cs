using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.Services.EmailTemplates;
using TalentInsights.Domain.Interfaces.Repositories;

namespace TalentInsights.Application.Services
{
    public class EmailTemplateService(EmailTemplatesData data, IEmailTemplateRepository repository) : IEmailTemplateService
    {

    }
}
