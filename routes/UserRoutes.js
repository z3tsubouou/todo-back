const {
    register,
    login,
    getTodo,
    addTodo,
    deleteTodo,
    endTodo,
    getAllUserData,
} = require("./UserController");
const express = require("express");
const router = express.Router();
const { checkAdminToken, checkUserToken } = require("../auth/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/getTodo", checkUserToken, getTodo);
router.post("/addTodo", checkUserToken, addTodo);
router.post("/deleteTodo", checkUserToken, deleteTodo);
router.post("/endTodo", checkUserToken, endTodo);
router.post("/getAllUserData", checkAdminToken, getAllUserData);

module.exports = router;
