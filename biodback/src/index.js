const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://root:politoed@cluster0-pjbfy.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});


// qualquer nova rota ou chamada a partir deste ponto 
// vai ter acesso ao req.io
app.use((req, res, next) => {
    req.io = io;

    // next para garantir que as rotas subsequentes sejam executadas
    next();
})


//habilitando o CORS para controle dos acessos
app.use(cors());

//criando um ponto de entrada para leitura dos arquivos de imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(require('./routes'));

server.listen(3333);

