import React, { useState, useEffect, useMemo } from "react";
import TableRows from "./TableRows"
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Scrollbar } from 'react-scrollbars-custom';


import 'react-multiple-select-dropdown-lite/dist/index.css'

import "./Roster.css";


//window.localStorage.setItem('MY_APP_STATE', JSON.stringify(showBanner));
//const data = JSON.parse(window.localStorage.getItem('MY_APP_STATE'));
function Home() {
    const navigate = useNavigate();
    var val = [];
    var oncall_;
    var arr = [];
    var arr_1 = [];
    var sun_date = 0;
    var val_ =0;
    var flag = 0 ;

    // var count = 0;
    // var s_id = 0;
    // var e_id = 0;



    var v;
    // var count = 0;
    var name;

    var deptId;

    const [countM, CountM] = useState(0);


    const [isshiftdetail, setShiftDetails] = useState([])
    const [isshiftrosterlength, setShiftRosterLength] = useState([])

    const [Deptlist, Departmentlist] = useState([]);
    const [deptid, DepartmentID] = useState([]);
    const [shiftlist, shiftList] = useState([])
    const [empname_list, Empname_List] = useState([]);
    const [empid, empID] = useState([]);
    const [monthL, monthList] = useState([]);
    const [dateD, date_day] = useState([]);
    const [dateD_1, dateDay_1] = useState([]);


    const [isyear, setYear] = useState([]);

    const [monthid, monthID] = useState(0);
    const [monthid_1, monthID_1] = useState([]);
    const [monthname, monthName] = useState('');
    const [iscurrentmonth, setCurrentMonth] = useState([]);

    const [iscurrentyear, setCurrentYear] = useState([]);

    const [isholiday, setHoliday] = useState([])
    const [isholidaycount, setHolidaycount] = useState([]);

    const [isshdetails, setSHDetails] = useState([])
    const [isshlength, setSHLength] = useState([])

    const [weekstart, weekStart] = useState([]);
    const [weekend, weekEnd] = useState([]);

    const [isoncalldetails, setOnCallDetails] = useState([]);
    const [isoncallLength, setOnCallLength] = useState([])

    const [backmin, backMin] = useState([]);
    const [nextmax, nextMax] = useState([]);
    const [empname_1, empName_1] = useState([]);

    const [selectedemp, selectedEmp] = useState();
    const [shiftid, shiftID] = useState(0);
    const [selectedshiftname, selectedShiftName] = useState([])
    const [countempid, countEmpID] = useState([])
    const [empshiftid, empShiftId] = useState([])


    // -------------------------------------------Getting Department list--------------------------------------------------------
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

    // ------------------------------------------Getting Employees by using DepartmentId------------------------------------------------------------
    const DepartmentNames = (e) => {

        deptId = e.target.value;
        DeptShiftList(deptId);
        DepartmentID(deptId);
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
            .then((resp) => Empname_List_demo(resp))

        month();
        date();
    }
    //---------------------------------------------------Employee List-------------------------------------------------------

    const Empname_List_demo = (e) => {

        var emplist = []
        for (var i = 0; i < e.length; i++) {
            emplist.push({
                value: e[i].empid,
                label: e[i].empname.replace('EMEA\\', '')

            })
        }

        console.log("emplist = " + JSON.stringify(emplist))

        Empname_List(emplist)

    }


    // -------------------------------------------Getting EmployeeID--------------------------------------------------------------
    const EmployeesName = (e) => {
        // 
        // const x = JSON.stringify(e)

        selectedEmp(e);

        let emp = []
        let a_empid = []

        for (let i = 0; i < e.length; i++) {
            // console.log(" e[i].value  = " + e[i].value)
            emp.push(e[i]);
            // console.log(" emp[i].value  = " + emp[i].value)
        }

        console.log("empname = " + emp)
        empName_1(emp);

        for (let i = 0; i < e.length; i++) {

            a_empid.push(e[i].value);

        }

        empID(a_empid)

        shiftID(0)
        console.log("empid = " + a_empid)
        // countemp(count)
    }

    // ------------------------------------------------------Holidays------------------------------------------------------

    useEffect(() => {

        fetch('http://10.155.3.231:3001/holidays',
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(resp => resp.json())
            .then(resp => setHoliday(resp))

    }, []);

    //--------------------------------------------------------Month-------------------------------------------------
    const month = () => {

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

    }

    // ------------------------------------------------Dates------------------------------------------------------------
    const date = () => {

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

    }

    // ------------------------------------------------OnClick Month----------------------------------------------------------

    const OnclickMonth = (e) => {

        var monthnumber = e.nativeEvent.target.selectedIndex;
        var id = e.target[e.target.selectedIndex].getAttribute('value_3')

        // console.log("month = " + id)

        var name = e.nativeEvent.target[monthnumber].text;
        const weekend = e.target[e.target.selectedIndex].getAttribute('value_2')
        const year = e.target[e.target.selectedIndex].getAttribute('year')

        const holidaycount = isholiday.filter(x => x.id)
        const value = parseInt(holidaycount.length) - 1;
        setHolidaycount(value)

        monthName(name)
        monthID(id);
        dateDay_1(dateD);
        weekStart(e.target.value);
        weekEnd(weekend);
        nextMax(weekend)
        backMin(e.target.value);
        nextMax()
        setYear(year)

        monthID_1(id - 1);
        // console.log("monthid_1 = " + monthid_1)


        var val = [{
            deptid: deptid,
            month: name,
            year: year
        }]

        console.log(JSON.stringify(val[0]))


        const requestOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/count/shiftroster/`, requestOptions)
            .then(resp => resp.json())
            .then((resp) => { setShiftDetails(resp); setShiftRosterLength(resp.length) })

        oncall(deptid, name, year)
        statutory_holiday(deptid, name, year)


    }

    //--------------------------------------------------------------------------------------------------

    const empnamelist = () => {

        empname_list.map(x => {
            return (
                <h3>{x.empname}</h3>
            )
        })
    }


    //------------------------------------------Next Button----------------------------------------------------

    const OnNext = (e) => {


        if (parseInt(weekstart) < parseInt(weekend)) {
            // console.log("weekstart" + weekstart)
            // console.log("weekend" + weekend)

            var weekstartnext = parseInt(weekstart) + 1;
            // nextB(e.target.value);
            // Table(nextb, dateD);
            weekStart(weekstartnext)
        }

        shiftID(0)

        var val = [{
            deptid: deptid,
            month: monthname,
            year: isyear
        }]

        console.log("Monthid = "+monthid)

        if (monthid !== 0) {
            const requestOptions = {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',

                },
                body: JSON.stringify(val[0])
            };
            fetch(`http://10.155.3.231:3001/count/shiftroster/`, requestOptions)
                .then(resp => resp.json())
                .then((resp) => { setShiftDetails(resp); setShiftRosterLength(resp.length) })

            oncall(deptid, monthname, isyear)
            statutory_holiday(deptid, monthname, isyear)

        }
    }

    // ------------------------------------------------------Prev button-----------------------------------------------------

    const OnBack = () => {
        if (parseInt(weekstart) > parseInt(backmin)) {
            var weekstartnext = parseInt(weekstart) - 1;
            weekStart(weekstartnext)
        }
        // nextB(e.target.value);
        // Table(nextb, dateD);
        var val = [{
            deptid: deptid,
            month: monthname,
            year: isyear
        }]

        console.log(JSON.stringify(val[0]))


        if (monthid !== 0) {
            const requestOptions = {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',

                },
                body: JSON.stringify(val[0])
            };
            fetch(`http://10.155.3.231:3001/count/shiftroster/`, requestOptions)
                .then(resp => resp.json())
                .then((resp) => { setShiftDetails(resp); setShiftRosterLength(resp.length) })

            oncall(deptid, monthname, isyear)
            statutory_holiday(deptid, monthname, isyear)

        }
    }

    const DeptShiftList = (e) => {

        fetch(`http://10.155.3.231:3001/deptshift/shifttype/shiftid/id/deptid/${e}`,
            {
                method: 'Get',
                headers: {
                    'content-Type': 'application/json',
                }
            }
        ).then(resp => resp.json())
            .then((resp) => shiftList(resp))



    }

    // --------------------------------------------On Shift click----------------------------------------------------------------

    const OnShiftClick = (e, date_, day_, month_, empname_, year_) => {

        var index = e.nativeEvent.target.selectedIndex;
        var shiftname = e.nativeEvent.target[index].text;
        var empid_from_shiftselection = e.target.value;
        var date = date_;
        var day = day_;
        var month = month_;
        var year = year_;
        var ename = empname_;

        const shiftid = e.target[e.target.selectedIndex].getAttribute('shiftid')

        shiftID(shiftid);

        // console.log("month = " + monthname);
        // console.log(shiftid+" == "+shiftname);

        countEmpID(empid_from_shiftselection)

        val = [
            {

                empid: empid_from_shiftselection,
                deptid: deptid,
                date: date,
                day: day,
                month: monthname,
                year: year
            }
        ]

        for (let i = 0; i < empid.length; i++) {
            arr_1.push(val[i])

        }

        // rosterData(val)
        {
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',

                },
                body: JSON.stringify(arr_1[0])
            };
            fetch(`http://10.155.3.231:3001/shiftroster/shiftid/${shiftid}`, requestOptions)
                .then(response => response.json())
                .then((data) => console.log("post = " + data));
        }

        empShiftId(arr_1);

        selectedShiftName(shiftname);

    }



    // --------------------------------------------------OnCall-----------------------------------------------------

    const oncall = (deptid, month, year) => {

        var val = [{
            deptid: deptid,
            month: month,
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
            .then((resp) => { setOnCallDetails(resp); setOnCallLength(resp.length) })


    }



    const onCallCheck_Mon = (e, empid_, date_, day_, month_, year_) => {

        const value = e.target.value;
        const checked = e.target.checked;

        var empid = empid_;
        var date = date_;
        var day = day_;
        var month = month_;
        var year = year_;

        oncall_ = [
            {
                oncall_hr: 0,
                callout_hr: 0,
                callout_details: '',
                empid: empid,
                deptid: deptid,
                date: date,
                day: day,
                month: monthname,
                year: year
            }
        ]

        for (let i = 0; i < empid.length; i++) {
            arr.push(oncall_[i])

        }

        // console.log("oncall = "+oncall_[0].oncall)

        // console.log("count = " + countM)

        if (JSON.stringify(checked) === 'true' || JSON.stringify(checked) === 'false') {
            CountM(1);
            // console.log("hello")

            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',

                },
                body: JSON.stringify(oncall_[0])
            };
            fetch(`http://10.155.3.231:3001/oncall/oncall/${checked}`, requestOptions)
                .then(response => response.json())
                .then((data) => console.log("oncall = " + data));
        }

    }

    // -------------------------------------------------------------------------------------------------------------

    // -------------------------------------------------Statutory Holiday------------------------------------------------------

    const statutory_holiday = (deptid, month, year) => {

        var val = [{
            deptid: deptid,
            month: month,
            year: year
        }]


        const requestOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json; charset=UTF-8',

            },
            body: JSON.stringify(val[0])
        };
        fetch(`http://10.155.3.231:3001/count/statutory_holiday/`, requestOptions)
            .then(resp => resp.json())
            .then((resp) => { setSHDetails(resp); setSHLength(resp.length) })

    }



    const onSH_CheckM = (e, h_type, empid_, date_, day_, month_, year_) => {

        const value = e.target.value;
        const checked = e.target.checked;
        console.log("type = " + h_type)

        var empid_ = empid_;
        var date = date_;
        var day = day_;
        var month = month_;
        var year = year_;



        var sh_ = [
            {
                type: h_type,
                empid: empid_,
                deptid: deptid,
                date: date,
                day: day,
                month: monthname,
                year: year
            }
        ]

        // console.log("hello_1")
        if (JSON.stringify(checked) === 'true' || JSON.stringify(checked) === 'false') {

            // console.log("hello")

            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',

                },
                body: JSON.stringify(sh_[0])
            };
            fetch(`http://10.155.3.231:3001/statutory_holiday/SH/${checked}`, requestOptions)
                .then(response => response.json())
                .then((data) => console.log("SH = " + data));
        }

    }

    // ----------------------------------------------ShiftDetails----------------------------------------------------

    // useEffect(() => {

    //     fetch(`http://10.155.3.231:3001/shiftroster/`,
    //         {
    //             method: 'Get',
    //             headers: {
    //                 'content-Type': 'application/json',
    //             }
    //         }
    //     ).then(resp => resp.json())
    //         .then(resp => setshiftdetail(resp))
    // }, []);

    // -----------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------


    return (

        <div class="container-flex bg" >
            {/* {console.log("year = "+iscurrentyear)} */}


            <div class="row">
                <div class="col">


                </div>
            </div>
            <div class="row rosterpagerow">
                {/* <div class="col-3">

                </div> */}

                <div class="col-3 mt-3 rosterpage bg-white rounded maintable">

                    <label class=" mt-3 pe-2" ><h3 style={{ fontSize: 13, color: '#003366' }} class='fw-bold'>DEPARTMENT  </h3></label>
                    <select className="tabledata p-1 ms-1 mt-3 border" style={{ width: 200 }} onChange={DepartmentNames} >select
                        <option disabled selected>--Select--</option>
                        {
                            Deptlist.map(x => {
                                return (
                                    <option key={x.id} value={x.id} >{x.deptname}</option>
                                )
                            })
                        }
                    </select>

                    <div class='mt-4'>
                        <label class=""><h3 style={{ fontSize: 13, color: '#003366' }} class='fw-bold'>MONTH </h3></label>
                        <select class="textbox p-1 ps-2 pe-4 border" style={{ width: 200 }} onChange={OnclickMonth}  >select
                            <option disabled selected>--Select--</option>
                            {
                                monthL.map((x) => {
                                    // console.log("in month map = "+x.weekend)
                                    if (iscurrentmonth <= x.id) {

                                    return (
                                        <option key={x.id} year={x.year} value={x.weekstart} value_2={x.weekend} value_3={x.id}>{x.month}</option>
                                    )
                                    }
                                })
                            }
                        </select>
                    </div>

                    <div class="app mt-3">
                        <label class=" mt-3 pe-4"><h3 style={{ fontSize: 13, color: '#003366' }} class='fw-bold'>EMPLOYEES </h3></label>
                        {/* <pre>{JSON.stringify(selectedemp)}</pre> */}
                        <Scrollbars style={{ width: 200, height: 300, marginTop: 270 }} >
                            <Select class="dropdown-container border"
                                options={empname_list}
                                placeholder="--Select--"
                                value={selectedemp}
                                onChange={EmployeesName}
                                isSearchable={true}
                                isMulti={true} />
                        </Scrollbars>

                    </div>

                </div>


                <div class="col-7 rostertable ms-3">
                    <div class="mt-3 shadow-lg bg-white " >
                        <span class='fw-bold rostername' style={{ fontSize: 22 }}>Monthly Roster Planner</span>

                        <button value={1} style={{ color: '#003366' }} onClick={OnBack} class="back mt-3 fw-bold border "><small>Prev</small></button>

                        <button value={1} style={{ color: '#003366' }} onClick={OnNext} class="next mt-3 fw-bold border"><small>Next</small></button>
                    </div>

                    <table class="table">
                        <thead>
                            <tr>

                                <th class="name border border-dark text-center" style={{ width: '7.6vw', background: '#d0f1f9', color: '#003366' }}><small>NAME</small></th>

                                <th class="claim border border-dark text-center" style={{ width: '6.70vw', background: '#d0f1f9', color: '#003366' }}><small>CLAIM TYPE</small></th>


                                <th class="day border border-dark" style={{ width: '4.13vw',background: '#003366' }}>
                                    {
                                        monthid === 0 ? (<h2 class='fw-bold text-white' style={{ fontSize: 15 }}><small>SUN   </small></h2>) : (
                                            dateD_1.map((x) => {

                                                // console.log("in datemap=" +x[0].year)

                                                if (x[0].year === iscurrentyear && x[0].day === 'SUN' && (parseInt(monthid_1) << x[0].month || parseInt(monthid) === x[0].month) && (x[0].week === parseInt(weekstart))) {
                                                    // console.log("Date = "+x[0].date)
                                                    sun_date = x[0].date;

                                                    return <h2 class='fw-bold text-white text-center' style={{ fontSize: 15 }} key={x} ><small>SUN   </small>{x[0].date}</h2>

                                                }

                                            }))
                                    }
                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>
                                    {
                                        (monthid === 0) ? <h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}><small>MON   </small></h2> : (
                                            dateD_1.map((x) => {

                                                var count = 0;

                                                if (x[0].year === iscurrentyear && x[0].day === 'MON' && (parseInt(monthid_1) << x[0].month || parseInt(monthid) === x[0].month) && (x[0].week === parseInt(weekstart))) {

                                                    return isholiday.map((h, i) => {

                                                        if (x[0].year === iscurrentyear && parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'MON' && parseInt(x[0].date) === h.date && h.type === 's') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-danger text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>MON   </small>{x[0].date}</h2>

                                                        }
                                                        else if (x[0].year === iscurrentyear && parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'MON' && parseInt(x[0].date) === h.date && h.type === 'f') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-warning text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>MON   </small>{x[0].date}</h2>
                                                        }
                                                        else if (count === 0 && !(i < isholidaycount)) {
                                                            // console.log("i length = "+i)
                                                            ++count
                                                            return <h2 class='fw-bold text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>MON   </small>{x[0].date}</h2>
                                                        }

                                                    })
                                                }

                                            })

                                        )
                                    }
                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>
                                    {

                                        monthid === 0 ? (<h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}><small>TUE  </small></h2>) : (
                                            dateD_1.map((x) => {

                                                // console.log("in datemap=" + isholiday[0].day)
                                                var count = 0;

                                                if (x[0].year === iscurrentyear && x[0].day === 'TUE' && (monthid_1 << x[0].month || monthid == x[0].month) && x[0].week == weekstart) {
                                                    // console.log("count = "+count)
                                                    return isholiday.map((h, i) => {

                                                        if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'TUE' && parseInt(x[0].date) === h.date && h.type === 's') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-danger text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>TUE  </small>{x[0].date}</h2>

                                                        }
                                                        else if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'TUE' && parseInt(x[0].date) === h.date && h.type === 'f') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-warning text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>TUE  </small>{x[0].date}</h2>
                                                        }
                                                        else if (count === 0 && !(i < isholidaycount)) {
                                                            // console.log("i length = "+i)
                                                            ++count
                                                            return <h2 class='fw-bold text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>TUE  </small>{x[0].date}</h2>
                                                        }
                                                    })

                                                }

                                            }))
                                    }
                                </th>

                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>
                                    {
                                        monthid === 0 ? (<h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}><small>WED  </small></h2>) : (
                                            dateD_1.map((x) => {

                                                // console.log("in datemap=" + x[0].day)
                                                var count = 0;
                                                if (x[0].year === iscurrentyear && x[0].day === 'WED' && (monthid_1 << x[0].month || monthid == x[0].month) && x[0].week == weekstart) {

                                                    return isholiday.map((h, i) => {

                                                        if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'WED' && parseInt(x[0].date) === h.date && h.type === 's') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-danger text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>WED  </small>{x[0].date}</h2>

                                                        }
                                                        else if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'WED' && parseInt(x[0].date) === h.date && h.type === 'f') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-warning text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>WED  </small>{x[0].date}</h2>
                                                        }
                                                        else if (count === 0 && !(i < isholidaycount)) {
                                                            // console.log("i length = "+i)
                                                            ++count
                                                            return <h2 class='fw-bold text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>WED  </small>{x[0].date}</h2>
                                                        }

                                                    })

                                                }


                                            }))
                                    }
                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>
                                    {
                                        monthid === 0 ? (<h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}><small>THU   </small></h2>) : (
                                            dateD_1.map((x) => {

                                                var count = 0;

                                                if (x[0].year === iscurrentyear && x[0].day === 'THU' && (monthid_1 << x[0].month || monthid == x[0].month) && x[0].week == weekstart) {

                                                    return isholiday.map((h, i) => {

                                                        if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'THU' && parseInt(x[0].date) === h.date && h.type === 's') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-danger text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>THU   </small>{x[0].date}</h2>

                                                        }
                                                        else if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'THU' && parseInt(x[0].date) === h.date && h.type === 'f') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-warning text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>THU   </small>{x[0].date}</h2>
                                                        }
                                                        else if (count === 0 && !(i < isholidaycount)) {
                                                            // console.log("i length = "+i)
                                                            ++count
                                                            return <h2 class='fw-bold text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>THU   </small>{x[0].date}</h2>
                                                        }

                                                    })

                                                }
                                            }))
                                    }
                                </th>


                                <th class="day border border-dark" style={{ width: '5vw', background: '#d0f1f9' }}>
                                    {
                                        monthid === 0 ? (<h2 class='fw-bold' style={{ fontSize: 15, color: '#003366' }}><small>FRI   </small></h2>) : (
                                            dateD_1.map((x) => {

                                                var count = 0;

                                                if (x[0].year === iscurrentyear && x[0].day === 'FRI' && (monthid_1 << x[0].month || monthid == x[0].month) && x[0].week == weekstart) {

                                                    return isholiday.map((h, i) => {

                                                        if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'FRI' && parseInt(x[0].date) === h.date && h.type === 's') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-danger text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>FRI   </small>{x[0].date}</h2>

                                                        }
                                                        else if (parseInt(x[0].year) === parseInt(h.year) && h.month === monthname && h.day === 'FRI' && parseInt(x[0].date) === h.date && h.type === 'f') {
                                                            ++count;
                                                            return <h2 class='fw-bold bg-warning text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>FRI   </small>{x[0].date}</h2>
                                                        }
                                                        else if (count === 0 && !(i < isholidaycount)) {
                                                            // console.log("i length = "+i)
                                                            ++count
                                                            return <h2 class='fw-bold text-center' style={{ fontSize: 15, color: '#003366' }} key={x} ><small>FRI   </small>{x[0].date}</h2>
                                                        }

                                                    })

                                                }

                                            }))
                                    }
                                </th>


                                <th class="day border border-dark" style={{ width: '4.13vw',background: '#003366' }}>
                                    {
                                        monthid === 0 ? (<h2 class='fw-bold text-white' style={{ fontSize: 15 }}><small>SAT   </small></h2>) : (
                                            dateD_1.map((x) => {
                                                console.log("sun_date = " + sun_date)


                                                if (x[0].year === iscurrentyear && x[0].day === 'SAT' && (parseInt(monthid_1) << x[0].month || parseInt(monthid) === x[0].month) && (x[0].week === parseInt(weekstart))) {
                                                    console.log("x[0].date = " + x[0].date)
                                                    return <h2 class='fw-bold text-white text-center' style={{ fontSize: 15 }} key={x} ><small>SAT   </small>{x[0].date}</h2>

                                                }
                                            }))
                                    }
                                </th>



                            </tr>
                        </thead>
                        {/*---------------------------------------------------------------------------------------------------  */}
                        <Scrollbars style={{ width: 725, height: 400 }}>
                            <tbody >

                                {
                                    empname_1.map((x, i) => {

                                        return <div><tr>
                                            <Scrollbars style={{ width: 115, height: 129 }} class="border"><td class="border name text-white fw-bold " style={{ fontSize: 12, width: '9vw', height: 120 }} key={i} value={x.value}>{x.label}</td></Scrollbars>

                                            {/*------------------------------------------------------------------------------------------------------  */}

                                            <td class="border border-dark" style={{ width: '4.3vw' }}>
                                                <h5 class="p-1 mb-3 name text-white border border-dark fw-bold " style={{ fontSize: 13, width: '6.3vw' }}>SHIFT</h5>
                                                <h5 class="p-1 mb-3 bg-light text-dark border border-dark fw-bold " style={{ fontSize: 13, width: '6.3vw' }}>ON CALL</h5>
                                                {/* <h5 class="p-1 mb-3 bg-light text-dark border border-dark fw-bold " style={{ fontSize: 13, width: '6.4vw' }}>CALL OUT</h5> */}
                                                <h5 class="p-1  name text-white border border-dark fw-bold " style={{ fontSize: 13, width: '6.3vw' }}>SH/FH</h5>

                                            </td>

                                            {/* select * from shiftroster sr inner join shifttype st on sr.shiftid = st.id */}

                                            <td class="border border-dark " style={{ width: '5.6vw' }}>
                                                {
                                                    dateD_1.map(a => {
                                                        var t = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'SUN' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {


                                                            return (

                                                                <div class="d">

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'SUN' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        t = 1;
                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input"  type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'SUN' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        t = 1;
                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && t === 0) {
                                                                                        t = 1;

                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>
                                                                </div>)
                                                        }
                                                    })

                                                }
                                            </td>

                                            {/*-------------------------------------------------------------------------------------------------------  */}


                                            <td class="border border-dark" style={{ width: '5.6vw' }}>
                                                {
                                                    dateD_1.map(a => {

                                                        var count = 0;
                                                        var k = 0;
                                                        var u = 0;
                                                        var mon_h = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'MON' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">
                                                                    <tr>
                                                                        {
                                                                            <select class="textbox_1 " onChange={(e) => OnShiftClick(e, a[0].date, a[0].day, a[0].month, x.label, a[0].year)} >
                                                                                {
                                                                                    isshiftrosterlength !== 0

                                                                                        ?
                                                                                        shiftlist.map((sl, i) => {


                                                                                            return isshiftdetail.map((s, j) => {
                                                                                                // console.log("i = " + i + " and j = " + j)
                                                                                                //console.log(a[0].date +'==='+ s.date)
                                                                                                if(x.value === s.empid  && parseInt(a[0].date) === parseInt(s.date) && j===0 && s.shiftid === 1 && flag===0)
                                                                                                {
                                                                                                    flag = 1;
                                                                                                    console.log("hello")
                                                                                                    
                                                                                                }


                                                                                                if (x.value === s.empid && s.day === 'MON' && parseInt(a[0].date) === parseInt(s.date) && sl.id === s.shiftid && flag!==1) {

                                                                                                    return <option disabled selected><small>{sl.shiftname}</small></option>

                                                                                                }
                                                                                                // if(s.day === 'MON' && parseInt( a[0].date) !== parseInt(s.date) && k === 1)
                                                                                                else if (k === 0) {
                                                                                                    k = 1;

                                                                                                    return <option disabled selected>select</option>
                                                                                                }
                                                                                                if(flag === 1 && val_ === 0 && x.value === s.empid)
                                                                                                {
                                                                                                  
                                                                                                    val_ = 1;
                                                                                                    
                                                                                                    return <option disabled selected><small>{sl.shiftname}</small></option>
                                                                                                }

                                                                                            })

                                                                                        })

                                                                                        :

                                                                                        <option disabled selected>Select</option>
                                                                                }

                                                                                {
                                                                                    shiftlist.map(s => {
                                                                                        // console.log("in month map = "+x.weekstart)

                                                                                        return (

                                                                                            <option key={s.id} value={x.value} shiftid={s.shiftid}><small>{s.shiftname}</small></option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </tr>

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0

                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'MON' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        u = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'MON' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        u = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && u === 0) {
                                                                                        u = 1;

                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check mt-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>


                                                                    <tr>

                                                                        {
                                                                            isshlength !== 0

                                                                                ?

                                                                                isshdetails.map((s, id) => {

                                                                                    if (s.day === 'MON' && JSON.stringify(s.sh) === 'true' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'MON' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    else if (s.day === 'MON' && JSON.stringify(s.sh) === 'false' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'MON' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(s.date) || parseInt(x.value) !== parseInt(s.empid)) && parseInt(id) + 1 === parseInt(isshlength) && mon_h === 0) {


                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'MON' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count



                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                console.log("bye")
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })

                                                                                    }

                                                                                })

                                                                                :

                                                                                isholiday.map((h, i) => {

                                                                                    if (h.day === 'MON' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                        ++count


                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }
                                                                                    else if (count === 0 && !(i < isholidaycount)) {
                                                                                        ++count
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                })
                                                                        }


                                                                    </tr>

                                                                </div>)
                                                        }
                                                    })
                                                }
                                            </td>


                                            {/* ----------------------------------------------------------------------------------------------------- */}
                                            <td class="border border-dark" style={{ width: '5.68vw' }}>
                                                {
                                                    dateD_1.map(a => {

                                                        var count = 0;
                                                        var l = 0;
                                                        var v = 0;
                                                        var mon_h = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'TUE' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">
                                                                    <tr>
                                                                        {
                                                                            <select class="textbox_1" onChange={(e) => OnShiftClick(e, a[0].date, a[0].day, a[0].month, x.label, a[0].year)} >select
                                                                                {
                                                                                    isshiftrosterlength !== 0

                                                                                        ?
                                                                                        shiftlist.map((sl, i) => {


                                                                                            return isshiftdetail.map((s, j) => {
                                                                                                // console.log("i = " + i + " and j = " + j)
                                                                                                //console.log(a[0].date +'==='+ s.date)


                                                                                                if (x.value === s.empid && s.day === 'TUE' && parseInt(a[0].date) === parseInt(s.date) && sl.id === s.shiftid) {

                                                                                                    return <option disabled selected>{sl.shiftname}</option>
                                                                                                }
                                                                                                // if(s.day === 'MON' && parseInt( a[0].date) !== parseInt(s.date) && k === 1)
                                                                                                else if (l === 0) {
                                                                                                    l = 1;

                                                                                                    return <option disabled selected>select</option>
                                                                                                }

                                                                                            })

                                                                                        })

                                                                                        :

                                                                                        <option disabled selected>Select</option>
                                                                                }

                                                                                {
                                                                                    shiftlist.map(s => {
                                                                                        // console.log("in month map = "+x.weekstart)

                                                                                        return (

                                                                                            <option key={s.id} value={x.value} shiftid={s.shiftid}>{s.shiftname}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </tr>

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'TUE' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        v = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'TUE' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        v = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && v === 0) {
                                                                                        v = 1;

                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check mt-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>


                                                                    <tr>

                                                                        {
                                                                            isshlength !== 0

                                                                                ?

                                                                                isshdetails.map((s, id) => {

                                                                                    if (s.day === 'TUE' && JSON.stringify(s.sh) === 'true' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'TUE' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    else if (s.day === 'TUE' && JSON.stringify(s.sh) === 'false' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'TUE' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(s.date) || parseInt(x.value) !== parseInt(s.empid)) && parseInt(id) + 1 === parseInt(isshlength) && mon_h === 0) {


                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'TUE' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count



                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {

                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })

                                                                                    }

                                                                                })

                                                                                :

                                                                                isholiday.map((h, i) => {

                                                                                    if (h.day === 'TUE' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                        ++count


                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }
                                                                                    else if (count === 0 && !(i < isholidaycount)) {
                                                                                        ++count
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                })
                                                                        }


                                                                    </tr>

                                                                </div>)
                                                        }
                                                    })
                                                }
                                            </td>


                                            {/* ------------------------------------------------------------------------------------------------------ */}
                                            <td class="border border-dark" style={{ width: '5.65vw' }}>
                                                {
                                                    dateD_1.map(a => {

                                                        var count = 0;
                                                        var m = 0
                                                        var w = 0;
                                                        var mon_h = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'WED' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">
                                                                    <tr>
                                                                        {
                                                                            <select class="textbox_1" onChange={(e) => OnShiftClick(e, a[0].date, a[0].day, a[0].month, x.label, a[0].year)} >select
                                                                                {
                                                                                    isshiftrosterlength !== 0

                                                                                        ?
                                                                                        shiftlist.map((sl, i) => {


                                                                                            return isshiftdetail.map((s, j) => {
                                                                                                // console.log("i = " + i + " and j = " + j)
                                                                                                //console.log(a[0].date +'==='+ s.date)


                                                                                                if (x.value === s.empid && s.day === 'WED' && parseInt(a[0].date) === parseInt(s.date) && sl.id === s.shiftid) {

                                                                                                    return <option disabled selected>{sl.shiftname}</option>
                                                                                                }
                                                                                                // if(s.day === 'MON' && parseInt( a[0].date) !== parseInt(s.date) && k === 1)
                                                                                                else if (m === 0) {
                                                                                                    m = 1;

                                                                                                    return <option disabled selected>select</option>
                                                                                                }

                                                                                            })

                                                                                        })

                                                                                        :

                                                                                        <option disabled selected>Select</option>
                                                                                }

                                                                                {
                                                                                    shiftlist.map(s => {
                                                                                        // console.log("in month map = "+x.weekstart)

                                                                                        return (

                                                                                            <option key={s.id} value={x.value} shiftid={s.shiftid}>{s.shiftname}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </tr>

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'WED' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        w = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'WED' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        w = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && w === 0) {
                                                                                        w = 1;

                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check mt-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>


                                                                    <tr>

                                                                        {
                                                                            isshlength !== 0

                                                                                ?

                                                                                isshdetails.map((s, id) => {

                                                                                    if (s.day === 'WED' && JSON.stringify(s.sh) === 'true' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'WED' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    else if (s.day === 'WED' && JSON.stringify(s.sh) === 'false' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'WED' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(s.date) || parseInt(x.value) !== parseInt(s.empid)) && parseInt(id) + 1 === parseInt(isshlength) && mon_h === 0) {


                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'WED' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count



                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {

                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })

                                                                                    }

                                                                                })

                                                                                :

                                                                                isholiday.map((h, i) => {

                                                                                    if (h.day === 'WED' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                        ++count


                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }
                                                                                    else if (count === 0 && !(i < isholidaycount)) {
                                                                                        ++count
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                })
                                                                        }


                                                                    </tr>

                                                                </div>)
                                                        }
                                                    })
                                                }
                                            </td>


                                            {/* --------------------------------------------------------------------------------------------------- */}
                                            <td class="border border-dark" style={{ width: '5.74vw' }}>
                                                {
                                                    dateD_1.map(a => {

                                                        var count = 0;
                                                        var n = 0;
                                                        var x_1 = 0;
                                                        var mon_h = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'THU' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">
                                                                    <tr>
                                                                        {
                                                                            <select class="textbox_1" onChange={(e) => OnShiftClick(e, a[0].date, a[0].day, a[0].month, x.label, a[0].year)}>select
                                                                                {
                                                                                    isshiftrosterlength !== 0

                                                                                        ?
                                                                                        shiftlist.map((sl, i) => {


                                                                                            return isshiftdetail.map((s, j) => {
                                                                                                // console.log("i = " + i + " and j = " + j)
                                                                                                //console.log(a[0].date +'==='+ s.date)


                                                                                                if (x.value === s.empid && s.day === 'THU' && parseInt(a[0].date) === parseInt(s.date) && sl.id === s.shiftid) {

                                                                                                    return <option disabled selected>{sl.shiftname}</option>
                                                                                                }
                                                                                                // if(s.day === 'MON' && parseInt( a[0].date) !== parseInt(s.date) && k === 1)
                                                                                                else if (n === 0) {
                                                                                                    n = 1;

                                                                                                    return <option disabled selected>select</option>
                                                                                                }

                                                                                            })

                                                                                        })

                                                                                        :

                                                                                        <option disabled selected>Select</option>
                                                                                }

                                                                                {
                                                                                    shiftlist.map(s => {
                                                                                        // console.log("in month map = "+x.weekstart)

                                                                                        return (

                                                                                            <option key={s.id} value={x.value} shiftid={s.shiftid}>{s.shiftname}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </tr>

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {



                                                                                    if (oc.day === 'THU' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        x_1 = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'THU' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        x_1 = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    // console.log(parseInt(a[0].date) +"!=="+ parseInt(oc.date))
                                                                                    // console.log(parseInt(id)+1 +"==="+ parseInt(isoncallLength))
                                                                                    // console.log("x_1 = "+x_1)
                                                                                    // console.log("--------------------------------------")

                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && x_1 === 0) {
                                                                                        x_1 = 1;

                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check mt-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>

                                                                    <tr>

                                                                        {
                                                                            isshlength !== 0

                                                                                ?

                                                                                isshdetails.map((s, id) => {

                                                                                    if (s.day === 'THU' && JSON.stringify(s.sh) === 'true' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'THU' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    else if (s.day === 'THU' && JSON.stringify(s.sh) === 'false' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'THU' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(s.date) || parseInt(x.value) !== parseInt(s.empid)) && parseInt(id) + 1 === parseInt(isshlength) && mon_h === 0) {


                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'THU' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count



                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {

                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })

                                                                                    }

                                                                                })

                                                                                :

                                                                                isholiday.map((h, i) => {

                                                                                    if (h.day === 'THU' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                        ++count


                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }
                                                                                    else if (count === 0 && !(i < isholidaycount)) {
                                                                                        ++count
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                })
                                                                        }


                                                                    </tr>

                                                                </div>)
                                                        }
                                                    })

                                                }
                                            </td>


                                            {/* -------------------------------------------------------------------------------------------------- */}
                                            <td class="border border-dark" style={{ width: '5.68vw' }}>
                                                {
                                                    dateD_1.map(a => {

                                                        var count = 0;
                                                        var o = 0
                                                        var y = 0;
                                                        var mon_h = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'FRI' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">
                                                                    <tr>
                                                                        {
                                                                            <select class="textbox_1" onChange={(e) => OnShiftClick(e, a[0].date, a[0].day, a[0].month, x.label, a[0].year)} >select
                                                                                {
                                                                                    isshiftrosterlength !== 0

                                                                                        ?
                                                                                        shiftlist.map((sl, i) => {


                                                                                            return isshiftdetail.map((s, j) => {
                                                                                                // console.log("i = " + i + " and j = " + j)
                                                                                                //console.log(a[0].date +'==='+ s.date)


                                                                                                if (x.value === s.empid && s.day === 'FRI' && parseInt(a[0].date) === parseInt(s.date) && sl.id === s.shiftid) {

                                                                                                    return <option disabled selected>{sl.shiftname}</option>
                                                                                                }
                                                                                                // if(s.day === 'MON' && parseInt( a[0].date) !== parseInt(s.date) && k === 1)
                                                                                                else if (o === 0) {
                                                                                                    o = 1;

                                                                                                    return <option disabled selected>select</option>
                                                                                                }

                                                                                            })

                                                                                        })

                                                                                        :

                                                                                        <option disabled selected>Select</option>
                                                                                }


                                                                                {
                                                                                    shiftlist.map(s => {
                                                                                        // console.log("in month map = "+x.weekstart)

                                                                                        return (

                                                                                            <option key={s.id} value={x.value} shiftid={s.shiftid}>{s.shiftname}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </tr>

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'FRI' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        y = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'FRI' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        y = 1;
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && y === 0) {
                                                                                        y = 1;

                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check mt-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>


                                                                    <tr>

                                                                        {
                                                                            isshlength !== 0

                                                                                ?

                                                                                isshdetails.map((s, id) => {

                                                                                    if (s.day === 'FRI' && JSON.stringify(s.sh) === 'true' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'FRI' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    else if (s.day === 'FRI' && JSON.stringify(s.sh) === 'false' && parseInt(a[0].date) === s.date && parseInt(x.value) === parseInt(s.empid)) {

                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'FRI' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count

                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" defaultChecked={s.sh} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {
                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })


                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(s.date) || parseInt(x.value) !== parseInt(s.empid)) && parseInt(id) + 1 === parseInt(isshlength) && mon_h === 0) {


                                                                                        mon_h = 1
                                                                                        return isholiday.map((h, i) => {

                                                                                            if (h.day === 'FRI' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                                ++count



                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>
                                                                                            }
                                                                                            else if (count === 0 && !(i < isholidaycount)) {

                                                                                                ++count
                                                                                                return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                                    <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                                    </label>
                                                                                                </div>

                                                                                            }
                                                                                        })

                                                                                    }

                                                                                })

                                                                                :

                                                                                isholiday.map((h, i) => {

                                                                                    if (h.day === 'FRI' && h.month === monthname && parseInt(a[0].date) === h.date && a[0].week == weekstart) {
                                                                                        ++count


                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, h.type, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }
                                                                                    else if (count === 0 && !(i < isholidaycount)) {
                                                                                        ++count
                                                                                        return <div class="form-check mt-3 d-flex justify-content-center">
                                                                                            <input disabled={true} class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onSH_CheckM(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                })
                                                                        }


                                                                    </tr>

                                                                </div>)
                                                        }
                                                    })
                                                }
                                            </td>


                                            {/* -------------------------------------------------------------------------------------------------- */}
                                            <td class="border border-dark" style={{ width: '5.20vw' }}>
                                                {
                                                    dateD_1.map(a => {
                                                        var z = 0;

                                                        if (a[0].year === iscurrentyear && a[0].day === 'SAT' && (monthid_1 << a[0].month || monthid == a[0].month) && a[0].week == weekstart) {

                                                            return (

                                                                <div class="d">

                                                                    <tr>
                                                                        {
                                                                            isoncallLength !== 0
                                                                                ?

                                                                                isoncalldetails.map((oc, id) => {

                                                                                    if (oc.day === 'SAT' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'true') {
                                                                                        z = 1;
                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    else if (oc.day === 'SAT' && parseInt(a[0].date) === parseInt(oc.date) && parseInt(x.value) === parseInt(oc.empid) && JSON.stringify(oc.oncall) === 'false') {
                                                                                        z = 1;
                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" defaultChecked={oc.oncall} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>

                                                                                    }
                                                                                    if ((parseInt(a[0].date) !== parseInt(oc.date) || parseInt(x.value) !== parseInt(oc.empid)) && parseInt(id) + 1 === parseInt(isoncallLength) && z === 0) {
                                                                                        z = 1;

                                                                                        return <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                            <input class="form-check-input" type="checkbox" name="name" id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                            </label>
                                                                                        </div>
                                                                                    }

                                                                                })

                                                                                :

                                                                                <div class="form-check ms-3 mt-1 mb-3 d-flex justify-content-center">
                                                                                    <input class="form-check-input" type="checkbox" name="name" value={x.value} id="flexCheckDefault" onChange={(e) => onCallCheck_Mon(e, x.value, a[0].date, a[0].day, a[0].month, a[0].year)} />
                                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                                    </label>
                                                                                </div>
                                                                        }

                                                                    </tr>


                                                                </div>)
                                                        }
                                                    })
                                                }
                                            </td>


                                            {/* -------------------------------------------------------------------------------------------------- */}


                                        </tr>
                                            <tr class="border border-primary"></tr>
                                        </div>

                                    })}
                                {/*---------------------------------------------------------------------------------------------------  */}
                                {/* </tr> */}


                            </tbody>
                        </Scrollbars>
                    </table>

                </div>
            </div>

        </div>



    );
}
// sessionStorage.setItem("Home",JSON.stringify(Home));
export default Home;