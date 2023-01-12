module.exports.test = async function (req, res, next) {
    res.status(200).json({ message: "SERVER IS RUNNING JUST FINE!" });
}
