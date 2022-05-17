const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    deleteUser,
    createUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);