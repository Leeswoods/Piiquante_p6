// Importer le Users Models
const User = require('../models/usersModels');

// Importer le package bcrypt
const bcrypt = require('bcrypt');
const { error } = require('npmlog');
const { message } = require('statuses');
const { valid } = require('semver');

// Middleware 
// Fonction Signup pour l'enregistrement de nouveaux utilisateurs 
exports.signup = (req, res, next) => {

    // Première chose qu'on fait, hacher le mdp grâce à la fonction bcrypt.hash() / méthode asynchrone
    // On l'exécute 10 fois 
    bcrypt.hash(req.body.password, 10)
    // Quand sa réussi / requête réussi dans la base de donnée 
    // il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré 
    // Dans notre bloc then , nous créons un utilisateur
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        // Enregistrement de la constante user dans la base de donnée 
        user.save()
        // On renvoie une réponse de réussite en cas de succès
        // 201 : Requête traitée avec succès et création d’un document
        .then(() => res.status(201).json( {message: 'Utilisateur créé !'}))
        // Promesse rejetée : Code 400 : La syntaxe de la requête est erronée / Indique que votre requête n’est pas conforme à ce qui est attendu
        .catch(error => res.status(400).json({error}));
    })
    // Quand sa échoue / erreur de requête d'exécution dans la base de donnée
    // Promesse rejetée : Code 500 : Indique une erreur avec le service web
    .catch(error => res.status(500).json({error}));
};

// Middleware 
// Fonction Login pour la connexion des utilisateurs existants
// On va vérifier  qu'un utilisateur existe dans notre base de donnée 
// Et si le mot de passe transmit par le client correspond à celui établit par l'utilisateur 
exports.login = (req, res, next) => {

    // Pour cela on va utiliser la méthode findOne 
    // Nous lui passons un objet qui va servir de filtrer, c'est-à-dire de selecteur 
    User.findOne({email: req.body.email})

    // Quand sa réussi / requête réussi dans la base de donnée 
    // Nous faut récupérer l'enregistrement qui est dans la base de donée : 
    // On doit vérifier que l'utilisateur a bien été trouver 
    // Vérifier si le mot de passe transmit par le client est le bon 
    .then(user => {
        // Si l'utilisateur n'est pas dans notre base de donnée 
        if(!user) {
            // 401 : indique que vous devez être authentifié pour faire cette requête
            return res.status(401).json({message: 'Utlisateur inexistant !'});
        } 
        // Si l'utilisateur est dans notre base de donnée 
        else{
            // Comparer le mot de passe de la base de donnée à celui tapé par l'utilisateur 
            // Pour cela, on va utiliser la méthode compare
            // On regarde d'abord celui fournit par l'utilisateur 
            // Puis on va regarder celui de la base de donnée  
            bcrypt.compare(req.body.password, user.password)
            // Utilisateur trouvé même mot de passe dans la base de donnée et celui taper par l'utilisateur 
            .then(valid => {
                // S'il s'agit de false, erreur d'authenfication
                // MDP transmit par correct
                if (!valid) {
                    // 401 : indique que vous devez être authentifié pour faire cette requête
                    return res.status(401).json({message: 'Mot de passe incorecte !'})
                }
                // Si le mot de passe est correct
                else {
                    // 200 : indique que tout s’est bien passé
                    // Objet contenant les informations nécessaires à l'authentification des requêtes qu sont émises par l'utilisateur 
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                }
            })
            // Utilisateur introuvé
            // Promesse rejetée : Code 500 : Indique une erreur avec le service web
            .catch(error => res.status(500).json({error}))
        }
    })

    // Quand sa échoue / erreur de requête d'exécution dans la base de donnée 
    // Promesse rejetée : Code 500 : Indique une erreur avec le service web
    .catch(error => res.status(500).json({error}))
};