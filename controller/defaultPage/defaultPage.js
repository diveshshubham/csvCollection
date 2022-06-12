const homePage = async (req, res) => {
    res.status(200).send({
        message: " 👋 upload csv and make collection for same"
    })
}
module.exports = { homePage }
