const mongoose=require("mongoose");
const AttemptSchema=new mongoose.Schema({
    score: {   
         type: Number,    
         required: true,  
    },  
    total: {    
        type: Number,    
        required: true,  
    },  
    date: {    
        type: Date,    
        default: Date.now,  
    },
});

module.exports = mongoose.model("attempts", AttemptSchema);
