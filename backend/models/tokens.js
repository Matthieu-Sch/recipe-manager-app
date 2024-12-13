// Importation du module mongoose pour intéragir avec MongoDB
const mongoose = require("mongoose");

// Définition su schéma (structure des documents) pour les tokens
const tokenSchema = mongoose.Schema(
  {
    // Champ qui stoken l'ID utilisateur en temps que clé étrangère
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // Champ token : gérer grâce à JWT
    token: { type: String, require: true },
    // Champ pour définir la date d'expiration du token
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Création du modèle "tokens" basé sur le schéma définit
const Token = mongoose.model("tokens", tokenSchema);

// Exportation du modèle pour pouvoir l'utuliser dans d'autres fichiers
module.exports = Token;
