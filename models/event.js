var mongoose=require("mongoose");

var eventsSchema=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    location:String,
    lat: Number,
    lng:Number,
    created:{type:Date},
    created1: {type:Date, default:Date.now},
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        
        {type:mongoose.Schema.Types.ObjectId,
         ref:"Comment"        
        }
    
                ]
});

var Event=mongoose.model("Event",eventsSchema);

module.exports=Event;