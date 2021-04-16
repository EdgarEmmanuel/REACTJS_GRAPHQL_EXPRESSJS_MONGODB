const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;


var BookingSchema = schema({
        event:{
            type:objectId,
            ref:"events"
        },
        user:{
            type:objectId,
            ref:"users"
        }
    },
    {timestamps: true}
);

BookingSchema.pre("save",(next)=>{
    console.log("A book is going to be saved "+this._doc);
    next();
});


module.exports.booking = mongoose.model("Booking",BookingSchema);