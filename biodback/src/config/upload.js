const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback) {

            //esta gravando com o nome original,
            //necessario adicionar alguma chave para evitar sobrescrever
            callback(null, file.originalname);
        }
    })

}