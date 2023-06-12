//Required packages
const expressLib = require('express');
const router = expressLib.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const conectiondb = require('./dbconnection/dbconnection');
const { auth } = require('express-openid-connect');
require('dotenv').config();

//Express library as app.
const app = expressLib();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};
  
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
  
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

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