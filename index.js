const express = require('express')

const app = express()
const port =process.env.PORT|| 5000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.bdfv668.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    await client.connect();
    const EventsCollection = client.db("mussc").collection("events");
      //all data
      app.get("/events", async (req, res) => {
        const q = req.query;
        console.log(q);
        const cursor = EventsCollection.find(q);
        const result = await cursor.toArray();
        res.send(result);
      });

}
finally{

}
console.log("Database connected");

}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})