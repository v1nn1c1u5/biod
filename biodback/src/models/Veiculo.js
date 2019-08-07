const mongoose = require('mongoose');

//array: [{ body: String, date: Date }],

const veiculoSchema = new mongoose.Schema(
    {
        fabricante: String,
        modelo: String,
        placa: String,
        ano: Number,
        renavam: String,
        combustivel: {
            type: String,
            enum: ['Diesel','Etanol', 'Gasolina','Gas'],
            },
        foto: String   
    }, 
    { 
        timestamps: true,
    });


veiculoSchema.virtual('idade').get(function () {
        return Date.now().getYear() - this.name.ano;
      });

module.exports = mongoose.model('Veiculo', veiculoSchema);