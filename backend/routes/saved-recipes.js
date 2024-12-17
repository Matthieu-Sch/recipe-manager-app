const express = require("express");
const router = express.Router();
const { authWithToken } = require("../middlewares/authWithToken");
const { savedRecipe } = require("../controllers/savedRecipeController");

// Route pour sauvegarder les recettes
router.post("/save-recipe", authWithToken, savedRecipe);

module.exports = router;