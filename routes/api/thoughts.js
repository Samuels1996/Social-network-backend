const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought
} = require('../../controllers/thoughtController');

router
  .route('/:thoughtId')
  .get(getThoughts)
  .get(getOneThought)
  .put(createThought)
  .delete(deleteThought);

module.exports = router;