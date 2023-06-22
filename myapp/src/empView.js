import React, { useState, useEffect, useMemo, useRef } from "react";
import './empView.css'
import { useNavigate } from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars-2';


function Empview() {

    const navigate = useNavigate();
    var value = 0
    var val = [];
    var oncall_;
    var arr = [];
    var arr_1 = [];
    var v;
    var name;
    var deptId;

    const inputRef = useRef(null);

    const emp_name1 = JSON.parse(sessionStorage.getItem("e_name"))
    const emp_id = JSON.parse(sessionStorage.getItem("e_id"))

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

    const [weekstart, weekStart] = useState([]);
    const [weekend, weekEnd] = useState([]);

    const [backmin, backMin] = useState([]);
    const [nextmax, nextMax] = useState([]);



    // -----------------------------------------------Department-------------------------------------------------------------

    useEffect(() => {

        var today = new Date(),
        curMonth = today.getMonth() + 1;
    setCurrentMonth(curMonth)

    var curYear =  today.getFullYear()
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

    useEffect(() => {

        fetch(`http://10.155.3.231:3001/shiftroster/shifttype/shiftid/id/empid/${emp_id}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => setshiftdetail(resp))
    }, []);

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

        fetch(`http://10.155.3.231:3001/oncall/empid/${emp_id}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then(resp => setOncalldetail(resp))
    }, []);

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
            .then((resp) => date_day(resp))

    }, []);

    //---------------------------------------------------Month detail-----------------------------------------------------------

    const OnclickMonth = (e) => {

        var monthnumber= e.nativeEvent.target.selectedIndex;
        var id = e.target[e.target.selectedIndex].getAttribute('value_3')

        var name = e.nativeEvent.target[monthnumber].text;
        const weekend = e.target[e.target.selectedIndex].getAttribute('value_2')

        monthName(name)
        monthID(id);
        dateDay_1(dateD);
        weekStart(e.target.value);
        weekEnd(weekend);
        backMin(e.target.value);
        nextMax()

        monthID_1(id - 1);
    }

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
            {/* {console.log("shdetails  = "+JSON.stringify(shdetail))} */}

            <div class="row">
                <div class="col">

                </div>
            </div>

            <div class="row">
                <div class="col-5 mt-3 empviewpage shadow-lg bg-white rounded maintable">

                    <label class="month me-3"><h3 style={{ fontSize: 15,color: '#003366' }} class='fw-bold'>MONTH </h3></label>
                    <select class=" tabledata  p-1 border" onChange={OnclickMonth}  >select
                        <option disabled selected>--Select--</option>
                        {
                            monthL.map(x => {

                                if(iscurrentmonth <= x.id)
                                {
                                return (
                                    <option key={x.id} value={x.weekstart} value_2={x.weekend} value_3={x.id}>{x.month}</option>
                                ) }
                            })
                        }
                    </select>

                </div>
            </div>

            {/* ---------------------- */}
            <div class="row">
                <div class="col empdetail shadow-lg">

                    <table class="table">
                        <thead>
                            <tr>
                                <th class="day border border-dark" style={{ width: '5vw',background: '#003366' }}>

                                    <h2 class='fw-bold text-white' style={{ fontSize: 15 }}>SUN </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9'  }}>


                                    <h2 class='fw-bold' style={{ fontSize: 15,color: '#003366' }}>MON</h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9'  }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15,color: '#003366' }}>TUE  </h2>

                                </th>

                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9'  }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15 ,color: '#003366'}}>WED   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9'  }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15,color: '#003366' }}>THU   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9'  }}>

                                    <h2 class='fw-bold' style={{ fontSize: 15,color: '#003366' }}>FRI   </h2>

                                </th>


                                <th class="day border border-dark" style={{ width: '5vw',background: '#003366' }}>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'SUN' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {
                                                    // console.log("date = " + x[0].date)

                                                    return <tr class="" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'SUN' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'MON' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {
                                                    // console.log("date = " + x[0].date)

                                                    return <tr class="border border-dark" >
                                                        {
                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    shiftdetail.map(s => {

                                                                        if (s.month === monthname && s.day === 'MON' && s.date === x[0].date) {
                                                                            return <div>
                                                                                <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{s.shiftname}</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OT<input class="ms-4 me-2" onChange={(e) => onOvertimeChange_hr(e, s.deptid, s.date, s.day, s.month, s.year)} style={{ width: 25, height: 16 }}></input>hrs
                                                                                    {/* <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={handleClickOT} style={{ width: 27, height: 12, fontSize: 8 }}>Click</button> */}
                                                                                </h5>
                                                                                {/* <textarea name="popup" class="form-control" id="popup" rows="4" style={{ display: "none", width: 130, height: 30 }}></textarea> */}

                                                                            </div>
                                                                        }

                                                                    })
                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'MON' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                                        if (s.day === 'MON' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 'f') {
                                                                            return <div>
                                                                                <h5 class="bg-warning mt-2">FH </h5>
                                                                            </div>
                                                                        }
                                                                        else if (s.day === 'MON' && s.date === x[0].date && s.month === monthname && JSON.stringify(s.sh) === 'true' && s.type === 's') {
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

                                                if (x[0].year === iscurrentyear && x[0].day === 'TUE' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    shiftdetail.map(s => {

                                                                        if (s.month === monthname && s.day === 'TUE' && s.date === x[0].date) {
                                                                            return <div>
                                                                                <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{s.shiftname}</h5>
                                                                                <h5 style={{ fontSize: 13 }}>OT<input class="ms-4 me-2" onChange={(e) => onOvertimeChange_hr(e, s.deptid, s.date, s.day, s.month, s.year)} style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                            </div>
                                                                        }

                                                                    })
                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'TUE' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'WED' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    shiftdetail.map(s => {

                                                                        if (s.month === monthname && s.day === 'WED' && s.date === x[0].date) {
                                                                            return <div>
                                                                                <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{s.shiftname}</h5>
                                                                                <h5 style={{ fontSize: 13 }}>OT<input class="ms-4 me-2" onChange={(e) => onOvertimeChange_hr(e, s.deptid, s.date, s.day, s.month, s.year)} style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                            </div>
                                                                        }

                                                                    })
                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'WED' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'THU' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    shiftdetail.map(s => {

                                                                        if (s.month === monthname && s.day === 'THU' && s.date === x[0].date) {
                                                                            return <div>
                                                                                <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{s.shiftname}</h5>
                                                                                <h5 style={{ fontSize: 13 }}>OT<input class="ms-4 me-2" onChange={(e) => onOvertimeChange_hr(e, s.deptid, s.date, s.day, s.month, s.year)} style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                            </div>
                                                                        }

                                                                    })
                                                                }

                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'THU' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'FRI' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>
                                                                {
                                                                    shiftdetail.map(s => {

                                                                        if (s.month === monthname && s.day === 'FRI' && s.date === x[0].date) {
                                                                            return <div>
                                                                                <h5 class="fw-bold text-center" style={{ fontSize: 12, background: '#87CEEB' }}>{s.shiftname}</h5>
                                                                                <h5 style={{ fontSize: 13 }}>OT<input class="ms-4 me-2" onChange={(e) => onOvertimeChange_hr(e, s.deptid, s.date, s.day, s.month, s.year)} style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                            </div>
                                                                        }

                                                                    })
                                                                }


                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'FRI' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

                                                if (x[0].year === iscurrentyear && x[0].day === 'SAT' && parseInt(x[0].week) >= parseInt(weekstart) && parseInt(x[0].week) <= parseInt(weekend)) {


                                                    return <tr class="border border-dark" >
                                                        {

                                                            <div class="border border-primary" style={{ height: 200, width: 130 }} >
                                                                <h3 class="fw-bold" key={x.id}>{x[0].date}</h3>


                                                                {
                                                                    oncalldetail.map(c => {

                                                                        if (c.day === 'SAT' && c.date === x[0].date && c.month === monthname && JSON.stringify(c.oncall) === 'true') {
                                                                            return <div>
                                                                                <h5 class="" style={{ fontSize: 13 }}>OC <input onChange={(e) => onOCChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs</h5>
                                                                                <h5 class="" style={{ fontSize: 13 }}>CO <input onChange={(e) => onCOChange(e, c.deptid, c.day, c.date, c.month, c.year)} class="ms-3 me-2" style={{ width: 25, height: 16 }}></input>hrs
                                                                                    <button type="button" class="btn btn-sm btn-outline-secondary ms-2 pe-4 pb-3" id="textbutton" onClick={() => handleClickCO(c.date)} style={{ width: 25, height: 12, fontSize: 8 }}>Click</button>
                                                                                    <textarea name="co" id={c.date} cols="20" rows="10" onChange={(e) => onChangeCODetail(e, c.deptid, c.day, c.date, c.month, c.year)} class="form-control" style={{ display: "none", width: 130, height: 40 }} placeholder="CO/OC Details"></textarea>
                                                                                </h5>

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

export default Empview;