// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ "time": req.time });
  }
);
// route parameter
app.get("/api/:date", (req, res) => {
  let reqDate = new Date();
  if (Number(req.params.date)) {
    reqDate = parseInt(req.params.date);
  } else {
    reqDate = Date.parse(req.params.date);
  }
  if (isNaN(reqDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    let dateObj = new Date(reqDate);
    let utcString = dateObj.toUTCString();
    res.json({
      unix: reqDate.valueOf(),
      utc: utcString
    });
  }
});
app.get("/api", (req, res) => {
  let reqDate = new Date();
  let utcString = reqDate.toUTCString();
  res.json({
    unix: reqDate.valueOf(),
    utc: utcString
  });
});

// listen for requests :)
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
