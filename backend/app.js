require("dotenv").config(); // Charge les variables d'environnement
const express = require("express"); // Module pour créer l'application web
const path = require("path"); // Module pour gérer les chemins de fichiers
const cookieParser = require("cookie-parser"); // Pour gérer les cookies
const logger = require("morgan"); // Pour logguer les requêtes HTTP
const cors = require("cors"); // Pour gérer les requêtes cross-origin

require("./models/connection"); // Connexion à MongoDB
const usersRouter = require("./routes/users"); // Routes pour les utilisateurs
// const recipesRouter = require("./routes/recipes"); // Routes pour les recettes

const app = express(); // Crée l'application Express

app.use(cors()); // Autorise les requêtes cross-origin
app.use(logger("dev")); // Log des requêtes HTTP
app.use(express.json()); // Analyse les requêtes JSON
app.use(express.urlencoded({ extended: false })); // Analyse les données URL-encodées
app.use(cookieParser()); // Gère les cookies

// Définition des routes
app.use("/users", usersRouter); // Routes pour les utilisateurs
// app.use("/recipes", recipesRouter); // Routes pour les recettes

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée." });
});

// Middleware global pour les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Une erreur serveur est survenue.",
  });
});

module.exports = app; // Export de l'application pour l'utiliser ailleurs
