const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema (
    {
        logradouro: String,
        numcasa: String,
        complemento: String,
        bairro: String,
        cep: String,
        cidade: String,
        estado: String
    });

const habilitacaoSchema = new mongoose.Schema (
    {
        tipo: String,
        numero:  String,
        validade: Date
    });

const motoristaSchema = new mongoose.Schema(
    {
        nome: String,
        apelido: String,
        nascimento: Date,
        habilitacao: habilitacaoSchema,
        foto: String,
        rg: String,
        cpf: String,
        endereco: enderecoSchema,
        rating: { type: Number, default: 0 }
    }, 
    { 
        timestamps: true,
    });

module.exports =  mongoose.model('Motorista', motoristaSchema);