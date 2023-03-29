const app=require('./app')
const dotenv=require('dotenv')
const  dbConnect=require('./config/Database')
dotenv.config({path:'config/config.env'})
const port=process.env.PORT||5000
dbConnect()


const server=app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)
})
//unhandled prommis rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`sutting the server due to unhadled promise rejection`);
        process.exit(1);
});

//unhandled prommis rejection at mongodb
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`sutting the server due to unhadled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});


