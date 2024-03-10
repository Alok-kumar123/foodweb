import express from 'express';
import Connection from './Database/db.js';
import defaultData from './default.js';
import router from './routes/Router.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app=express();
const port = process.env.port||8000
app.use(cors(
  {
  origin:["https://foodweb-client.vercel.app"],
  methods:["POST","GET","PUT"],
  credentials:true
 }
));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
//console.log(USERNAME)
const URL=process.env.MONGODB_URI||`mongodb://${USERNAME}:${PASSWORD}@ac-5apklnq-shard-00-00.ra0itpu.mongodb.net:27017,ac-5apklnq-shard-00-01.ra0itpu.mongodb.net:27017,ac-5apklnq-shard-00-02.ra0itpu.mongodb.net:27017/?ssl=true&replicaSet=atlas-11lkkn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster2`;
Connection(URL);
defaultData();
app.use('/',router)
