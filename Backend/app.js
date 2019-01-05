const bodyparser= require('body-parser')

// way of importing packages
const express= require('express')
const mongoose= require('mongoose')
const Post= require('./models/post')

 const app = express();
// res=response
// req= request
// next= what has to be done with resquest



// database connection
mongoose.connect("mongodb+srv://Siddhantaher:@cluster0-gbqhg.mongodb.net/node-angular?retryWrites=true",{useNewUrlParser: true}).then(()=>{
console.log('Connected to the database')
}).catch(()=>{
    console.log('errro occured')
})




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))



// Setting Headers for CORS issue, Which happens beacuse the client and server are running at the diffeent server
app.use((req,res,next)=>{
    // all are comma seperated
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader("Access-Control-Allow-Headers",
    'Origin,X-Requested-With, Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,PATCH,OPTIONS,DELETE")
    next();
});

app.post("/api/posts",(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    })
    // used asve for model which we clreated for mongoose
    post.save().then(createdpost=>{
        res.status(201).json({
            // here we are getting the postid of the newly created post and then gicing out the success flag
            message:'success',
            postId: createdpost._id
        })
    })
  

}); 
// this function send response  
// /'posts' means it is lsiting all the request for posts call
 app.get("/api/posts",(req, res,next)=>{
  Post.find().then(documents=>{
    res.status(200).json({
        message :'fetched succesfully',
        posts: documents
    }) 
 })
   
});


app.delete("/api/posts/:id",(req,res,next)=>{
    // params are inbuilt by node.js to extraxt the json data
Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result)
})
res.status(200).json({
    message:'post deleted'
})
});

// way of sending packages or exports
module.exports = app;