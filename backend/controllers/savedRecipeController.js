// Connexion à la bdd
require("../models/connection");
// Import du modèle saved_recipes
const Savedrecipe = require("../models/saved_recipes");
// Import de la clé API depuis le fichier ".env"
const apiKey = process.env.API_KEY;

// Logique pour récupérer les recettes
const getRecipes = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}number=10`
    );

    // Vérification de la validité de l'api
    if (!response.ok) {
      // Renvoie une erreur si l'api est invalide
      return res.status(400).json({ message: "Requête invalide" });
    }

    // Conversion de la réponse en JSON
    const data = await response.json();
    // Renvoie les données reçues de l'API
    res.json(data);
  } catch (error) {
    // En cas d'erreur, renvoie un statut 500
    res.status(500).json(error.message);
  }
};

// Logique pour sauvegarder une recette
const savedRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;

    const alreadySaved = await Savedrecipe.findOne({
      title,
      userId: req.user.id,
    });
    if (alreadySaved) {
      await Savedrecipe.deleteOne({ title, _id: alreadySaved._id });
      return res
        .status(200)
        .json({ message: "Recette retirée de vos sauvegardes." });
    }

    // Création de la sauvegarde
    const newSaveRecipe = await new Savedrecipe({
      title,
      ingredients,
      instructions,
      image,
      userId: req.user.id,
    });

    // Enregistrement de la sauvegarde
    await newSaveRecipe.save();
  } catch (error) {}
};

module.exports = { savedRecipe };
