const mongoose = require('mongoose')
const { Schema } = mongoose;
const TempelateSchema = new Schema({
    tempelateURL: {
        type:String,
        unique: true,
    },
    date:{
        type: Date,
        default: Date.now
    },

})
// https://source.unsplash.com/75x75/?portrait
module.exports = mongoose.model('tempelate', TempelateSchema)