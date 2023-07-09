const Habit = require('../model/habit');

module.exports.create = function (req, res) {
    const { newHabit, startDate, endDate, routine } = req.body;
    Habit.findOne({ title: newHabit })
        .then((doc) => {
            if (!doc) {
                Habit.create({
                    title: newHabit,
                    startDate: startDate,
                    endDate: endDate,
                    routine,
                })
                    .then(() => {
                        return res.redirect('back');
                    })
            }
        })
        .catch((err) => {
            return console.log("error in finding the title in db", err);
        })
}

module.exports.delete = function (req, res) {
    Habit.deleteOne({ _id: req.params.id })
        .then(() => {
            console.log("deleted");
            res.redirect('back');
        })
        .catch((err) => {
            return console.log("error in deleting", err);
        })
}

module.exports.search = function (req, res) {
    console.log(req.params);
    Habit.findById(req.params.id)
        .then((doc) => {
            if (!doc) {
                return res.status(404).json({ message: 'Habit not found' });
            }
            return res.json(doc);
        })
        .catch((err) => {
            return res.status(500).json({ message: "Error fetching the habit" });
        })
}