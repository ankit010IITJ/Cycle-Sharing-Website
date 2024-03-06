/**
 * I need to write the controller / logic to register a user
 */

const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")

exports.signup = async (req, res) => {
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in mongoDB
    const userObj = {
        name: request_body.name,
        mobileNo: request_body.mobileNo,
        userId: request_body.userId,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try{
        
        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */
        res.status(201).send(user_created)

    }catch(err){
        console.log("Error while  registering the user", err)
        res.status(500).send({
            message: "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}

exports.signin = async(req, res) => {

    //Check if the user id is present in the system
    const user = await user_model.findOne({userId: req.body.userId})
    
    if(user == null){
        return res.status(400).send({
            message: "User Id passed is not a valid user id"
        })
    }

    //Check if the password is correct or not
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message: "Wrong password passed"
        })
    }

    //Using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({id: user.userId}, secret.secret, {
        expiresIn: 120
    })

    res.status(200).send({
        name: user.name,
        mobileNo: user.mobileNo,
        userId: user.userId,
        accessToken: token
    })

}