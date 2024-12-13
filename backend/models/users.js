// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require("mongoose");

// Définition du schéma (structure des documents) pour les utilisateurs
const userSchema = mongoose.Schema(
  {
    // Champ e-mail
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    // Champ username (nom d'utilisateur)
    username: { type: String, required: true, unique: true, trim: true },
    // Champ mot de passe
    password: { type: String, required: true },
  },
  // Champ "createAt" et "updatedAt"
  { timestamps: true }
);

// Création du modèle "users" basé sur le schéma définit
const User = mongoose.model("users", userSchema);

// Exportation du modèle pour l'utiliser dans les autres fichiers
module.exports = User;
