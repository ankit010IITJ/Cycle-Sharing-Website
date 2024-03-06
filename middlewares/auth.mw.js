const user_model = require("../models/user.model")

/**
 * Create a middleware to check if request body is proper or coorect
 */

const verifySignUpBody = async(req, res, next) => {
    
    try{

        //Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed ! Name was not provided in request body"
            })
        }

        //Check for the mobileNo
        if(!req.body.mobileNo){
            return res.status(400).send({
                message: "Failed ! Mobile No. was not provided in request body"
            })
        }

        //Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed ! userId was not provided in request body"
            })
        }

        //Check for the password
        if(!req.body.password){
            return res.status(400).send({
                message: "Failed ! password must contain atleast 6 letters"
            })
        }

        //Check if the user with the same userId is already present
        const user = await user_model.findOne({userId: req.body.userId})

        if(user){
            return res.status(400).send({
                message: "Failed ! this userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
}