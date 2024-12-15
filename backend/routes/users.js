const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/userController");
const { authWithToken } = require("../middlewares/authWithToken");

// Route permettant la création d'un utilisateur
router.post("/signup", signup);

// Route permettant la connexion d'un utilisateur
router.post("/signin", authWithToken, signin);

module.exports = router;
