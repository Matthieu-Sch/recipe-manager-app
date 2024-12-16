const express = require("express");
const router = express.Router();
const { authWithToken } = require("../middlewares/authWithToken");
const { getRecipes } = require("../controllers/recipeController");

// Route pour afficher les recettes
router.get("/all", getRecipes);

// Route pour afficher les recettes
router.get("/save-recipe", authWithToken, getRecipes);

module.exports = router;
