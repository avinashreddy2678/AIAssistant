import mongoose from "mongoose";
export async function connect(){
    mongoose.connect(process.env.MONGO_URI!);
    const connection=mongoose.connection
    connection.on('connected',()=>{
        console.log("connected successfully")
    })
    connection.on('error',(error)=>{
        console.log(error)
    })
}