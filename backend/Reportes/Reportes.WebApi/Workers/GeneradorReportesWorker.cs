using Reportes.WebApi.Channels;
using Reportes.WebApi.Classes;
using Reportes.WebApi.Models.Dto;

namespace Reportes.WebApi.Workers
{
    public class GeneradorReportesWorker(ReportsChannel channel, Cache<OrderDto> cache) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach (var order in channel.ReadAllAsync(stoppingToken))
            {
                order.Status = "Generando.";
                cache.Update(order.ID.ToString(), order);
                Console.WriteLine($"{order.ID} -> {order.Name} | {order.Tipo} | {order.Status}");
                await Task.Delay(3000, stoppingToken);

                order.Status = "En proceso de bodega.";
                cache.Update(order.ID.ToString(), order);
                Console.WriteLine($"{order.ID} -> {order.Name} | {order.Tipo} | {order.Status}");
                await Task.Delay(3000, stoppingToken);

                order.Status = "Casi listo...";
                cache.Update(order.ID.ToString(), order);
                Console.WriteLine($"{order.ID} -> {order.Name} | {order.Tipo} | {order.Status}");
                await Task.Delay(3000, stoppingToken);

                order.Status = "Generado.";
                cache.Update(order.ID.ToString(), order);
                Console.WriteLine($"{order.ID} -> {order.Name} | {order.Tipo} | {order.Status}");
            }
        }
    }
}
