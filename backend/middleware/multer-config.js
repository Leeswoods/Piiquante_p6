// Importer package multer 
// Un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// Dictionnaire (est un objet)
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

// Objet de configuration pour Multer 
// Multer fonction diskStorage 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, files, callback) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exporter notre module multer
module.exports = multer({  storage }).single('image');
