const functions = require('firebase-functions');
const admin = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

app.use(cors({ origin:true }));

const csrfMiddleware = csrf({ cookie: true });

const pageRouter = require('./router/page');

app.set('view engine', 'ejs');
app.set('html',require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname +'/static'));
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.use('/',pageRouter)

exports.api = functions.https.onRequest(app);
