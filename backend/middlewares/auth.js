/*Le fichier "auth.js" définit le middleware de validation des tokens envoyés à travers les requêtes.*/

//Importation du package "jsonwebtoken".
const jwt = require("jsonwebtoken");

//Importation et chargement du package "dotenv" qui permet de gérer et manipuler les variables d'environnements.
require("dotenv").config();

//Récupération de la variable d'environnement de la clé secrète du token.
const secretKey = process.env.TOKEN_SECRET_KEY;

//Exportation d'un middleware classique.
module.exports = (req, res, next) => {
  //Bloc try/catch pour la gestion des erreurs.
  try {
    //récupération du token dans le header de la requête.
    const token = req.headers.authorization.split(" ")[1];
    //décodage du token en objet js.
    const decodedToken = jwt.verify(token, `${secretKey}`);
    //Extraction du "userId" dans le token décodé.
    const userId = decodedToken.userId;
    //Si le "userId" de la requête et du token ne correspondent pas.
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide !";
    } else {
      //Si les "userId" correspondent.
      next();
    }
  } catch {
    //Erreur d'authentification (code 401).
    res.status(401).json({ error: new Error("Requête non authentifiée !") });
  }
};
