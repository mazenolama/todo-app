module.exports = app => {
    app.use('', require('./task'));
    app.use('', require('../middlewares/auth'))
}