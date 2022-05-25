const { Users, Thoughts } = require('../models');

module.exports = {
    getUsers(req,res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req,res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req,res) {
        Users.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No User found with that ID' })
                    : Thoughts.deleteMany({ _id: { $in: user.Thoughts } })
        )
        .then(() => res.json({ message: 'User succesfully deleted' }))
        .catch((err) => res.status(500).json(err));
    },
    createUser(req,res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    }
}
