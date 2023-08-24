var express = require('express');
var app = express();
var port = process.env.PORT || 3002;
const r = express.Router()
app.use( express.static( "public" ) );
var server = require('http').createServer(app);
app.use(express.json());

 const path = require('path');
 app.use(express.static(path.join(__dirname, 'build')));


app.get('/test', (req, res, next) => {

    res.send("Hello from dept")
});


server.listen(port,'0.0.0.0', () => console.log(`this app listening on port ${port}`));