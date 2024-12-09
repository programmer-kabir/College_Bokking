const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// College_Bokking
// rSnDCUOvOiaDEXkA

// Middle ware
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://College_Bokking:rSnDCUOvOiaDEXkA@cluster0.0i3pjbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const collegeDataCollection = client
      .db("College_Bokking")
      .collection("collegeData");

    const usersDataCollection = client
      .db("College_Bokking")
      .collection("users");
    const candidateDataCollection = client
      .db("College_Bokking")
      .collection("candidates");
    const reviewCollection = client
      .db("College_Bokking")
      .collection("reviews");

    //   College Data Collection
    app.get("/collegeData", async (req, res) => {
      const result = await collegeDataCollection.find().toArray();
      res.send(result);
    });
    // get all colleges data
    app.get("/admission/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await collegeDataCollection.findOne(query);
      res.send(result);
    });

    // Users Collection
    app.post("/users", async (req, res) => {
      const data = req.body;
      const query = { email: data.email };

      const existingUser = await usersDataCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exist" });
      }
      const result = await usersDataCollection.insertOne(data);
      res.send(result);
    });
    app.get('/users', async(req, res) =>{
      const result = await usersDataCollection.find().toArray()
      res.send(result)
    })
    // Candidates Collection

    app.post("/Candidate", async (req, res) => {
      try {
        const data = req.body;
    console.log(data);
        // Check for existing email
        const emailQuery = { email: data.email };
        const existingEmail = await candidateDataCollection.findOne(emailQuery);
    
        if (existingEmail) {
          // If email exists, check for collegeId
          const collegeQuery = { email: data.email, collegeId: data.collegeId };
          const existingCollege = await candidateDataCollection.findOne(collegeQuery);
    
          if (existingCollege) {
            return res.status(400).send({ message: "Email and College ID already exist." });
          }
        }
    
        // Insert new candidate data
        const result = await candidateDataCollection.insertOne(data);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
      }
    });
    

    // Candidates Collection
    app.get("/Candidate", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      if (!email) {
        res.send([]);
      }
      const query = { email: email };
      const result = await candidateDataCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/review', async(req, res) =>{
      const body = req.body
      console.log(body);
      const result  = await reviewCollection.insertOne(body)
      res.send(result)
    })

    app.get('/review', async(req, res) =>{
      const body = req.body;
      const result = await reviewCollection.find().toArray()
      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
