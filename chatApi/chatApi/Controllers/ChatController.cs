using Microsoft.AspNetCore.Mvc;

namespace chatApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private static List<Mensagem> Messages = new List<Mensagem>();

        // Endpoint GET para recuperar todas as mensagens.
        [HttpGet]
        public ActionResult<List<Mensagem>> GetMessages()
        {
            return Messages;
        }

        // Endpoint POST para enviar uma nova mensagem.
        [HttpPost]
        public IActionResult PostMessage([FromBody] Mensagem newMessage)
        {
            newMessage.Date = DateTime.Now.ToString("G");
            Messages.Add(newMessage);
            return Ok();
        }

        [HttpPost]
        [Route("message_redundancy")]
        public IActionResult PostMessageRd([FromBody] Mensagem newMessage)
        {
            newMessage.Date = DateTime.Now.ToString("G");
            Messages.Add(newMessage);
            return Ok();
        }
    }
}
