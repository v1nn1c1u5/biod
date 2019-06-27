const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },


    async store(req, res) {

        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //remove a extensao antiga e adiciona a correta
        //por conta do resize e do novo formato
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;
        const fileTemp = path.resolve(req.file.destination, '.', `${name}.tmp`);
        
        // console.log("filename             : "+fileName);
        // console.log("filetemp             : "+fileTemp);
        // console.log("name                 : "+name);
        // console.log("req.file.path        : "+req.file.path);
        // console.log("req.file.destination : "+req.file.destination);
        // console.log("toFile               : "+path.resolve(req.file.destination, fileName));

        //renomeia a extensão do arquivo para .tmp
        fs.renameSync(req.file.path, fileTemp);

        //Redimensiona a imagem original do upload
        await sharp(fileTemp)
            .resize(500)
            .jpeg({ quality : 70 })
            .toFile(
                path.resolve(req.file.destination, fileName)
            )

        //Apaga o arquivo temporario    
        fs.unlinkSync(fileTemp);

        //Salva os dados do post
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //Dispara um "alerta" avisando sobre a atualização 
        //da informação, fazendo com que os clientes se atualizem
        //e possuam o dado mais recente.
        req.io.emit('post', post);

        return res.json(post);
    }

};