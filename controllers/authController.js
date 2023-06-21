const jwt = require('jsonwebtoken')
const { decrypt } = require('../middlewares/crypto')
const User = require('../models/User')

exports.login = async (req , res)=>{
    const {email,password} = req.body

    //Check If User Is Existing Based On Email
    const user = await User.find({email})

    if(user.length == 0) return res.status(404).send({result:'This User Was Not Found !!'})

    // Decrypting Passsword To Check
    passwordDecrypted = decrypt(user[0].password[0])
    if(password != passwordDecrypted) return res.status(401).send({result:'Incorrect Password !!'})

    //Generate Session Token and Expiry Time 1 Hour
    let id = user[0]._id;
    let role = user[0].role;
    const token = jwt.sign({role,id},process.env.PRIVATE_KEY,{ expiresIn: '1h' })

    res.header('x-auth-token',token).send({result:"success"})
}