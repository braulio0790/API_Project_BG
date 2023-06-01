//Required packages
const expressLib = require('express');
const router = expressLib.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const conectiondb = require('./dbconnection/dbconnection');

//Allow access to all the files in some folders

//Express library as app.
const app = expressLib();

//Prepare
app.use(cors());
app.use(bodyParser.json());
app.use(expressLib.urlencoded({ extended: true }));
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   next();
});

//Router endpoints
app.use('/', require('./routes/routes'));

//Handle errors
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//Initialized database. it should happen once.
const port = process.env.PORT || 8080;
conectiondb.initDb((err,mongodb) =>{
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});