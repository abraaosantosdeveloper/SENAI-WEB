const apiUrl = 'http://localhost:5079/Chat';
const apiUrlRed = 'http://localhost:5079/Chat/message_redundancy';


function carregarMensagens() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            data.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `[${msg.date}] <b>${msg.nickname}</b>: ${msg.text}`;
                messagesDiv.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error loading messages:', error));
}

function teclaPressionada(){ if(event.key === 'Enter') enviarMensagen();}

function enviarMensagen() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (!nickname || !message) {
        alert('Please enter both nickname and message');
        return;
    }

    const newMessage = {date:"", nickname: nickname, text: message };

    request = { method:'POST',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify(newMessage)};

    fetch(apiUrl, request)
    .then(response => {
        if (response.ok) {
            document.getElementById('message').value = '';
            document.getElementById('message').focus();
            carregarMensagens();
        } else {
            console.error('Failed to send message');
        }
    })
    .catch(error => console.error('Error sending message:', error));
}
function enviarMensagenRd() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (!nickname || !message) {
        alert('Please enter both nickname and message');
        return;
    }

    const newMessage = {date:"", nickname: nickname, text: message + " (from: Endpoint de redundância )" };

    request = { method:'POST',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify(newMessage)};

    fetch(apiUrlRed, request)
    .then(response => {
        if (response.ok) {
            document.getElementById('message').value = '';
            document.getElementById('message').focus();
            carregarMensagens();
        } else {
            console.error('Failed to send message');
        }
    })
    .catch(error => console.error('Error sending message:', error));
}