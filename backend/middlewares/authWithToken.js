const jwt = require("jsonwebtoken");

const authWithToken = async (req, res, next) => {
  // Récupération du token
  const token = req.headers.authorization?.split(" ")[1];

  // Vérification de la validité du token
  if (!token) {
    return res.status(401).json({ message: "Token manquant." });
  }
  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ajout des données utilisateur à la requête
    req.user = decoded;
    // Passage au middleware suivant
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = { authWithToken };
