import User from "../models/users";
const bcrypt = require("bcrypt");

export default function userController() {
  const signup = async (req, res) => {};
  const signin = async (req, res) => {};
  const logout = async (req, res) => {};
}
module.exports = { signup, signin, logout };