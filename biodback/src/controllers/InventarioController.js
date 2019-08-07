const Inventario = require('../models/Inventario');


module.exports = {

    async list(req, res) {

        //console.log('List: Parametro recebido: '+`${req.params[item]}`);

        const inventarios = await Inventario.find();
        return res.json(inventarios);
    },

    async search(req, res) {

        // Person.find({
        //         occupation: /host/,
        //         'name.last': 'Ghost',
        //         age: { $gt: 17, $lt: 66 },
        //         likes: { $in: ['vaporizing', 'talking'] }
        //     }).
        //     limit(10).
        //     sort({ occupation: -1 }).
        //     select({ name: 1, occupation: 1 }).
        //     exec(callback);


        console.log('Search: Parametro recebido: '+req.params['item']);

        // const inventarios = await Inventario.find({
        //     "p_list_local_inventario" : { p_coord_local : `${req.params['item']}` }
        // });

        const inventarios = await Inventario.find({
            p_planta : 'D931',
            //'p_list_local_inventario' : { p_coord_local : 'P004 001 1' }
        });

        return res.json(inventarios);
    },

    async salvar(req, res) {
        
        const inventarioJSON = JSON.parse(JSON.stringify(req.body));   

        const inventario = await Inventario.create( inventarioJSON );

        return res.json(inventario);
    }

};