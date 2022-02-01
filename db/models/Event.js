const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const EventSchema = mongoose.Schema({
    organizer: {type:String, required: true, maxLength: 20},
    name: {type:String, required:true},
    email: {type:String, required:true},
    image: {type:String, required:true},
    numOfSeats: {type:Number, required:true, min: 5},
    bookedSeats: {type:Number, required:true, default: 0},
    startDate: {type:Date, required:true, min:'2022-01-31',
    max:'2022-12-31'},
    endDate: {type:Date, required:true,  min:'2022-01-31',
    max:'2022-12-31'},
}, 
    {timestamps: true}
);

EventSchema.plugin(mongooseSlugPlugin,{tmpl:"<%=name%>"})

module.exports = mongoose.model("Event", EventSchema)