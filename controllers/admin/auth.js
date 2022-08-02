
const User = require('../../models/admin/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register

const register = async (req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        res.status(200).json(
            user
        )
    }
    catch(err)
    {
        next(err)
    }
}

//Login
const login = async (req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user)
        {
            return res.status(404).send({
                message: 'user not found'
            })
        }

        const validate = await bcrypt.compare(req.body.password, user.password)
        if(!validate)
        {
            return res.status(404).send({
                message: 'user not found'
            })
        }

        const {password, ...others} = user._doc;

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.status(200).json({
            'message': 'successfully logged in',
            'access_token': token,
            'user': others,
        });
    }
    catch(err)
    {
        next(err)
    }
}

module.exports = {
    register,
    login,
}