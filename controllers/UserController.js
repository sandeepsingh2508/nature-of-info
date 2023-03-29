const Info=require('../models/UserSchema')
const ErrorHandler=require('../utiles/ErrorHandler')
const catchAsyncError=require('../middlewares/CatchAsyncError')

//Post API(Create info)

 exports.createUserInfo=catchAsyncError(async(req,res,next)=>{
    const data=await Info.create(req.body)
    res.status(200).json({
        success:true,
        data
    })
})

//Get API(get all user Info)
exports.getAllUser=catchAsyncError(async(req,res,next)=>{
    const data=await Info.find()
    res.status(200).json({
        success:true,
        data
    })
})

//Get API(get single user by Id)
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
 
    const data=await Info.findById(req.params.id)
    if(!data){
        return next(new ErrorHandler(`Data not found`,404))
    }
    res.status(200).json({
        success:true,
        data
    })
})

//Put API(Update user Info)
exports.updateUserInfo=catchAsyncError(async(req,res,next)=>{
    let data=await Info.findById(req.params.id)
    if(!data){
        return next(new ErrorHandler(`Data is not found`,404))
    }
    data=await Info.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndMidify: false,
     })
     res.status(200).json({
        success:true,
        data
     })
})

//Delete API(Delete user Info by id)
exports.deleteUser= catchAsyncError(async (req, res, next) => {
    const data = await Info.findByIdAndRemove(req.params.id);
    if (!data) {
      return next(new ErrorHandler(`product not found`, 404));
    }
    
    res.status(200).json({
      success: true,
      massage: "Data deletion success",
    });
  });



