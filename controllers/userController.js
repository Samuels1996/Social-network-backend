const { User, Thought } = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req,res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No User found with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.Thought } })
        )
        .then(() => res.json({ message: 'User succesfully deleted' }))
        .catch((err) => res.status(500).json(err));
    }
}
