const mongoose=require('mongoose')

const postSchema = mongoose.Schema({
    title:{type:String, required: true},
    content:{type:String, required: true}

})
// benefits of usijg model it fives features such as save and other
module.exports= mongoose.model('Post',postSchema);
