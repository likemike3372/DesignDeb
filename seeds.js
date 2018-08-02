var mongoose = require("mongoose");

var Campground=require("./models/campground");
var Comment=require("./models/comment");


var data=[
    {name:"Miramar", image:"https://pmcvariety.files.wordpress.com/2018/05/mir.jpg?w=1000&h=563&crop=1",
     description:"Donec tincidunt facilisis arcu eu convallis. Proin ut fermentum ex, gravida tincidunt libero. Nulla quis metus nisi. Ut facilisis nisi eu faucibus ultricies. Etiam porttitor, ligula et consectetur eleifend, nisl libero tempus nisl, quis dapibus lacus dolor at velit. Donec dictum neque lacus, sit amet condimentum velit hendrerit quis. Praesent interdum pharetra euismod. Suspendisse molestie at mi a vestibulum. Proin ultricies, nisl et suscipit iaculis, metus arcu congue turpis, non accumsan enim nisl nec urna. Curabitur ut ante orci. Integer a velit lobortis, sollicitudin metus nec, lobortis tortor. Vestibulum tincidunt iaculis cursus. Integer consequat, libero a imperdiet malesuada, dolor lectus pharetra lectus, a semper tellus lorem a nibh. Pellentesque ipsum libero, mollis eget cursus quis, posuere nec magna. Sed ac commodo mauris. Praesent iaculis consequat lacus, id pellentesque neque iaculis tempor."
    },
    {name:"Erangel", image:"https://gameplay.tips/uploads/posts/2017-12/1514415372_1.jpg",
     description:"Donec tincidunt facilisis arcu eu convallis. Proin ut fermentum ex, gravida tincidunt libero. Nulla quis metus nisi. Ut facilisis nisi eu faucibus ultricies. Etiam porttitor, ligula et consectetur eleifend, nisl libero tempus nisl, quis dapibus lacus dolor at velit. Donec dictum neque lacus, sit amet condimentum velit hendrerit quis. Praesent interdum pharetra euismod. Suspendisse molestie at mi a vestibulum. Proin ultricies, nisl et suscipit iaculis, metus arcu congue turpis, non accumsan enim nisl nec urna. Curabitur ut ante orci. Integer a velit lobortis, sollicitudin metus nec, lobortis tortor. Vestibulum tincidunt iaculis cursus. Integer consequat, libero a imperdiet malesuada, dolor lectus pharetra lectus, a semper tellus lorem a nibh. Pellentesque ipsum libero, mollis eget cursus quis, posuere nec magna. Sed ac commodo mauris. Praesent iaculis consequat lacus, id pellentesque neque iaculis tempor."
    },
    {name:"Georgepol", image:"https://pubattlegroundstips.com/wp-content/uploads/2017/09/georgopol-1.jpg",
     description:"Donec tincidunt facilisis arcu eu convallis. Proin ut fermentum ex, gravida tincidunt libero. Nulla quis metus nisi. Ut facilisis nisi eu faucibus ultricies. Etiam porttitor, ligula et consectetur eleifend, nisl libero tempus nisl, quis dapibus lacus dolor at velit. Donec dictum neque lacus, sit amet condimentum velit hendrerit quis. Praesent interdum pharetra euismod. Suspendisse molestie at mi a vestibulum. Proin ultricies, nisl et suscipit iaculis, metus arcu congue turpis, non accumsan enim nisl nec urna. Curabitur ut ante orci. Integer a velit lobortis, sollicitudin metus nec, lobortis tortor. Vestibulum tincidunt iaculis cursus. Integer consequat, libero a imperdiet malesuada, dolor lectus pharetra lectus, a semper tellus lorem a nibh. Pellentesque ipsum libero, mollis eget cursus quis, posuere nec magna. Sed ac commodo mauris. Praesent iaculis consequat lacus, id pellentesque neque iaculis tempor."
    }
    
];

function seedDB(){
    
    Campground.remove({},function(err){
    if(err)
    {console.log(err);}
    
    console.log("removed Campgrounds");
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("added a campground");
                //create a comment
                Comment.create({text:"fdsgdsfg gsdfgdfsg sdfghdfgdfsg", author:"hoemr"},
                function(err,comment){
                    if(err){console.log(err);}else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new comment");
                    }
                });
            }
    });
    // add a few campgrounds
    
    });
    
    
    
   
    
    
});

}
module.exports=seedDB;



