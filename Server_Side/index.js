const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// College_Bokking
// rSnDCUOvOiaDEXkA


// Middle ware
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://College_Bokking:rSnDCUOvOiaDEXkA@cluster0.0i3pjbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const collegeDataCollection = client
      .db("College_Bokking")
      .collection("collegeData");



    //   College Data Collection
    app.get('/collegeData', async(req, res) =>{
        const result = await collegeDataCollection.find().toArray()
        res.send(result)
    })
    // get all colleges data 
    app.get('/admission/:id',async(req,res)=>{
      const id = req.params.id;
      // console.log(id);
      const query = {_id: new ObjectId (id)}
      const result = await collegeDataCollection.findOne(query);
      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Sever is running 😊😊😊");
  });
  app.listen(port);