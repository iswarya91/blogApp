var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    
    
var app = express();
mongoose.connect("mongodb://localhost/blog_db", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));

var blogSchema = {
    title: String,
    date: String,
    image: String,
    content: String
}

var Blog = mongoose.model("Blog", blogSchema);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs:blogs});
        }
    })   
})

app.post("/blogs", function(req,res){
    var date = new Date();
    var dateFormatted = date.getDate() + " - " + date.getMonth() + " - " + date.getFullYear();  
    req.body.blog.date = dateFormatted;
    
    
    Blog.create(req.body.blog, function(err, newblog) {
        if(err) {
            console.log(err);
        } else {
            console.log(newblog);
            res.redirect("/blogs");
        }
    })
    
})
app.get("/blogs/new", function(req,res) {
    res.render("new");
})

app.get("/blogs/:id", function(req, res){
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog){
        if(err) {
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
        
    })
})

app.get("/blogs/:id/edit", function(req,res) {
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog){
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {blog: foundBlog});
        }
        
    })
})
app.put("/blogs/:id", function(req,res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + req.params.id );
        }
    })
});

app.delete("/blogs/:id", function(req,res) {
    Blog.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log("error");
        } else {
            console.log("succesfully deleted blog");
            res.redirect("/blogs");
        }
    })   
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("blog App strated");
});