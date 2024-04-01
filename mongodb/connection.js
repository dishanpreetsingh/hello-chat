import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () =>{
  mongoose.set('strictQuery', true)
  if(isConnected){
    console.log("MongoDB is Already Connected!!!!");
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName:"HelloChat",
      useNewUrlParser: false, // Set useNewUrlParser to false
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB is Connected Successfully');
  } catch (error) {
    console.log('error while connected to DB :>> ', error);
  }
}