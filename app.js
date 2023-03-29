const express=require('express')
const app=express()
const ErrorMiddleware=require('./middlewares/Error')
const cookieParser=require('cookie-parser');


app.use(cookieParser())
const userRoute=require('./routes/UserRoutes')
const authUserRoute=require('./routes/AuthUserRoute')
//route
app.use('/api/v1',userRoute)
app.use('/api/v1',authUserRoute)
app.use(ErrorMiddleware)

module.exports=app;