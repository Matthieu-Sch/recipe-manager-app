// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require("mongoose");

// Récupération de la chaîne de connexion MongoDB depuis ".env"
const connectionStringMongoDb = process.env.CONNECTION_STRING_MONGO_DB;

// Connexion à MongoDB
mongoose
  // Ici, connect() établit une connexion à la base de données et ne doit pas dépasser 2000 millisecondes.
  .connect(connectionStringMongoDb, { connectTimeoutMS: 2000 })
  // La connexion réussit, le "console.log()" s'affiche.
  .then(() => console.log("Connexion réussie"))
  // La connexion échoue, le "catch(error)" s'exécute.
  .catch((error) => console.log(error));
