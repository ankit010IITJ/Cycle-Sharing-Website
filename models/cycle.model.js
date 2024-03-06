const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({

    owner: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    
    cycleCompany: {
        type: String,
        required: true,
    },
    
    cycleColor: {
       type: String,
       required: true
    },

})

module.exports = mongoose.model("Cycle", cycleSchema);