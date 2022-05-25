const { User, Thoughts } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thoughts.find() 
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req,res) {
        Thoughts.findOne({ _id:req.params.thoughtId })
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thoughts)
                )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req,res) {
        Thoughts.create(req.body)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    deleteThought(req,res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughts) => 
                !thoughts 
                    ? res.status(404).json({ message: 'No thought found with that Id' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new:true }
                    )
            )
            
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this ID exists' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this ID exists' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
}