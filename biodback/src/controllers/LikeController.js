const Post = require('../models/Post');

module.exports = {

    async store(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        //Dispara um "alerta" avisando sobre a atualização 
        //da informação, fazendo com que os clientes se atualizem
        //e possuam o dado mais recente.
        req.io.emit('like', post);

        return res.json(post);

    }

};