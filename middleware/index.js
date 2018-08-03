//all the middleware goes here
var Event=require("../models/event");
var Comment = require("../models/comment"); 
var middlewareObj={};

middlewareObj.checkeventownership=function (req, res, next){
   
     if(req.isAuthenticated()){
         Event.findById(req.params.id, function(err, foundEvent){
        if(err)
        {   req.flash("error", "Event not found");
            res.redirect("back")}
        else
        {    //does user own the campground?
            if(foundEvent.author.id.equals(req.user._id)){
                next();

            }  //foundCampGround.author.id is an object while author._id is a string
            else{req.flash("error", "Permission denied ");
                res.redirect("back");
            }   
        }
        });
    }
    else{
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
    
}

middlewareObj.checkcommentownership=function (req, res, next){
     if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
        {   req.flash("error", "Comment not found");
            res.redirect("back")}
        else
        {    //does user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
                next();

            }  //foundCampGround.author.id is an object while author._id is a string
            else{
                req.flash("error","Permission Denied");
                res.redirect("back");
            }   
        }
        });
    }
    else{
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn=
function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login");
    res.redirect("/login");
}




module.exports=middlewareObj;