const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const router = express.Router()
const port = 8000;

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:8001',
    ServerTwo = 'http://localhost:8002';

    app.all("/app1/*", function(req, res) {
      console.log('redirecting to Server1');
      apiProxy.web(req, res, {target: serverOne});
  });
  
  app.all("/app2/*", function(req, res) {
      console.log('redirecting to Server2');
      apiProxy.web(req, res, {target: ServerTwo});
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false  }));
app.use('/api', router)

 MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  const db = database.db("student_db")
  require('./app/routes')(app, db);

  // app.use(require('./tokenChecker'))
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})