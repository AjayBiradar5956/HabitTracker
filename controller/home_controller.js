const Habit = require('../model/habit');

module.exports.home = function (req, res) {
    Habit.find({})
        .then((habits) => {
            return res.render('home', {
                habits,
            })
        })
}