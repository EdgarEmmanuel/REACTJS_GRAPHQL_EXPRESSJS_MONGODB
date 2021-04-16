var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Model = mongoose.model;

var objectId = mongoose.Schema.ObjectId;

var EventSchema = new Schema ({
        description:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        creator:{
            type: objectId,
            ref:'users'
        }
});


module.exports.events = Model("events",EventSchema);