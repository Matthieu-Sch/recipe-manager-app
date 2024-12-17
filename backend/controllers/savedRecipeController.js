// Connexion à la bdd
require("../models/connection");
// Import du modèle saved_recipes
const Savedrecipe = require("../models/saved_recipes");

// Logique pour sauvegarder une recette
const savedRecipe = async (req, res) => {
  try {
    // Vérification des données utilisateur transmises par le middleware
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Utilisateur non autorisé. Token invalide." });
    }
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
    return res.status(201).json({ message: "Recette bien sauvegardée !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur. Impossible de sauvegarder la recette.",
    });
  }
};

module.exports = { savedRecipe };
