module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.log('Something Went Worng!!!: ' + err);
        return res.status(500).send('Something Went Worng!!!')
    })
}