const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.Promise = global.Promise;

const env = require('./config/cosmodb.js');

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}?ssl=true`;
mongoose.set('debug',true);
console.log('URI de conexão: '+mongoUri);

//Conexao com o banco de dados mongodb
mongoose.connect(mongoUri, { useNewUrlParser: true });


// qualquer nova rota ou chamada a partir deste ponto 
// vai ter acesso ao req.io
app.use((req, res, next) => {
    req.io = io;

    // next para garantir que as rotas subsequentes sejam executadas
    next();
})


//habilitando receber um body com JSON
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//habilitando o CORS para controle dos acessos
app.use(cors());

//criando um ponto de entrada para leitura dos arquivos de imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(require('./routes'));


server.listen(3333);

