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
            
    }
}