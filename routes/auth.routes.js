/**
 * POST localhost:8888/
 */

const authController = require("../controllers/auth.controller")

module.exports = (app) => {
    app.post("/cycle_sharing/api/v1/auth/signup", authController.signup)
}