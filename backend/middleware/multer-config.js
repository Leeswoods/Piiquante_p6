// Importer package multer 
// Un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// Dictionnaire (est un objet)
// Générer l'extension du fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

// Objet de configuration pour Multer 

//Nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants :
// Multer fonction diskStorage => configure le chemin et le nom de fichier pour les fichiers entrants.

const storage = multer.diskStorage({
    // la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Explique à Multer quel nom de fichier autorisé 
    // la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. 
    // Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        // Générer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exporter notre module multer
// Méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
module.exports = multer({storage: storage}).single('image');
