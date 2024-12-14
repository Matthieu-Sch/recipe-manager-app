const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    // Champ "userId" rattaché à la collection "users"
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // Champs "recipeId" rattaché à l'api "spoonacular"
    recipeId: { type: String, required: true },
    title: { type: String },
    image: { type: String },
  },
  // Création automatique des champs "createdAt" et "updatedAt"
  { timestamps: true }
);

// Création du modèle "recipes" définit par le schema "recipeSchema"
const Recipe = mongoose.model("recipes", recipeSchema);

// Exportation du fichier pour qu'il puisse être récupéré ailleurs
module.exports = Recipe;
