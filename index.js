const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("doctors"));
app.use(fileUpload());
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("Hello medical care!");
});

app.get("/a", (req, res) => {
  res.send("Hello medical care!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kv6ok.mongodb.net/servie-master?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // appointappointments
  const appointmentCollection = client.db("medical-care").collection("appointments");
  // articals
  const articalsCollection = client.db("medical-care").collection("articals");
  //  contact
  const contactCollection = client.db("medical-care").collection("contact");





  //  get all blogs
  app.get("/getBlog", (req, res) => {
    articalsCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });


  // get sepecefic blogby id
  const ObjId = require('mongodb').ObjectID
  app.get('/getBlog/:id', (req, res) => {
    articalsCollection.find({ _id: ObjId(req.params.id) })
      .toArray((err, doc) => {
        res.send(doc)
      })
  })


  // post single  blog
  app.post("/addBlog", (req, res) => {

    articalsCollection.insertOne(req.body).then((result) => {
      console.log(result.insertedCount);
    });
  });


  // post appointment
  app.post('/addAppointment', (req, res) => {
    appointmentCollection.insertOne(req.body)
      .then(res => console.log(res))
  })

  // post contact
  app.post('/addContact', (req, res) => {
    contactCollection.insertOne(req.body)
      .then(resp => {

        console.log(resp)
      })
  })







  // under hear contain experiment
  // //   add some data
  // app.post("/addBlog", (req, res) => {
  //   // const file = req.body.myFile.name;
  //   console.log(file);
  //   // file.mv(`${__dirname}/doctors/${file.name}`, (err) => {
  //   //   console.log(err);
  //   // });
  //   // // console.log(req.body.myFile);
  //   // blogCollection.insertOne(fakeBlog).then((result) => {
  //   //   console.log(result.insertedCount);
  //   // });
  // });

  // get some data blog ksldf lsdkflk 

  // app.get("/getBlog", (req, res) => {
  //   blogCollection.find({}).toArray((err, document) => {
  //     res.send(document);
  //   });
  // });

  // delete

  // const ObjectId = require("mongodb").ObjectId;

  // app.delete("/deletBlog/:id", (req, res) => {
  //   // console.log(req.params.id);
  //   blogCollection
  //     .deleteOne({ _id: ObjectId(req.params.id) })
  //     .then((result) => console.log(result));
  // });

  // const ObjectId = require("mongodb").ObjectId; age kora hyca tai akn kora lagbe na

  // app.delete("/deleteData/:id", (req, res) => {
  //   console.log(req.params.id);
  //   dataCollection
  //     .deleteOne({ _id: ObjectId(req.params.id) })
  //     .then((result) => console.log(result));
  // });

  // app.get("/blogs/:id", (req, res) => {
  //   blogCollection
  //     .find({ _id: ObjectId(req.params.id) })
  //     .toArray((err, document) => {
  //       res.send(document);
  //     });
  // });

  // here we'll update our data
  app.patch("/update", (req, res) => {
    // console.log(req.params.id);
    // console.log(req.params.id,req.body.status);
    console.log("four", req.body.status, req.body.id);
    // const ObjectId = require("mongodb").ObjectId;
    bookedServiceCollection
      .updateOne(
        { _id: ObjectId(req.body.id) },
        {
          $set: { status: req.body.status },
        }
      )

      .then((result) => {
        console.log("three", result);
        res.send(result);
      });
  });
});
