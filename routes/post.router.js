const express=require("express")
const { PostModel } = require("../model/post.model")
const jwt = require("jsonwebtoken")

const postRouter = express.Router()

//Post get
postRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization;
    const decoded=jwt.verify(token,"evaluation")
    const {max,min}=req.query
    const query= req.query;
   try {
    if(decoded){
        const post = await PostModel.find(max&&min?{$and:[{"no_of_comments":{$gte:min}},{"no_of_comments":{$lte:max}}]}:{$and:[{"userId":decoded.userId},query]});
        res.status(200).send(post)
    }
   
   } catch (error) {
    res.status(400).send({"msg":error.message})
   }
})
//pagination
postRouter.get("/:page",async(req,res)=>{
     const limit = 3;
     let page_no = req.params.page>=1?req.params.page:1;
     page_no = page_no-1;
     try {
        const data = await PostModel.find().limit(limit).skip(limit*page_no)
        res.status(200).send(data)
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})

//top post get
postRouter.get("/top",async(req,res)=>{
    // console.log("hello")
    try {
        const data = await PostModel.find().sort({"no_of_comments":"-1"});
        console.log(data)
        res.status(200).send(data[0])
       } catch (error) {
        res.status(400).send({"msg":error.message})
       }
})

//post add
postRouter.post("/add",async(req,res)=>{
  try {
    const post = new PostModel(req.body)
    await post.save()
    res.status(200).send({"msg":"A new Post is created!"})
  } catch (error) {
    res.status(400).send({"msg":error.message})
  }

})

//post update
postRouter.patch("/update/:postId",async(req,res)=>{
    const {postId}=req.params;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({_id:postId},payload)
        res.status(200).send({"msg":"The post has been updated!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }

})

//post delete
postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params;
    try {
        await PostModel.findByIdAndDelete({_id:postId})
        res.status(200).send({"msg":"The post has been deleted!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



module.exports={
    postRouter
}