const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = 5000;

app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.mzolur4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect()
        console.log("connected to database");
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