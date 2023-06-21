
module.exports = () => {
    process.on('uncaughtException', err => {
        console.log(err);
    })

    process.on('unhandledRejection', err => {
        console.log(err);
    })
    
}