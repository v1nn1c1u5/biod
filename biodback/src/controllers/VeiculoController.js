const Veiculo = require('../models/Veiculo');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    async listar(req, res) {
        const veiculos = await Veiculo.find().sort('-createdAt');

        return res.json(veiculos);
    },


    async gravar(req, res) {

        const { fabricante, modelo, placa, ano, renavam, combustivel } = req.body;
        const { filename: foto } = req.file;

        //remove a extensao antiga e adiciona a correta
        //por conta do resize e do novo formato
        const [name] = foto.split('.');
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

        //Salva os dados do motorista
        const veiculo = await Veiculo.create({
            fabricante,
            modelo,
            placa,
            ano,
            renavam,
            combustivel,
        });

        //Dispara um "alerta" avisando sobre a atualização 
        //da informação, fazendo com que os clientes se atualizem
        //e possuam o dado mais recente.
        req.io.emit('veiculo', veiculo);

        return res.json(veiculo);
    }

};