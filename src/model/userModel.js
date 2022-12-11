const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password:{
        type:String,
        required:true
    }
    // tokens:[{
    //     token:{
    //         type:String,
    //     }
    // }]
});
userSchema.methods.generatToken = async function ()  {
    try {
         const token = jwt.sign({_id:this._id},"generatToken");
         this.tokens = this.tokens.concat({token:token});
         await this.save();
         return token;
    } catch (error) {
        console.log(error.message);
    }
};
const user = mongoose.model("user",userSchema);



module.exports = user;


