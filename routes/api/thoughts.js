const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought, 
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(createThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;