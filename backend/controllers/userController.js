// Connexion à la bdd
require("../models/connection");
// Import du modèle "User"
const User = require("../models/users");
// Importation du modèle "Token"
const Token = require("../models/tokens");
// Importation du module "bcrypt" pour hasher le mot de passe
const bcrypt = require("bcrypt");
// Importation du module "jsonwebtoken" pour créer un token sécuriser pour les utilisateurs
const jwt = require("jsonwebtoken");
// Regex e-mail - vérification que la chaîne de caractère est un e-mail valide avec un domaine
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Regex mot de passe - vérification que celui-ci soit sécurisé (majuscule, minuscule, chiffre, caractère spécial, longueur 8-16)
const passwordRegexp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const signup = async (req, res) => {
  try {
    // Nommage des champs pour plus de simplicité
    const { email, username, password, confirmPassword } = req.body;

    // Vérification que les champs soient bien remplis
    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      // Renvoie une erreur si un ou plusieurs champs sont vides
      // 400 = Bad request
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs !" });
    }

    // Vérification que l'e-mail soit correctement formaté
    if (!emailRegexp.test(email)) {
      console.log("Mauvais format de l'e-mail.");
      // Renvoie une erreur si le format ne va pas
      return res.status(400).json({ message: "E-mail invalide." });
    }

    // Vérification que le mot de passe soit suffisamment sécurisé
    if (!passwordRegexp.test(password)) {
      console.log("Le mot de passe n'est pas suffisament sécurisé.");
      // Renvoie une erreur si le format ne va pas
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins :\n • Entre 8 et 16 caractères, \n • Une majuscule, \n • Une minuscule, \n • Un chiffre, \n • Un caractère spéciale  ",
      });
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas.");
      // Renvoie une erreur s'ils ne sont pas identiques
      return res
        .status(400)
        .json({ message: "Vos mots de passe ne correspondent pas." });
    }

    // Vérification quant à l'existence de l'e-mail ou du username de l'utilisateur
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      console.log("L'email ou le nom d'utilisateur existe déjà");
      // Renvoie une erreur si l'e-mail ou le username est déjà existant
      return res
        .status(409)
        .json({ message: "E-mail ou nom d'utilisateur déjà existant." });
    }

    // Hashage du mot de passe
    const passwordHash = bcrypt.hashSync(password, 10);

    // Toutes les conditions on été passées, l'utilisateur est enregistré
    const newUser = new User({
      email,
      username,
      password: passwordHash,
    });
    // Sauvegarde du nouvel utilisateur
    await newUser.save();

    // Création d'un token avec JWT pour cet utilisateur
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Validité du token de 30 jours
    });
    const newToken = new Token({
      userId: newUser._id,
      token: token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    // Sauvegarde du token utilisateur
    await newToken.save();
    res.status(201).json({
      message: "Inscription réussie.",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
const signin = async (req, res) => {
  try {
    // Nommage des champs pour plus de simplicité
    const { username, password } = req.body;

    // Vérification que les champs ne soient bien remplis
    if (!username.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs !" });
    }

    // Vérification de l'existance du username
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    // Vérification de la validité du mot de passe
    const passwordValid = bcrypt.compareSync(password, userExists.password);
    if (!passwordValid) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    return res.status(200).json({ message: "Connexion réussie !" });
  } catch (error) {}
};
const logout = async (req, res) => {};

module.exports = { signup, signin, logout };
