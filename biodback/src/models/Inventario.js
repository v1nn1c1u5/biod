const mongoose = require('mongoose');

const itensinventarioSchema = new mongoose.Schema({
    p_cod_item: String,
    p_desc_item: String,
    p_desc_local: String,
    p_contagem_inicial:  Number,
    p_contagem_final: Number,
    plantaID: String,
    p_owner_id_planta: String
});

const localinventarioSchema = new mongoose.Schema({
        p_coord_local: String,
        p_x1: String,
        p_x2: String,
        p_x3: String,
        p_x4: String,
        p_x5: String,
        p_desc_local: String,
        p_qtde_inical: Number,
        p_qtde_final: Number,
        p_total_contagem: Number,
        p_list_itens_inventario: [ itensinventarioSchema ],
        plantaID: String,
        p_owner_id_planta: String
});

const inventarioSchema = new mongoose.Schema (
{
    p_planta: String,
    p_cod_inventario: String,
    p_tipo_inventario: String,
    p_data_inicio: Date,
    p_data_fim: Date,
    p_status_inventario: String,
    p_qtde_locais: Number,
    p_locais_conferidos: Number,
    p_list_local_inventario: [ localinventarioSchema ],
    plantaID: String,
    p_owner_id_planta: String
    });

 module.exports =  mongoose.model('Inventario', inventarioSchema);