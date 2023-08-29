// var corsOptions = {
//     origin: 'http://10.155.6.171/:3007',
//     credentials: true,
//     authenticate: true,
//     authorization: true,
//     optionsSuccessStatus: 200 
//     }

// const express = require('express')
// const app = express();
// const pool = require('./Connection/db');
// let cors = require('cors')

// const PORT = process.env.PORT || 3001;
// const r = express.Router()
// //app.use( express.static( "public" ) );

// var server = require('http').createServer(app);
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.use(cors(corsOptions));

var corsOptions = {
    origin: 'http://10.155.2.236:3007',
    credentials: true,
    authenticate: true,
    authorization: true,
    optionsSuccessStatus: 200 
    }
    


var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
const r = express.Router()
app.use( express.static( "public" ) );
var server = require('http').createServer(app);
const pool = require('./Connection/db');
app.use(express.json());
let cors = require('cors')
app.use(cors(corsOptions))

 const path = require('path');
 app.use(express.static(path.join(__dirname, 'build')));

// -------------------------------------------------------------------------------------------------

// app.use(function a(req, res, next) {
//     var nodeSSPI = require('node-sspi');
//     var nodeSSPIObj = new nodeSSPI({
//         retrieveGroups: true,
//     });
//     nodeSSPIObj.authenticate(req, res, function (err) {
//         res.finished || next();
//     });    
// })


// app.get('*',function b(req, res, next) {
//     var out = req.connection.user;

//     var out_1 = req.connection.userSid; 

//     var usergroup = req.connection.usergroup

//     console.log(usergroup)


//     var q = "select * from emprole where empname = " + "'" + out + "'";

//     // console.log("out = " + out)
//     // console.log("q = " + out_1)

//     pool.query(q, (error, result) => {
//         if (error) throw error;
//         res.status(200).json(result.rows)
//     });
// })


// -------------------------------------------------------------------------------------------------


app.get('/month', (req, res, next) => {

    var date = new Date();
    var month = date.getMonth(); // returns 0 - 11

    var year = date.getFullYear();

    var months = [
        {
            id: 1,
            weekstart: 1,
            weekend: 4,
            month: "JAN",
            year: year

        },
        {
            id: 2,
            weekstart: 5,
            weekend: 8,
            month: "FEB",
            year: year

        },
        {
            id: 3,
            weekstart: 9,
            weekend: 13,
            month: "MAR",
            year: year

        },
        {
            id: 4,
            weekstart: 14,
            weekend: 17,
            month: "APR",
            year: year
        },
        {
            id: 5,
            weekstart: 18,
            weekend: 21,
            month: "MAY",
            year: year
        },
        {
            id: 6,
            weekstart: 22,
            weekend: 26,
            month: "JUN",
            year: year
        }, {
            id: 7,
            weekstart: 27,
            weekend: 30,
            month: "JUL",
            year: year
        },
        {
            id: 8,
            weekstart: 31,
            weekend: 35,
            month: "AUG",
            year: year
        },
        {
            id: 9,
            weekstart: 36,
            weekend: 39,
            month: "SEP",
            year: year
        },
        {
            id: 10,
            weekstart: 40,
            weekend: 43,
            month: "OCT",
            year: year
        },
        {
            id: 11,
            weekstart: 44,
            weekend: 48,
            month: "NOV",
            year: year
        },
        {
            id: 12,
            weekstart: 49,
            weekend: 52,
            month: "DEC",
            year: year
        }

    ];

    var a = [];

    for (let i = 0; i < 12; i++) {
        a.push(months[i]);
    }
    res.status(200).json(a)
});

function endFirstWeek(firstDate, firstDay) {
    if (!firstDay) {

        return 7 - firstDate.getDay();
    }
    if (firstDate.getDay() < firstDay) {
        return firstDay - firstDate.getDay();
    }
    else {
        return 7 - firstDate.getDay() + firstDay
    }
}


// ------------------------------------------get Date----------------------------------------------------------------

app.get('/date', (req, res, next) => {
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    var date_f = new Date();
    var month = date_f.getMonth(); // returns 0 - 11
    var year = date_f.getFullYear();
    var days_i = [];
    var d = [];
    var count = 7;
    var count_2 = 7;
    var count_3 = 7;
    var week = 1;
    var week_2 = 0;
    var week_3 = 0;
    var day = 0;
    var day_2 = 0;
    var day_3 = 0;
    var j = 0;
    var k = 0;
    var val = 0;
    // console.log(year)

    for (let i = 0; i < 36; i++) {

        // var lastmonth = new Date(year,0,1)


        if (i < 12) {

            var date_g = new Date(year - 1, i, 1);
            // console.log(date_g)

            while (date_g.getMonth() === i) {



                var startDate = new Date(date_g.getFullYear(), 0, 1);
                var enddate = new Date(date_g.getFullYear(), i, date_g.getDate())

                var numDays = enddate.getDate();

                var dayss = Math.floor((enddate - startDate + 86400000) / 86400000);

                if (date_g.getDate()) {
                    day++;
                    // console.log(date_g.getDate() + "  " + day)
                    // dayarr.push(day)
                }

                if (day <= count) {
                    week = week
                }
                else {
                    count = count + 7
                    week++
                    week = week
                }

                d = [
                    {
                        date: date_g.getDate(),
                        day: dayList[date_g.getDay()],
                        month: date_g.getMonth() + 1,
                        monthname: months[date_g.getMonth()],
                        week: week,
                        year: year - 1

                    }

                ]
                days_i.push(d)
                date_g.setDate(date_g.getDate() + 1)
            }
        }
        else if(i >= 12 && i < 24) {

            var date_g = new Date(year, j, 1);

            while (date_g.getMonth() === j) {

                //console.log(date_g.getDay()+"---"+dayList[date_g.getDay()]+"---"+date_g.getDate())

                var startDate = new Date(date_g.getFullYear(), 0, 1);
                var enddate = new Date(date_g.getFullYear(), j, date_g.getDate())

                // console.log("StartDate = "+startDate)

                var numDays = enddate.getDate();

                var dayss = Math.floor((enddate - startDate + 86400000) / 86400000);

               
                if (week_2 === 0 && date_g.getDay() === 0) {
                    val = 1;
                    week_2 = 1;

                    if (date_g.getDate()) {
                        day_2++;
                        // console.log(date_g.getDate() + "  " + day)
                        // dayarr.push(day)
                    }

                    if (day_2 <= count_2) {
                        week_2 = week_2
                        console.log(week_2)
                    }
                    else {
                        count_2 = count_2 + 7
                        week_2++
                        week_2 = week_2
                    }
                }
                else if (val === 1) {
                    if (date_g.getDate()) {
                        day_2++;
                        // console.log(date_g.getDate() + "  " + day)
                        // dayarr.push(day)
                    }

                    if (day_2 <= count_2) {
                        week_2 = week_2
                        // console.log(week_2)
                    }
                    else {
                        count_2 = count_2 + 7
                        week_2++
                        week_2 = week_2
                    }

                }

                d = [
                    {
                        date: date_g.getDate(),
                        day: dayList[date_g.getDay()],
                        month: date_g.getMonth() + 1,
                        monthname: months[date_g.getMonth()],
                        week: week_2,
                        year: year

                    }

                ]
                days_i.push(d)
                date_g.setDate(date_g.getDate() + 1)

            }
            ++j;

        }
        else {

            var date_g = new Date(year + 1, k, 1);
            console.log(date_g)

            while (date_g.getMonth() === k) {



                var startDate = new Date(date_g.getFullYear(), 0, 1);
                var enddate = new Date(date_g.getFullYear(), k, date_g.getDate())

                var numDays = enddate.getDate();

                var dayss = Math.floor((enddate - startDate + 86400000) / 86400000);

                if (date_g.getDate()) {
                    day_3++;
                    // console.log(date_g.getDate() + "  " + day)
                    // dayarr.push(day)
                }

                if (day_3 <= count_3) {
                    week_3 = week_3
                }
                else {
                    count_3 = count_3 + 7
                    week_3++
                    week_3 = week_3
                }

                d = [
                    {
                        date: date_g.getDate(),
                        day: dayList[date_g.getDay()],
                        month: date_g.getMonth() + 1,
                        monthname: months[date_g.getMonth()],
                        week: week_3,
                        year: year + 1

                    }

                ]
                days_i.push(d)
                date_g.setDate(date_g.getDate() + 1)
            }
            k++;
        }
        
    }



    res.json(days_i)
});


// -------------------------------------------------TEST------------------------------------------------------------


// --------------------------------------------------get all-----------------------------------------------------------

app.get('/:apiName', (req, res) => {
    console.log("Hello")

    pool.query('select * from ' + req.params.apiName, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
});

// ----------------------------------------------------get by id---------------------------------------------------------

app.get('/:apiName/:colName/:id', (req, res) => {

    const q = 'select * from ' + req.params.apiName + ' where ' + req.params.colName + '=' + req.params.id

    pool.query(q, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
});

// -------------------------------------------------------------------------------------------------------------

app.get('/deptid/:id', (req, res) => {
    const q = 'select * from shifttype s inner join deptshift d on s.id = d.shiftid where d.deptid = ' + req.params.id
    pool.query(q, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
})

// -------------------------------------------------get by join------------------------------------------------------------

app.get('/:tName1/:tName2/:cName1/:cName2/:cName3/:id', (req, res) => {

    const q = 'select * from ' + req.params.tName1 + ' t1 inner join ' + req.params.tName2 + ' t2 on t1.' + req.params.cName1 +
        ' = t2.' + req.params.cName2 + ' where t1.' + req.params.cName3 + ' = ' + req.params.id

    pool.query(q, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
})


app.get('/:tName1/:tName2/:cName1/:cName2', (req,res) => {

    const q = 'select * from ' + req.params.tName1 + ' t1 inner join ' + req.params.tName2 + ' t2 on t1.' + req.params.cName1 +
    ' = t2.' + req.params.cName2

    console.log("q = "+q)

    pool.query(q, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });

})

// -----------------------------------------------------------------------------------------------------------
// ---------------------------------------------------POST---------------------------------------------------------------

app.post('/:tname/:cName/:value', (req, res) => {

    const data = req.body;

    const updates = Object.entries(data)
        .map(([key, value], i) => `$${i + 1}`)
        .join(", ");

    const updates_1 = Object.entries(data)
        .map(([key, value], i) => `${key} = $${i + 1}`

        ).join(" and ");

    console.log("updates = " + updates)
    console.log("updates_1 = " + updates_1)

    const values = Object.values(data);

    const q1 = 'Insert into ' + req.params.tname + ' values (' + req.params.value + `,${updates})`

    const q2 = 'SELECT * from ' + req.params.tname + ` where ${updates_1}`

    const q3 = 'UPDATE ' + req.params.tname + ' set ' + req.params.cName + ' = ' + req.params.value + ` where ${updates_1}`


    console.log(q1)
    console.log(q2)
    console.log(q3)


    pool.query(q2, [...values],
        (error, result) => {
            console.log("result.rows.length = " + result.rows.length)
            if (result.rows.length) {

                pool.query(q3, [...values],
                    (err, results) => {
                        if (err) throw error;
                        res.status(201).json("Data is Updated successfully")

                    })
            }
            else {
                pool.query(q1, [...values],
                    (error, result) => {
                        if (error) throw error;
                        res.status(201).json("Data is entered successfully")
                    })
            }
        })
})

// -----------------------------------------------------------------------------------------------------

app.post('/count/:apiName', (req, res) => {

    // select count(shiftid) from shiftroster where shiftid = 1
    const data = req.body;

    const updates_1 = Object.entries(data)
        .map(([key, value], i) => `${key} = $${i + 1}`

        ).join(" and ");

    const values = Object.values(data);
    const q = 'select * from ' + req.params.apiName + ` where ${updates_1}`

    console.log(q)
    // console.log(updates_1)
    pool.query(q, [...values], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
});

// --------------------------------------------------PUT----------------------------------------------------------

app.put('/:tName/:cName/:value', (req, res) => {

    var response = [];

    const data = req.body;

    const updates = Object.entries(data)
        .map(([key, value], i) => `${key} = $${i + 1}`)
        .join(", ");

    const updates_1 = Object.entries(data)
        .map(([key, value], i) => `${key} = $${i + 1}`)
        .join(" and ");

    const values = Object.values(data);

    const q = 'select ' + req.params.cName + ' from ' + req.params.tName + ` where ${updates_1}`

    const q1 = 'UPDATE ' + req.params.tName + ' set ' + req.params.cName + ' = ' + req.params.value + ` where ${updates_1}`

    console.log(q);
    // console.log(req.params.value)
    console.log(q1)

    pool.query(q, [...values],
        (error, result) => {
            if (result.rows.length) {

                pool.query(q1, [...values],
                    (err, results) => {
                        if (err) throw error;
                        res.status(201).json("Data is Updated successfully")

                    }
                )
            }
        })
})

app.get('*', (req, res, next) => {
    console.log("hiiiii")

    res.status(200).json("Hello from node js")
});


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


server.listen(port, () => console.log(`app listening on port ${port}`));