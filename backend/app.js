// Permet de charger les variables d'environnement depuis un fichier ".env"
require("dotenv").config();
// Permet d'importer le Framework Express afin de créer un serveur backend
const express = require("express");
// Permet d'importer une fonction personnalisée pour se connecter à MongoDB
const connectDb = require("./config/db");
// Pemet d'importer les routes liées aux recettes
const recipeRouter = require("./routes/recipe");
// Permet d'importer le middlware "cors" afin de gérer les reqêtes entre domaines différents
const cors = require("cors");
// Permet de créer une instance de l'application Express
const app = express;
// Permet de se connecter à la basse de données avec l'appel de la fonction "connectDb"
connectDb();
// Permet d'utiliser le middleware "cors" pour gérer les requêtes cross-origin
app.request(cors());
// Permet d'utiliser le middleware intégrer d'Express pour traiter les données JSON envoyées dans le corps des requêtes
app.request(express.json());
// Permet de définir les routes pour les recettes
app.request("/recipe", recipeRouter);
