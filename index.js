const express = require('express');
const cors = require('cors');
const app=express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port =process.env.PORT  || 5000
//middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_name}:${process.env.DB_password}@cluster0.ej2tmfe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

  try {
    const userCollection=client.db('toDo').collection('users');
    const todoListCollection=client.db('toDo').collection('toDo');

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.get('/users',async(req,res)=>{
        const result=await userCollection.find().toArray()
        res.send(result)
      })
      app.post('/users',async(req,res)=>{
        const users=req.body;
        const result=await userCollection.insertOne(users)
        res.send(result);
      })
    app.get('/toDoList',async(req,res)=>{
        const result=await todoListCollection.find().toArray()
        res.send(result)
      })
      app.post('/toDoList',async(req,res)=>{
        const lists=req.body;
        const result=await todoListCollection.insertOne(lists)
        res.send(result);
      })
      
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("doctor is running")

})
app.listen(port, ()=>{
    console.log("Server is running");
})
