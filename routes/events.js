var express=require("express");
var router=express.Router();
var Event=require("../models/event");
var middleware=require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//show form to create new Event
router.get("/new",middleware.isLoggedIn, function(req, res) {
   res.render("events/new"); 
});

router.get("/maps",function(req, res) {
    Event.find({}).sort({"price": -1}).exec(function(err, events){
        if(err){
            
            
            console.log(err)}
        
        else{  
            console.log(events)
            var xxx=[];
                for(var i=0;i<events.length;i++){
                    
                
                if(events[i].created.toDateString()===events[i].created1.toDateString()){
                    xxx.push({name: events[i].name, lat:events[i].lat,lng:events[i].lng});
                }}
                
                if(xxx.length>0){
                 res.render("events/maps",{events:xxx});
                }else {req.flash("error","No events are going on"); return res.redirect("back")}
}});
 });


//INDEX Route
router.get("/", function(req, res){
        //Get all events from DB
       Event.find({}).sort({"price": -1}).exec(function(err, events){
            if(err){
                console.log(err);
            }
            else{     var neweve=[];for(var i=0;i<events.length;i++){
                    
                
                    if((events[i].created.getDate()>=events[i].created1.getDate())&&(events[i].created.getMonth()>=events[i].created1.getMonth())&&(events[i].created.getYear()>=events[i].created1.getYear())){
                    neweve.push(events[i]);
                        }}
                
                        res.render("events/index",{events:neweve});
                        
            }
        });
});

//CREATE - add new Event to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to events array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price=req.body.price;
  var created= new Date(req.body.date);
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newEvent = {name: name, image: image,price:price, description: desc, author:author, location: location, lat: lat, lng: lng,created:created};
    // Create a new event and save to DB
    Event.create(newEvent, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to events page
            console.log(newlyCreated);
            res.redirect("/events");
        }
    });
  });
});

router.get("/:id", function(req, res) {
    //find the event with provided ID
    Event.findById(req.params.id).populate("comments").exec(function(err, foundEvent){
        if(err){
            console.log(err);
        }else{
                        
                
               // console.log(foundEvent);
                
                //render show template with that Event
                res.render("events/show", {event:foundEvent});
        }
    });
    });
    
//EDIT Event Route
router.get("/:id/edit", middleware.checkeventownership, function(req, res){
    
      Event.findById(req.params.id, function(err, foundEvent){
         res.render("events/edit",{event:foundEvent});

              //foundEvent.author.id is an object while author._id is a string
           
      });
    });
    
    
    //otherwise, redirect
    //if not, redirect
   
    

// UPDATE Event ROUTE
router.put("/:id", middleware.checkeventownership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.event.lat = data[0].latitude;
    req.body.event.lng = data[0].longitude;
    req.body.event.location = data[0].formattedAddress;

    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, event){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/events/" + event._id);
        }
    });
  });
});
    
//Destroy event
router.delete("/:id", middleware.checkeventownership,function(req, res){
    Event.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/events");
       } 
       else{
           res.redirect("/events");
       }
    });
});
    


module.exports=router;