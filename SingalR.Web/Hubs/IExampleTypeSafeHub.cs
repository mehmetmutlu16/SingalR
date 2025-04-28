using SingalR.Web.Models;

namespace SingalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);
        Task ReceiveTypedMessageForAllClient(Product product);
        Task ReceiveConnectedClientCountAllClient(int clientCount);
        Task ReceiveMessageForCallerClient(string message);
        Task ReceiveMessageForOthersClient(string message);
        Task ReceiveMessageForIndividualClient(string message);
        Task ReceiveMessageForGroupClient(string message);

    }
}
