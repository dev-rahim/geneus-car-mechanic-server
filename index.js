const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const port = 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.mzolur4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect()
        console.log("connected to database");
        const database = client.db("genusCarMechanic");
        const servicesCollection = database.collection("services");
        // GET API 
        app.get('/services', async (req, res) => {

            const services = await servicesCollection.find({}).toArray()
            res.json(services)
        })

        // get single service 
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const service = await servicesCollection.findOne({ _id: ObjectId(id) })
            res.json(service)
        })
        // POST API
        app.post('/services', async (req, res) => {

            const service = req.body;
            const result = await servicesCollection.insertOne(service)
            res.json(result)
        })
        // Delete API 
        app.delete('/services/:id', async (req, res) => {
            // console.log('delete hitted');
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await servicesCollection.deleteOne(query)
            res.json(result)
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        })
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.listen(port, () => {
    console.log('listening port ', port);
})