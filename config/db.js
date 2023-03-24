const mongoose = require("mongoose");

const db = async()=>{
  try{
      const connection = await mongoose.connect('mongodb+srv://Vyshnav:vyshnav.2440@cluster0.l9jvafx.mongodb.net/PostNow',{
          useNewUrlParser:true,
          useUnifiedTopology:true
      });
      console.log(`MongoDb Connected SuccessfullY : ${connection.connection.host} `);
  }catch (error){
          console.log('=========>',error);
  }
}

module.exports = db;

// mongodb+srv://Vyshnav:vyshnav.2440@cluster0.l9jvafx.mongodb.net/PostNow