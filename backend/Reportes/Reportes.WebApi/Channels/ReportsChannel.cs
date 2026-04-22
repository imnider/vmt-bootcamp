using Reportes.WebApi.Models.Dto;
using System.Threading.Channels;

namespace Reportes.WebApi.Channels
{
    public class ReportsChannel
    {
        private readonly Channel<OrderDto> _channel = Channel.CreateBounded<OrderDto>(10);

        public ValueTask PublishAsync(OrderDto order)
        {
            return _channel.Writer.WriteAsync(order);
        }

        public IAsyncEnumerable<OrderDto> ReadAllAsync(CancellationToken cancellationToken)
        {
            return _channel.Reader.ReadAllAsync(cancellationToken);
        }
    }
}
