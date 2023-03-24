const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const db = require('./config/db')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const conversationRouter = require('./routes/conversationRoute')
const messageRouter = require('./routes/messagesRoute')
require('dotenv').config();
const PORT = 8090;


       //  database connection

       db(()=>{
        try{
            console.log("Database successfully Connected");
        }catch (error) {
            console.log("Database Not Connected :",error);
        }
    });


      //  middleware
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended : true, limit :'50mb'}))


      // cors
 app.use((req,res,next)=>{
    req.header("Acess-Control-Allow-Origin","*")
    req.header("Acess-Control-Allow-Origin","*")
    next()
 }) 
 
 

        //  static resources

// app.use('/uploads', express.static(path.join(__dirname, "/../uploads")))
// app.use( express.static(path.join(__dirname,"/../frontend/dist")))

// app.get("*", (req, res)=>{
//     try {
//         res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`))
//     } catch (e) {
//         res.sendFile('Ooops ! unexpected error')
//     }
// })

app.use(cors())

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/conversation',conversationRouter)
app.use('/message',messageRouter)


       // server listening
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Listening on port no ${PORT}`);
})