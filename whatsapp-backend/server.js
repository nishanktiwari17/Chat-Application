//importing
import express from "express"
import mongoose from "mongoose"
import { Messages, Login } from "./dbmessages.js"
import Pusher from "pusher"
import Cors from "cors"
import session from "passport-session"
import passport from "passport"

const port = process.env.PORT || 9000

//app config
const app = express();



//middleware

app.use(express.json());
app.use(Cors());

const pusher = new Pusher({
    appId: "1200653",
    key: "743918b70d1a043faf5e",
    secret: "35b4ead6fcf07da18f09",
    cluster: "eu",
    useTLS: true
});

//DB config
const connection_url="mongodb+srv://nishanktiwari:pJLbBZVVBPwIB9ms@whatsappclone.ft5ka.mongodb.net/whatsappDB?retryWrites=true&w=majority"

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
console.log("DB connected")

const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on('change', (change) => {
        console.log(change);

if(change.operationType === 'insert') {
    const messageDetails = change.fullDocument;
    pusher.trigger("messages","inserted",
    {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
    }
);
} else {
    console.log("Error pushing trigger");
}
    });
});
//api routes 
app.get("/",(req,res) => {
    res.status(200).send("Hola")
});

app.get("/messages/sync", (req,res) => {
    Messages.find((err,data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    });
});

app.post("/messages/new", (req,res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage, (err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`New Message created: \n ${data}`)
        }
    })
});

//listen
app.listen(port, () => console.log("Server is up and running"));