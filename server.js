var corsOptions = {
    origin: 'http://10.155.3.231:3007',
    credentials: true,
    authenticate: true,
    authorization: true,
    optionsSuccessStatus: 200 
    }
    


var express = require('express');
var app = express();
var port = process.env.PORT || 3003;
const r = express.Router()
app.use( express.static( "public" ) );
var server = require('http').createServer(app);
const pool = require('./Connection/db');
app.use(express.json());
let cors = require('cors')
app.use(cors(corsOptions))



app.use(function a(req, res, next) {
    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true,
    });
    nodeSSPIObj.authenticate(req, res, function (err) {
        res.finished || next();
    });    
})

app.get('*',function b(req, res, next) {
    var out = req.connection.user;

    var out_1 = req.connection.userSid; 

    var usergroup = req.connection.usergroup

    console.log(usergroup)
   

    var q = "select * from emprole where empname = " + "'" + out + "'";

    // console.log("out = " + out)
    // console.log("q = " + q)

    pool.query(q, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    });
})



server.listen(port, function () {
    console.log(
        'Express server listening on port %d in %s mode',
        port,
        app.get('env')
    );
});
