// Importer package jsonwebtoken
const jwt = require('jsonwebtoken');

// Exporter une fonction qui sera notre middleware
module.exports = (req, res, next) => {
    // Récupérer notre Token 
    try {
        // Récupérer le header et le spliter c'est-à-dire diviser la chaîne de caractère en un tableau autour de l'espace entre le mot clé Bearer et le token 
        const token = req.headers.authorization.split(' ')[1];
        // Decoder le Token grâce à la méthode verify de jsonwebtoken
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        // Récupérer le UserId 
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        // Appeler next pour passer au middleware suivant
        next();
    } catch(error) {
        // 401 : indique que vous devez être authentifié pour faire cette requête
        res.status(401).json({ error });
    }
 };