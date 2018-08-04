require('dotenv').config();



var express=require("express");

var app=express();

var mongoose = require("mongoose");

var bodyParser=require("body-parser");
var Event=require("./models/event");
var passport=require("passport"); 
var LocalStrategy=require("passport-local");
var methodOverride= require("method-override");
var User=require("./models/user");
var seedDB = require("./seeds");
var Comment=require("./models/comment");
var flash=require("connect-flash");

var moment=require("moment")
var commentRoutes = require("./routes/comments"),
    eventRoutes= require("./routes/events"),
    indexRoutes = require("./routes/auth");

//seed  the database
//seedDB();

//PAssport config
app.use(require("express-session")({
    secret:" are the best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});



app.use(indexRoutes);
app.use("/events",eventRoutes);
app.use("/events/:id/comments",commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started");
});

