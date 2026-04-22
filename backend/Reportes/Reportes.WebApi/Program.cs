using Reportes.WebApi.Channels;
using Reportes.WebApi.Classes;
using Reportes.WebApi.Models.Dto;
using Reportes.WebApi.Workers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Worker
builder.Services.AddHostedService<GeneradorReportesWorker>();

// Canales
builder.Services.AddSingleton<ReportsChannel>();

builder.Services.AddSingleton<Cache<OrderDto>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
