const mongoose = require('mongoose')

module.exports = () => {
    const url = `mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`
    mongoose.connect(url).catch((err) => {console.log('DB Not Connected. ' + err);})
}
