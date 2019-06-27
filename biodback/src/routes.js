const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

//definicao de todos os controllers da aplicacao
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')


//Instacia as rotas do express e do multer para o upload
const routes = new express.Router();
const upload = multer(uploadConfig);



//Metodos da API POST
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);


//Metodos da API LIKE
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
