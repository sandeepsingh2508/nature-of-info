const mongoose=require('mongoose')
const validator=require('validator')

 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[20,'Name can not exceed 20 charecter'],
        minLength:[3,'Name must have 3 charecter'],
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter your valid email']
    },
    mobile:{
        type:Number,
        unique:true,
        required:[true,'Please enter your mobile number'],
        minLength:[9,'length must be atleast 9'],
        maxLength:[10,'must have 10 number']

    },
    address:{
        type:String
    }
})
module.exports=mongoose.model('Info',userSchema);