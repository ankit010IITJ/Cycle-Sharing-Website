/**
 * POST localhost:8888/cycle_sharing/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/cycle_sharing/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup)

    /**
     * route for
     * POST localhost:8888/cycle_sharing/api/v1/auth/signin
     */
    app.post("/cycle_sharing/api/v1/auth/signin", authController.signin)
}