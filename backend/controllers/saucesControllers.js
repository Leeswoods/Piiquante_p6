// Importer le Sauce Models
const Sauce = require('../models/saucesModels');


// Créaction d'une sauce 
exports.createSauce = (req, res, next) => {
        // La Sauce va être en format JSON mais en chaîne de caractère donc on doit le paser pour l'analyser
        const sauceObject = JSON.parse(req.body.sauce);
        
        // Supprimer l'id envoyé par le front-end 
        delete sauceObject._id;
        
        // Mesure de sécurité
        // Supprimer le user id 
        // Pas faire confiance au client donc nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.
        delete sauceObject._userId;
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
            // likes: 0, // Mettre les Likes à 0
            // dislikes: 0, // Mettre les DisLikes à 0
            // usersLiked: [], // Tableau des usersLikes vide 
            // usersDisliked: [], // Tableau des usersDisliked vide 
        });
        // Enregistrer dans la base de donnée 
        sauce.save()
        // Envoie une réponse
        // 201 : Indique que la requête a été traiter avec succès et cela créer un document.
        .then(() => { res.status(201).json({ message: 'La sauce a bien été enregistrer !'})})
        // Envoie une erreur 
        // 400 : indique que votre requête n’est pas conforme à ce qui est attendu
        .catch(error => { res.status(500).json({ error })});
};

// Obtenir une sauce grâce à l'ID 
// Fonction asynchrone
exports.getOneSauce = (req, res, next) => {
        // On va chercher une sauce grâce à la méthode findOne()
        // Pour accéder au paramètre id de l’URL, nous devons appeler req.params.id
        Sauce.findOne({_id: req.params.id})
 
        // 200 : indique que tout s’est bien passé
        .then(sauce => res.status(200).json(sauce))

        // Envoie une erreur 
        // 500 : indique une erreur avec le service web
        .catch  (error => res.status(404).json({ error }));
}



// Obtenir toutes les sauces
// Fonction asynchrone
exports.getAllSauces = (req, res, next) => {

    // Méthode try...catch : Test le bloc de code try, s'il y a une erreur dans le bloc  try sa exécute le code dans le bloc catch
        // L'opérateur await permet d'attendre la résolution d'une promesse (Promise)
        Sauce.find() // On va chercher toutes les sauces grâce à la fonction .find()

        // Si les sauces n'ont pas été trouver
        .then(sauces => res.status(200).send(sauces)) // La sauce est trouvée
            // 404 : indique que la ressource demandée n’existe pas
        .catch(error => res.status(400).json({ error }))
        // Si les sauces ont été trouver 
        // 200 : indique que tout s’est bien passé
}

// Modifier une sauce 
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
};

// Supprimer une sauce 


// Likes ou Dislikes une sauce 
