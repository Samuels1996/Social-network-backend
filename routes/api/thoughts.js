const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought
} = require('../../controllers/thoughtController');
