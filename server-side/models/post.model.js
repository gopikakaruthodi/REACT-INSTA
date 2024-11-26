import mongoose from "mongoose"

const postSchema=await mongoose.Schema({
    description:{type:String},
    images:[],
    postDate:{type:String},
    postedTime:{type:String},
    userID:{type:String}
})

export default mongoose.model.posts||mongoose.model("post",postSchema)