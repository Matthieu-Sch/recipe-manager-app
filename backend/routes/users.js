const express = require("express");
const router = express.Router();
import { signup, signin, logout } from "../controllers/userController";

// Route permettant la création d'un utilisateur
router.post("/signup", signup);
