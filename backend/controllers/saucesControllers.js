// Importer le Sauce Models
const Sauce = require('../models/saucesModels');

// Import du package FS pour gérer le système de fichiers du serveur
// Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.
const fs = require('fs');


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
    });
    // Enregistrer dans la base de donnée 
    sauce.save()
        // Envoie une réponse
        // 201 : Indique que la requête a été traiter avec succès et cela créer un document.
        .then(() => { res.status(201).json({ message: 'La sauce a bien été enregistrer !'})})
        // Envoie une erreur 
        // 400 : indique que votre requête n’est pas conforme à ce qui est attendu
        .catch(error => { res.status(400).json({ error })});
};

// Obtenir toutes les sauces
// Fonction asynchrone
exports.getAllSauces = (req, res, next) => {
// L'opérateur await permet d'attendre la résolution d'une promesse (Promise)
Sauce.find() // On va chercher toutes les sauces grâce à la fonction .find()

    // 200 : indique que tout s’est bien passé
    .then(sauces => res.status(200).send(sauces)) // La sauce est trouvée
    // 404 : indique que la ressource demandée n’existe pas
    .catch(error => res.status(400).json({ error }))
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
    .catch(error => res.status(404).json({ error }));
};

// Supprimer une sauce 
exports.deleteSauce = (req, res, next) => {

    //  Pour savoir si c'est le bon utilisateur 
    Sauce.findOne({_id: req.params.id})
        // Cas de succès
        // Vérifier si c'est bien le propriétaire de la sauce qui nous demande la suppression
        .then(sauce => {
            // Si ce n'est pas le cas
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message : 'Non-autorisé'}); // Message d'erreur 
            }
            // Si c'est le bon utilisateur 
            else {
                // Récupérer le nom du fichier 
                const filename = sauce.imageUrl.split('/images')[1];
                // fonction unlink du package fs pour supprimer le fichier et le callback à exécuter une fois ce fichier supprimé.
                fs.unlink(`images/${filename}`, () => {
                    // Supprime la sauce de la base de donnée
                    Sauce.deleteOne({_id: req.params.id})
                        // Gérer le succès 
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        // Gérer  l'échec 
                        .catch(error => res.status(401).json({ error }));
                });
            } 
        })
        // Erreur 
        .catch(error => {
            res.status(500).json({error});
        });
};



// Modifier une sauce 
exports.modifySauce = (req, res, next) => {

    // Est-ce qu'il y a un champ file ? 
    const sauceObject = req.file ? {
        // Si  c'est le cas, on parse la chaîne de caractère 
        ...JSON.parse(req.body.sauce),
        // Et en recréant l'URL de l'image 
        imageUrl  : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    // Si ce n'est pas le cas, on récupère la sauce dans le corps de la requête  
    : { ...req.body};

    // Supprimer le userId pour éviter que quelqu'un crée une sauce à son nom et le modifie pour l'assigner à quelqu'un d'autre
    // Mesure de sécuerité 
    delete sauceObject._userId;

    // Chercher la sauce dans la base de donnée
    Sauce.findOne({_id: req.params.id})
        // Réussite
        .then((sauce) => {
            // Si le champ id (dans la base de donnée) est différent de l'userId qui vient du token
            if (sauce.userId != req.auth.userId){
                res.status(401).json({message : 'Non-autorisé'}); // Message d'erreur
            }
            // Si c'est le bon utilisateur 
            else {
                // Mettre à jour notre sauce
                Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
                // Réussite
                .then(() => res.status(200).json({message : 'La sauce a été modifier avec succès !'})) // Message d'erreur
                // Erreur  
                .catch(error => res.status(401).json({ error })); 
            }

        })
        // Erreur
        .catch(error => {
            res.status(400).json({error});
        });
};


// Likes ou Dislikes une sauce 
exports.likeSauce = (req, res, next) => {

    // Affichage du req.body / permet de récupérer le userId et le likes ou dislikes

    // Récupérer l'id dans l'url de la requête

    // Transoformez l'id en _id 

    // Aller chercher l'objet (la sauce) dans la base de donnée 
    Sauce.findOne({ _id: req.params.id })
        // Réussite
        .then((sauce) => {
            
            // Mise en place d'un switch case ()
            // L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.
            switch (req.body.like) {

                // Likes = 1 (likes +1)
                case 1: // Lorsque l'utilisateur clique sur "like" pour ajouter un "like"

                    // utilisation de la méthode javascript includes()
                    if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                        // Mise à jour de la Base de donnée 
                        Sauce.updateOne(
                            { _id: req.params.id }, 
                            {
                            // utilisation de l'opérateur $inc (mogoDB)
                            $inc: {likes: 1}, // Incrémente un champ d'une valeur spécifiée et à la forme suivante 

                            // utilisation de l'opérateur $push (mogoDB)
                            $push : { usersLiked: req.body.userId } // ajoute une valeur spécifiée à un tableau

                            }
                        )
                        .then( () => res.status(201).json({ message : "Like +1"}))
                        .catch((error) => res.status(400).json({ error }));
                    }
                    break;
                
                // Likes = -1 (dislikes = +1)
                case -1 : // Lorsque l'utilisateur clique sur "dislike" pour ajouter un "dislike"
                    if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                        // Mise à jour de la Base de donnée
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                // utilisation de l'opérateur $inc (mogoDB)
                                $inc: { dislikes: 1 }, // Incrémente un champ d'une valeur spécifiée et à la forme suivante 

                                // utilisation de l'opérateur $push (mogoDB)
                                $push: { usersDisliked: req.body.userId } // ajoute une valeur spécifiée à un tableau
                            }
                        )
                            .then(() => res.status(201).json({ message: "Dislike +1" }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
            
                case 0 :
                    // Likes = 0 (likes = 0, pas de vote)
                    if (sauce.usersLiked.includes(req.body.userId)) { // Clic sur "like" et retour à 0
                        // Mise à jour de la Base de donnée
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                // utilisation de l'opérateur $inc (mogoDB)
                                $inc: { likes: -1 }, // Incrémente un champ d'une valeur spécifiée et à la forme suivante 

                                // utilisation de l'opérateur $pull (mogoDB)
                                $pull: { usersLiked: req.body.userId } // supprime d'un tableau existant toutes les instances d'une valeur ou de valeurs qui correspondent à une condition spécifiée.
                            }
                        )
                            .then(() => res.status(201).json({ message: "Like 0" }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    // Likes = 0 (dislikes = 0)
                    if (sauce.usersDisliked.includes(req.body.userId)) { // Clic sur "dislike" et retour à 0
                        // Mise à jour de la Base de donnée
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                // utilisation de l'opérateur $inc (mogoDB)
                                $inc: { dislikes: -1 }, // Incrémente un champ d'une valeur spécifiée et à la forme suivante 

                                // utilisation de l'opérateur $pull (mogoDB)
                                $pull: { usersDisliked: req.body.userId } // supprime d'un tableau existant toutes les instances d'une valeur ou de valeurs qui correspondent à une condition spécifiée.
                            }
                        )
                            .then(() => res.status(201).json({ message: "Dislike 0" }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
            }
        })
        // Echec
        .catch((error) => res.status(404).json({ error }));
};