//Criando o servidor:
 const express = require('express');
 const path = require('path');

 //Criando app do express e informando sobre a porta:
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Pasta para os arquivos públicos:
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Renderizando em html:
app.use('/', (req, res) => {
    res.render('index.html');
});

//Armazenando as mensagens em array:
let messages = [];

//Criando a comunicação entre o usuário e o web socket:
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        //Brodcast se comunica com todos os sockets da aplicação
        socket.broadcast.emit('recievedMessage', data);
    });
});

//Criação da porta:
server.listen(3000);
