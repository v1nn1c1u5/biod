const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')


//definicao de todos os controllers da aplicacao
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')
const VeiculoController = require('./controllers/VeiculoController')
const MotoristaController = require('./controllers/MotoristaController')
const InventarioController = require('./controllers/InventarioController')


//Instacia as rotas do express e do multer para o upload
const routes = new express.Router();
const upload = multer(uploadConfig);


//Metodos da API POST
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('foto'), PostController.store);


//Metodos da API LIKE
routes.post('/posts/:id/like', LikeController.store);


//Metodos da API Motorista
routes.get('/motorista', MotoristaController.list);
// o nome dentro do single deve ser igual ao passado na chamada da API (Insomia/Postman, etc)
routes.post('/motorista', upload.single('foto'), MotoristaController.salvar);
routes.put('/motorista', upload.single('foto'), MotoristaController.update);
routes.delete('/motorista', MotoristaController.delete);

//Metodos para a API de Inventario
routes.get('/inventario', InventarioController.list);
//routes.get('/inventario/:item', InventarioController.search);
routes.post('/inventario',  InventarioController.salvar);

module.exports = routes;
