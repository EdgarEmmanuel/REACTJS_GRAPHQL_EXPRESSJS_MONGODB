var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var objectId = mongoose.Schema.ObjectId;

var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdEvents:[{
        type: objectId,
        ref:'events'
    }]
});


module.exports.user = mongoose.model("users",UserSchema);
