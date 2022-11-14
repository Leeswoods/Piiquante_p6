// Importer le Sauce Models
const Sauce = require('../models/saucesModels');

// Créaction d'une sauce 
exports.createSauce = (req, res, next) => {

    // Méthode try...catch : Test le bloc de code try, s'il y a une erreur dans le bloc  try sa exécute le code dans le bloc catch
    try {
        // Objet va être en format JSON mais en chaîne de caractère donc on doit le paser pour l'analyser
        const sauceObject = JSON.parse(req.body.sauce);
        // Supprimer l'id envoyé par le front-end 
        delete sauceObject._id;
        // Supprimer le user id 
        // Pas faire confiance au client donc nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.
        delete sauceObject._userId;

        // Vérifier le nom de la sauce pour éviter le doublon 
        Sauce.findOne({name : sauceObject.name})
        // Quand sa réussi / requête réussi dans la base de donnée 
        // il s'agit d'une fonction asynchrone qui renvoie une Promise
        .then((sauce) => {
            // Si la sauce n'est pas dans notre base donnée  /  Sauce === null
            // Sinon si la sauce est déjà dans notre base donnée  
            if (!sauce) {
                // Créaction d'une nouvelle instance de notre Sauce et on lui passe en objet des informations qu'on a besoin 
                const sauce = new Sauce({
                    // Syntaxe de décomposition
                    ...sauceObject,
                    userId: req.auth.userId, // Ajouter le userID

                    // Générer l'URL de l'image mais multer nous passe le nom du fichier 
                    // Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http')
                    // Nous ajoutons '://', puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000').
                    // Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    likes: 0, // Mettre les Likes à 0
                    dislikes: 0, // Mettre les DisLikes à 0
                    usersLikes: [], // Tableau des usersLikes vide 
                    usersDisliked: [], // Tableau des usersDisliked vide 
                });
                // Enregistrer dans la base de donnée 
                sauce.save()
                // Envoie une réponse
                res.status(201).json({ message: 'La sauce a bien été enregistrer !'});
            } 
            // Sinon si l'objet existe déjà 
            else {
                res.status(400).json({ message: "La sauce déjà existante !" }); // send a response
            }
        })
        // Envoie une réponse
        .catch(error => res.status(400).json({ error }));

    } catch {

    }
};

// Obtenir une sauce grâce à l'ID 



// Obtenir toutes les sauces



// Modifier une sauce 


// Supprimer une sauce 


// Likes ou Dislikes une sauce 