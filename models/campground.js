var mongoose=require("mongoose");

var campgroundsSchema=new mongoose.Schema({
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

var Campground=mongoose.model("Campground",campgroundsSchema);

module.exports=Campground;