import React, { useState, useEffect, useMemo, useRef } from "react";
import './empMonthlyview.css'
import { useNavigate } from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars-2';


function EmpMonthlyview() {

    const navigate = useNavigate();
    var value = 0
    var val = [];
    var oncall_;
    var arr = [];
    var arr_1 = [];
    var v;
    var name;
    var deptId;

    const emp_id = JSON.parse(sessionStorage.getItem("emp_id"))
    const month_name = JSON.parse(sessionStorage.getItem("month_name"))
    const month_number = JSON.parse(sessionStorage.getItem("month_number"))
    const year = JSON.parse(sessionStorage.getItem("year"))
    const week_start = JSON.parse(sessionStorage.getItem("week_start"))
    const week_end = JSON.parse(sessionStorage.getItem("week_end"))

    const inputRef = useRef(null);

    const emp_name1 = JSON.parse(sessionStorage.getItem("e_name"))

    const [Deptlist, Departmentlist] = useState([]);

    const [empname_list, Empname_List] = useState([]);

    const [shiftdetail, setshiftdetail] = useState([]);
    const [calloutdetail, setCallOutdetail] = useState([])
    const [oncalldetail, setOncalldetail] = useState([]);
    const [shdetail, setSHdetail] = useState([])

    const [monthL, monthList] = useState([]);
    const [dateD, date_day] = useState([]);
    const [dateD_1, dateDay_1] = useState([]);

    const [monthid, monthID] = useState(0);
    const [monthid_1, monthID_1] = useState([]);
    const [monthname, monthName] = useState('');
    const [iscurrentmonth, setCurrentMonth] = useState([]);
    const [iscurrentyear, setCurrentYear] = useState([]);

    const [isShifttype, setShifttype] = useState([])

    const [isempshiftdetail, setEmpShiftDetails] = useState([])
    const [shiftrosterlength, setShiftRosterLength] = useState([])


    const [weekstart, weekStart] = useState([]);
    const [weekend, weekEnd] = useState([]);

    const [backmin, backMin] = useState([]);
    const [nextmax, nextMax] = useState([]);



    // -----------------------------------------------Department-------------------------------------------------------------

    useEffect(() => {

        var today = new Date(),
            curMonth = today.getMonth() + 1;
        setCurrentMonth(curMonth)

        var curYear = today.getFullYear()
        setCurrentYear(curYear);

        fetch('http://10.155.3.231:3001/dept',
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => Departmentlist(resp))
    }, []);


    //--------------------------------------------------On department click----------------------------------------------------------- 

    const DepartmentNames = (e) => {

        deptId = e.target.value;

        console.log(e.target.value);
        let id = e.target.value;

        fetch(`http://10.155.3.231:3001/emp/deptid/${id}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then((resp) => Empname_List(resp))
    }

    // --------------------------------------------------shift details---------------------------------------------------------

    // --------------------------------------------------shift details---------------------------------------------------------

    useEffect(() => {


        var val = [{

            empid: emp_id,
            month: month_name,
            year: year
        }]


        const requestOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/count/shiftroster/`, requestOptions)
            .then(resp => resp.json())
            .then((resp) => { setEmpShiftDetails(resp); setShiftRosterLength(resp.length) })
    }, []);


    // ------------------------------------------------------------------------------------------------

    useEffect(() => {

        fetch('http://10.155.3.231:3001/shifttype',
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => setShifttype(resp))
    }, []);


    // -----------------------------------------------------------------------------------------------------
    // ------------------------------------------------Call Out details-------------------------------------------------------------

    useEffect(() => {

        fetch(`http://10.155.3.231:3001/callout/empid/${emp_id}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => setCallOutdetail(resp))
    }, []);

    //---------------------------------------------On Call details---------------------------------------------------------------- 

    useEffect(() => {


        var val = [{

            empid: emp_id,
            month: month_name,
            year: year
        }]


        const requestOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/count/oncall/`, requestOptions)
            .then(resp => resp.json())
            .then((resp) => { setOncalldetail(resp); })
    }, []);

    // useEffect(() => {

    //     fetch(`http://10.155.3.231:3001/oncall/empid/${emp_id}`,
    //         {
    //             method: 'Get',
    //             headers: {
    //                 'content-Type': 'application/json',
    //             }
    //         }
    //     ).then(resp => resp.json())
    //         .then(resp => setOncalldetail(resp))
    // }, []);

    //---------------------------------------------------Statutory Holiday detail-----------------------------------------------------------

    useEffect(() => {

        fetch(`http://10.155.3.231:3001/Statutory_holiday/empid/${emp_id}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => setSHdetail(resp))
    }, []);


    //---------------------------------------------------Month-----------------------------------------------------------

    useEffect(() => {

        fetch('http://10.155.3.231:3001/month',
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(resp => resp.json())
            .then(resp => monthList(resp))

    }, []);

    //---------------------------------------------------Date-----------------------------------------------------------

    useEffect(() => {

        fetch('http://10.155.3.231:3001/date',
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(resp => resp.json())
            .then((resp) => dateDay_1(resp))

    }, []);


    // --------------------------------------------------Update Overtime hr-------------------------------------------------------------

    const onOvertimeChange_hr = (e, deptid, date, day, month, year) => {

        value = e.target.value;
        if (e.target.value === '') {
            value = 0;
        }

        var val = [
            {
                ot_details: '',
                empid: emp_id,
                deptid: deptid,
                date: date,
                day: day,
                month: month,
                year: year
            }
        ]

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/overtime/ot_hr/${value}`, requestOptions)
            .then(response => response.json())
            .then((data) => console.log("SH = " + data));

    }

    //---------------------------------------------------Update OnCall hr-----------------------------------------------------------

    const onOCChange = (e, deptid, day, date, month, year) => {

        value = e.target.value;
        if (e.target.value === '') {
            value = 0;
        }

        var val = [
            {
                empid: emp_id,
                deptid: deptid,
                date: date,
                day: day,
                month: month,
                year: year
            }
        ]

        // console.log(JSON.stringify(val[0]))
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/oncall/oncall_hr/${value}`, requestOptions)
            .then(response => response.json())
            .then((data) => console.log("SH = " + data));

    }

    //---------------------------------------------------Update CallOut hr-----------------------------------------------------------

    const onCOChange = (e, deptid, day, date, month, year) => {

        var value = e.target.value;


        if (e.target.value === '') {
            value = 0;

        }
        console.log("value = " + value)
        var val = [
            {

                empid: emp_id,
                deptid: deptid,
                date: date,
                day: day,
                month: month,
                year: year
            }
        ]

        // console.log(JSON.stringify(val[0]))
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/oncall/callout_hr/${value}`, requestOptions)
            .then(response => response.json())
            .then((data) => console.log("SH = " + data));

    }

    // ----------------------------------------------------------------------------------------------------

    const handleClickOT = () => {

        var text = document.getElementById("ot");
        console.log(text.style.display);
        if (text.style.display === "none") {
            text.style.display = "block";
        } else {
            text.style.display = "none";
        }
    }


    //---------------------------------------------------------------------------------------------------------------

    const handleClickCO = (date) => {
        var text = document.getElementById(date);
        console.log(text.style.display);
        if (text.style.display === "none") {
            text.style.display = "block";
        } else {
            text.style.display = "none";
        }
    }

    //-------------------------------------------CallOut/OnCall Details-------------------------------------------------------------------

    const onChangeCODetail = (e, deptid, day, date, month, year) => {

        var details = e.target.value;

        if (e.target.value === '') {
            details = '';

        }

        // console.log("details = " + details)
        var val = [
            {
                empid: emp_id,
                deptid: deptid,
                date: date,
                day: day,
                month: month,
                year: year
            }
        ]

        // console.log(JSON.stringify(val[0]))
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/oncall/callout_details/` + "'" + `${details}` + "'", requestOptions)
            .then(response => response.json())
            .then((data) => console.log("SH = " + data));



    }

    //---------------------------------------------------RETURN-----------------------------------------------------------

    return (
        <div class="conatiner-flex">

            {/* <h1>{console.log("shiftlist = "+JSON.stringify(shiftlist))}</h1> */}
            {console.log("oncalldetail  = " + JSON.stringify(oncalldetail))}

            <div class="row">
                <div class="col">

                </div>
            </div>

            <div class="row">
                <div class="col-5 mt-3 empviewpage shadow-lg bg-white rounded maintable">

                </div>
            </div>

            {/* ---------------------- */}
            <div class="row">
                <div class="col empdetail shadow-lg">

                    <table class="table">
                        <thead>
                            <tr>
                                <th class="day border border-dark" style={{ width: '5vw', background: '#003366' }}>

                                    <h2 class='fw-bold text-white' style={{ fontSize: 15 }}>SUN </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>


                                    <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}>MON</h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}>TUE  </h2>

                                </th>

                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}>WED   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}>THU   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}>FRI   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#003366' }}>

                                    <h2 class='fw-bold text-white' style={{ fontSize: 15 }}>SAT   </h2>

                                </th>

                            </tr>
                        </thead>

                        <Scrollbars style={{ width: 1080, height: 415 }}>
                            <tbody>
                                <tr>
                                    <td class="border" style={{ height: 415, width: 155 }} >
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'SUN' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {
                                                    // console.log("date = " + x[0].date)

                                                    return <tr class="" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'SUN' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            // console.log("hello")
                                                                            return <div>
                                                                                {
                                                                                    <div>
                                                                                        <h5 style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                        <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                        <button >CallOut-Details</button>
                                                                                        <h5 class="border" style={{ fontSize: 13 }}>{c.callout_details}</h5>
                                                                                    </div>
                                                                                }


                                                                            </div>
                                                                        }
                                                                    })
                                                                }

                                                            </div>

                                                        }
                                                    </tr>
                                                }

                                            })
                                        }
                                    </td>

                                    <td class="border" style={{ height: 415, width: 153 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'MON' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {
                                                    // console.log("date = " + x[0].date)

                                                    return <tr class="border border-dark" >
                                                        {
                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    isShifttype.map(st => {

                                                                        return isempshiftdetail.map(s => {

                                                                            if (x[0].year === iscurrentyear && s.day === 'MON' && s.date === x[0].date && s.shiftid === st.id) {
                                                                                return <div>
                                                                                    <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{st.shiftname}</h5>
                                                                                </div>
                                                                            }

                                                                        })

                                                                    })

                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'MON' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }


                                                                {
                                                                    //<input class="ms-1 me-2 mt-1" placeholder="Enter OT/CO details" style={{ width: 130, height: 22 }}></input>
                                                                }


                                                                {
                                                                    shdetail.map(s => {

                                                                        // console.log("SH = " + s.sh)

                                                                        if (x[0].year === iscurrentyear && s.day === 'MON' && s.date === x[0].date && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-warning mt-2">FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (x[0].year === iscurrentyear && s.day === 'MON' && s.date === x[0].date && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>SH </h5>
                                                                            </div>
                                                                        }
                                                                    })
                                                                }

                                                            </div>
                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                    <td class="border" style={{ height: 415, width: 155 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'TUE' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    isShifttype.map(st => {

                                                                        return isempshiftdetail.map(s => {

                                                                            if (x[0].year === iscurrentyear && s.day === 'TUE' && s.date === x[0].date && s.shiftid === st.id) {
                                                                                return <div>
                                                                                    <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{st.shiftname}</h5>
                                                                                </div>
                                                                            }

                                                                        })

                                                                    })

                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'TUE' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }

                                                                {
                                                                    //<input class="ms-1 me-2 mt-1" placeholder="Enter OT/CO details" style={{ width: 130, height: 22 }}></input>
                                                                }

                                                                {
                                                                    shdetail.map(s => {

                                                                        // console.log("SH = " + s.sh)

                                                                        if (s.day === 'TUE' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-warning mt-2" style={{ fontSize: 13 }}>FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (s.day === 'TUE' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>SH </h5>
                                                                            </div>
                                                                        }
                                                                    })
                                                                }


                                                            </div>

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                    <td class="border" style={{ height: 415, width: 154 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'WED' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    isShifttype.map(st => {

                                                                        return isempshiftdetail.map(s => {

                                                                            if (x[0].year === iscurrentyear && s.day === 'WED' && s.date === x[0].date && s.shiftid === st.id) {
                                                                                return <div>
                                                                                    <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{st.shiftname}</h5>
                                                                                </div>
                                                                            }

                                                                        })

                                                                    })

                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'WED' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }


                                                                {
                                                                    // <input class="ms-1 me-2 mt-1" placeholder="Enter OT/CO details" style={{ width: 130, height: 22 }}></input>
                                                                }

                                                                {
                                                                    shdetail.map(s => {

                                                                        // console.log("SH = " + s.sh)

                                                                        if (s.day === 'WED' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-warning mt-2" style={{ fontSize: 13 }}>FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (s.day === 'WED' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>SH </h5>
                                                                            </div>
                                                                        }


                                                                    })
                                                                }


                                                            </div>

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                    <td class="border" style={{ height: 415, width: 154 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'THU' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    isShifttype.map(st => {

                                                                        return isempshiftdetail.map(s => {

                                                                            if (x[0].year === iscurrentyear && s.day === 'THU' && s.date === x[0].date && s.shiftid === st.id) {
                                                                                return <div>
                                                                                    <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{st.shiftname}</h5>
                                                                                </div>
                                                                            }

                                                                        })

                                                                    })

                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'THU' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }



                                                                {
                                                                    //<input class="ms-1 me-2 mt-1" placeholder="Enter OT/CO details" style={{ width: 130, height: 22 }}></input>
                                                                }

                                                                {
                                                                    shdetail.map(s => {

                                                                        // console.log("SH = " + s.sh)

                                                                        if (s.day === 'THU' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (s.day === 'THU' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>SH </h5>
                                                                            </div>
                                                                        }


                                                                    })
                                                                }

                                                            </div>

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                    <td class="border" style={{ height: 415, width: 155 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'FRI' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    isShifttype.map(st => {

                                                                        return isempshiftdetail.map(s => {

                                                                            if (x[0].year === iscurrentyear && s.day === 'FRI' && s.date === x[0].date && s.shiftid === st.id) {
                                                                                return <div>
                                                                                    <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{st.shiftname}</h5>
                                                                                </div>
                                                                            }

                                                                        })

                                                                    })

                                                                }


                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'FRI' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }



                                                                {
                                                                    // <input class="ms-1 me-2 mt-1" placeholder="Enter OT/CO details" style={{ width: 130, height: 22 }}></input>
                                                                }

                                                                {
                                                                    shdetail.map(s => {

                                                                        // console.log("SH = " + s.sh)

                                                                        if (s.day === 'FRI' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (s.day === 'FRI' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                                                            return <div>
                                                                                <h5 class="bg-danger mt-2" style={{ fontSize: 13 }}>SH </h5>
                                                                            </div>
                                                                        }


                                                                    })
                                                                }


                                                            </div>

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                    <td class="border" style={{ height: 415, width: 155 }}>
                                        {
                                            dateD_1.map((x) => {

                                                if (x[0].year === iscurrentyear && x[0].day === 'SAT' && parseInt(x[0].week) >= parseInt(week_start) && parseInt(x[0].week) <= parseInt(week_end)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (x[0].year === iscurrentyear && c.day === 'SAT' && c.date === x[0].date && JSON.stringify(c.oncall) === 'true') {

                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">OC</span > - {c.oncall_hr}  hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}><span class="fw-bold">CO</span > - {c.callout_hr} hrs </h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>{c.callout_details}</h5>

                                                                            </div>
                                                                        }
                                                                    })
                                                                }

                                                            </div>

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }

                                    </td>

                                </tr>

                            </tbody>
                        </Scrollbars>
                    </table>

                </div>
            </div>
        </div>

    )


}

export default EmpMonthlyview;