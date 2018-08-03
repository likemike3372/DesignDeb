var express=require("express");
var router=express.Router({mergeParams:true});
var Event=require("../models/event");
var Comment = require("../models/comment");
var middleware=require("../middleware");


//=======================================================
// COMMENTS ROUTES
//=========================================================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    
    Event.findById(req.params.id, function(err, event){
        if(err){
            console.log(err);
                }else
                {
                    res.render("comments/new",{event:event});
                }
    });
    
    
});

router.post("/",middleware.isLoggedIn, function(req,res){
    
    //lookup event using id
    Event.findById(req.params.id, function(err, event) {
        if(err)
        {
        console.log(err);
        res.redirect("/events");
        }else
        {
            Comment.create(req.body.comment, function(err, comment)
            {
                if(err)
                {
                    console.log(err);
                }else
                {   //add username and id to comment
                    comment.author.id=req.user._id
                    comment.author.username=req.user.username;
                    //and save comment
                    comment.save();
                    event.comments.push(comment);
                    event.save();
                    req.flash("success","Successfully added"); 
                    res.redirect('/events/'+event._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to event
    //redirect event show page
    
    
});
//EDIT ROUTES
router.get("/:comment_id/edit",middleware.checkcommentownership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       
       if(err){
           res.redirect("back");
       } else{
           res.render("comments/edit", {event_id:req.params.id, comment:foundComment});
       }
    });
   
   
});

//Comment Update
router.put("/:comment_id", middleware.checkcommentownership,function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }else
       {
           res.redirect("/events/"+req.params.id);
       }
   });
});

//Comment Destroy Route
router.delete("/:comment_id", middleware.checkcommentownership,function(req, res){
    //findByIdandRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else
        {   req.flash("success","Comment deleted")
            res.redirect("/events/"+req.params.id);
        }
    });
});





module.exports=router;