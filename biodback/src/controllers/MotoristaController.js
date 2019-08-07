const Motorista = require('../models/Motorista');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    async list(req, res) {
        const motoristas = await Motorista.find().sort('-createdAt');
        return res.json(motoristas);
    },

    async delete(req, res) {    
        const motoristas = await Motorista.deleteOne({ _id: req.body._id });
        return res.json({ status: true });
    },

    async update(req, res) {       
        const motoristas = await Motorista.updateOne(motoristas);
        return res.json({ status: true });
    },

    async salvar(req, res) {

        const { _id, nome, apelido, nascimento, habilitacao, rg, cpf, endereco, rating } = req.body;
        
        //Converte a string em JSON para realizar a desestruturacao
        const habilitacaoJSON = JSON.parse(habilitacao);
        const enderecoJSON = JSON.parse(endereco);
        
        const { tipo, numero, validade } = habilitacaoJSON;
        const { logradouro, numcasa, complemento, bairro, cep, cidade, estado } = enderecoJSON;

        const { filename: nomefoto } = req.file;

        //Pega a data e hora do sistema para adicionar ao
        //nome da foto. evitar duplicidade de arquivos
        var data = new Date( Date.now() );
        const YYYY = data.getFullYear();
        let MM = data.getMonth()+1;
        let DD = data.getDate();
        let HH = data.getHours() ;
        let MI = data.getMinutes()
        let SS = data.getSeconds();

        if(DD<10) { DD=`0${DD}`; }
        if(MM<10) { MM=`0${MM}`; }
        if(HH<10) { HH=`0${HH}`; }
        if(MI<10) { MI=`0${MI}`; }
        if(SS<10) { SS=`0${SS}`; }

        const datahora = `${YYYY}`+`${MM}`+`${DD}`+`${HH}`+`${MI}`+`${SS}`;

        //remove a extensao antiga e adiciona a correta
        //por conta do resize e do novo formato
        const [name] = nomefoto.split('.');
        const fotoJPG = `${name}${datahora}.JPG`;
        const fileTemp = path.resolve(req.file.destination, '.', `${name}.tmp`);
                                
        //renomeia a extensão do arquivo para .tmp
        fs.renameSync(req.file.path, fileTemp);

        //Redimensiona a imagem original do upload
        await sharp(fileTemp)
            .resize(500)
            .jpeg({ quality : 70 })
            .toFile(
                path.resolve(req.file.destination, fotoJPG)
            )

        //Apaga o arquivo temporario    
        fs.unlinkSync(fileTemp)
        
        var mot = new Motorista(
            {
                _id: `${_id}`,
                nome: `${nome}`,
                apelido: `${apelido}`,
                nascimento: `${nascimento}`,
                habilitacao: { tipo: `${tipo}`, numero: `${numero}`, validade: `${validade}` },
                foto: `${fotoJPG}`,
                rg: `${rg}`,
                cpf: `${cpf}`,
                endereco: { logradouro: `${logradouro}`, numcasa: `${numcasa}`, complemento: `${complemento}`,
                        bairro: `${bairro}`, cep: `${cep}`, cidade: `${cidade}`, estado: `${estado}` },
                rating: `${rating}`,
            });


        //Verifica se ja nao existe um registro igual
        if (_id) {
            //atualizar
            Motorista.findOneAndModify(_id, mot)
            .exec()
            .then( (motorista) => { res.json(mot) })
            .catch( (err) => { res.json(err) });
        }    
        else {
            //salvar novo
            mot.save()
                .catch( (err) => { console.log('Nao foi possivel salvar: '+err) });

        }

       
        //Dispara um "alerta" avisando sobre a atualização 
        //da informação, fazendo com que os clientes se atualizem
        //e possuam o dado mais recente.
        req.io.emit('motorista', mot);

        return res.json(mot);
    }

};