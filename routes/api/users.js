const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    deleteUser,
    createUser
} = require('../../controllers/userController');