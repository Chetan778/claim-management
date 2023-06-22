import React, { useState, useEffect } from "react";
import './Report.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from "react-router-dom";
function Report() {

  const navigate = useNavigate();
  var deptid;
  var value = 0;
  var shiftcount = 0;
  var finalcount = 0;
  var a = 0;

  const [Deptlist, Departmentlist] = useState([]);
  const [departmentid, setDepartmentID] = useState(localStorage.getItem("id") || undefined);
  const [empName, setEmpName] = useState([]);
  const [monthL, monthList] = useState([]);

  const [empid_, setempid] = useState([]);

  const [remark, setRemark] = useState([]);

  const [dateD, date_day] = useState([]);
  const [dateD_1, dateDay_1] = useState([]);

  const [monthid, monthID] = useState(0);

  const [monthname, monthName] = useState('');

  const [weekstart, weekStart] = useState([]);
  const [weekend, weekEnd] = useState([]);

  const [backmin, backMin] = useState([]);
  const [nextmax, nextMax] = useState([]);

  const [shifttype, setShifttype] = useState([])

  const [shifttypecount, setShifttypecount] = useState([0])
  const [deptshift, setDeptShift] = useState([])

  const [isempshiftdetail, setEmpShiftDetails] = useState([])
  const [shiftrosterlength, setShiftRosterLength] = useState([])

  const [isoncalldetails, setOnCallDetails] = useState([]);
  const [isoncallLength, setOnCallLength] = useState([])

  const [isotdetails, setOTDetails] = useState([]);
  const [isotlength, setOTLength] = useState([])

  const [isshdetails, setSHDetails] = useState([])
  const [isshlength, setSHLength] = useState([])

  const [isTeamLeadApproved, setTeamLeadApproval] = useState('false')
  const [isManagerApproved, setManagerApproval] = useState('false')
  const [isHODApproved, setHODApproval] = useState('false')
  const [isHRApproved, setHRApproval] = useState('false')

  const [iscurrentmonth, setCurrentMonth] = useState([]);
  const [iscurrentyear, setCurrentYear] = useState([]);

  // const [isdeptID, setdeptID] = useState(localStorage.getItem("id") || undefined)


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



  const deptshifttype = (e) => {

    fetch(`http://10.155.3.231:3001/deptshift/deptid/${e}`,
      {
        method: 'Get',
        headers: {
          'content-Type': 'application/json',
        }
      }
    ).then(resp => resp.json())
      .then(resp => setDeptShift(resp))

  }

  // useEffect(() => {

  //   var i = 0;

  //   if (departmentid === undefined) {
  //     console.log("in undefined dept = " + departmentid)

  //   }
  //   else if (departmentid !== undefined) {
  //     console.log("in defined dept = " + departmentid)
  //     onEmployeeList(departmentid, i)

  //   }


  // }, []);


  const onEmployeeList = (e) => {

    var count = 1;
    // console.log("d = " + d + " e = " + e)

    
      deptid = e.target.value;
      setDepartmentID(deptid);
      localStorage.setItem("id", JSON.stringify(deptid))
    
   

    shifttype.map(s => {

      setShifttypecount(count++);
    })

    deptshifttype(deptid)


    fetch(`http://10.155.3.231:3001/emp/deptid/${deptid}`,
      {
        method: 'Get',
        headers: {
          'content-Type': 'application/json',
        }
      }
    ).then(resp => { return resp.json() })
      .then(resp => setEmpName(resp))

    monthfn();
  }

  // useEffect(() => {
  //   fetch("http://10.155.3.231:3001/month", {
  //     method: "Get",
  //     headers: {
  //       "content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((resp) => monthList(resp));
  // }, []);

  const monthfn = () => {

    fetch("http://10.155.3.231:3001/month", {
      method: "Get",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => monthList(resp));

  }



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


  const OnclickMonth = (e) => {

    // setID(e.nativeEvent.target.selectedIndex)
    // localStorage.setItem("id", e.nativeEvent.target.selectedIndex);

    // console.log("e.nativeEvent.target.selectedIndex = " + e.nativeEvent.target.selectedIndex)


    // var id = e.nativeEvent.target.selectedIndex;


    const id = e.target[e.target.selectedIndex].getAttribute('month_id')
    // console.log("month id = "+id) 

    // var name = e.nativeEvent.target[id].text;
    const month_name = e.target[e.target.selectedIndex].getAttribute('month_name_')
    console.log("month name = " + month_name)
    const weekend = e.target[e.target.selectedIndex].getAttribute('value_2')
    const year = e.target[e.target.selectedIndex].getAttribute('year')


    sessionStorage.setItem("month_name", JSON.stringify(month_name));
    sessionStorage.setItem("year", JSON.stringify(year));
    sessionStorage.setItem("month_number", JSON.stringify(id));
    sessionStorage.setItem("week_start", JSON.stringify(e.target.value));
    sessionStorage.setItem("week_end", JSON.stringify(weekend));


    monthName(month_name)
    monthID(id);
    dateDay_1(dateD);
    weekStart(e.target.value);
    weekEnd(weekend);
    backMin(e.target.value);
    nextMax()

    var val = [{
      deptid: departmentid,
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

    oncall(departmentid, month_name, year);
    overtime(departmentid, month_name, year);
    statutory_holiday(departmentid, month_name, year);



  }

  // ---------------------------------------------OnCall----------------------------------------------------

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

  // -----------------------------------------------OverTime--------------------------------------------------

  const overtime = (deptid, month, year) => {

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
    fetch(`http://10.155.3.231:3001/count/overtime/`, requestOptions)
      .then(resp => resp.json())
      .then((resp) => { setOTDetails(resp); setOTLength(resp.length) })

  }

  //-------------------------------------------Satutory Holiday-------------------------------------------------------

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

  const ondetailclick = (e) => {

    var text = document.getElementById(e);
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }

  }

  // -------------------------------------------On Click Emp Name---------------------------------------------------------

  const onClickEmpName = (e) => {

    console.log("onclickempname = " + e)
    sessionStorage.setItem("emp_id", JSON.stringify(e));
    navigate('/empMonthlyview')

  }

  // ---------------------------------------------Remark Submit-------------------------------------------------------
  const RemarkSubmit = (e, e_id) => {

    var details = e.target.value;

    setRemark(details);
    setempid(e_id);

    // console.log(details);
    // console.log("e_id = " + e_id);


  }

  const onclicksubmit = (emp_id, emp_name) => {

    if (emp_id === empid_) {
      console.log(remark)
      console.log(empid_)
      alert("Mail has been sent to " + emp_name)

    }

  }

  //----------------------------------------------Approvals--------------------------------------------------------

  const onTeamLeadApprove = (e) => {
    const checked = e.target.checked;

    setTeamLeadApproval(checked);

  }

  const onManagerApprove = (e) => {
    const checked = e.target.checked;

    setManagerApproval(checked);

  }

  const onHODApprove = (e) => {
    const checked = e.target.checked;

    setHODApproval(checked);

  }

  const onHRApprove = (e) => {
    const checked = e.target.checked;

    setHRApproval(checked);

  }

  // --------------------------------------------On Approval Submit-----------------------------------------------------

  const onApprovalSubmit = () => {

    console.log(isTeamLeadApproved)

    if (JSON.stringify(isTeamLeadApproved) === 'true') {
      console.log("Mail been sent to the Manager")
      alert("Mail has been sent successfully to Manager")
    }

    if (JSON.stringify(isManagerApproved) === 'true') {
      console.log("Mail has been to the HOD")
      alert("Mail has been sent successfully to HOD")
    }

    if (JSON.stringify(isHODApproved) === 'true') {
      console.log("mail will go to the HR")
      alert("Mail has been sent successfully to HR")
    }

    if (JSON.stringify(isHRApproved) === 'true') {
      console.log("mail will go to the Finance")
      alert("Mail has been sent successfully to Finance")
    }
  }


  // ----------------------------------------RETURN-----------------------------------------------------------

  return (

    <div class="container-flex bg">

      {/* {<h1>{console.log("dept = "+departmentid)}</h1>} */}

      {/* <h1>{console.log("shiftdetails = " + JSON.stringify(shifttypecount))}</h1> */}

      <div class="row">
        <div class="col-5 mt-3 empviewpage shadow-lg bg-white rounded maintable">

          <label class=" mt-3 pe-2 department" ><h3 style={{ fontSize: 13, color: '#003366' }} class='fw-bold'>DEPARTMENT  </h3></label>
          <select className="tabledata p-1 ms-1 mt-3" onChange={(e)=>onEmployeeList(e,1)} >select
            <option disabled selected>--Select--</option>
            {
              Deptlist.map(x => {
                return (
                  <option key={x.id} value={x.id} >{x.deptname}</option>
                )
              })
            }
          </select>

          <label class="monthreport me-3"><h3 style={{ fontSize: 15, color: '#003366' }} class='fw-bold'>MONTH </h3></label>
          <select class=" tabledata  p-1" onChange={OnclickMonth}  >select
            <option disabled selected>--Select--</option>
            {
              monthL.map(x => {
                if (iscurrentmonth <= x.id) {
                  return (
                    <option key={x.id} month_id={x.id} month_name_={x.month} value={x.weekstart} value_2={x.weekend} year={x.year}>{x.month}</option>
                  )
                }
              })
            }
          </select>

        </div>
      </div>

      <div class="row">

        <div class="col reportdetail shadow-lg">
          <h4 style={{ color: '#003366' }}> Reporting Review</h4>

          <table>
            <thead>
              <tr>

                <th class="border border-info text-center" style={{ width: '13.9vw', background: '#d0f1f9', color: '#003366' }}><small>Name</small></th>
                <th class="border border-info text-center" style={{ width: '7vw', background: '#d0f1f9', color: '#003366' }}><small>EARLY MORNING</small></th>
                <th class="border border-info text-center" style={{ width: '7vw', background: '#d0f1f9', color: '#003366' }}><small>MORNING</small></th>
                <th class="border border-info text-center" style={{ width: '6vw', background: '#d0f1f9', color: '#003366' }}><small>GENERAL</small></th>
                <th class="border border-info text-center" style={{ width: '5vw', background: '#d0f1f9', color: '#003366' }}><small>MID</small></th>
                <th class="border border-info text-center" style={{ width: '5vw', background: '#d0f1f9', color: '#003366' }}><small>LATE</small></th>
                <th class="border border-info text-center" style={{ width: '5vw', background: '#d0f1f9', color: '#003366' }}><small>NIGHT</small></th>
                <th class="border border-info text-center" style={{ width: '5.5vw', background: '#d0f1f9', color: '#003366' }}><small>OC Hrs</small></th>
                <th class="border border-info text-center" style={{ width: '5.5vw', background: '#d0f1f9', color: '#003366' }}><small>CO Hrs</small></th>
                <th class="border border-info text-center" style={{ width: '5.5vw', background: '#d0f1f9', color: '#003366' }}><small>OT Hrs</small></th>
                <th class="border border-info text-center" style={{ width: '4.1vw', background: '#d0f1f9', color: '#003366' }} ><small>SH</small></th>

                <th class="border border-info text-center" style={{ background: '#d0f1f9', color: '#003366' }} ><small>REMARKS</small></th>


              </tr>


            </thead>
            <Scrollbars style={{ width: 1090, height: 265 }}>
              <tbody class="shadow-lg" >

                {
                  empName.map((x, i) => {
                    var count = 0;
                    var count1 = 0;
                    a = 0;

                    var b = 0;
                    var d = 0;
                    var e = 0;
                    var f = 0;
                    var g = 0;
                    shiftcount = 0;
                    var oncallcount = 0;
                    var calloutcount = 0;
                    var OTcount = 0;
                    var SHcount = 0;
                    return (
                      <tr>

                        <td class="border" style={{ width: '13.9vw', height: 100 }}>
                          <h5 class="fw-bold" style={{ height: 30, fontSize: 13, color: '#003366' }} onClick={() => onClickEmpName(x.empid)}>{x.empname}</h5>
                        </td>


                        <td class="border" style={{ width: '6.95vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 1 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }}>{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;

                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }}>0</td>

                          }
                        </td>

                        <td class="border" style={{ width: '7.05vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 2 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }} >{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;
                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }} >0</td>

                          }</td>


                        <td class="border" style={{ width: '6vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 3 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }}>{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;
                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }}>0</td>

                          }
                        </td>


                        <td class="border" style={{ width: '5vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 4 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }}>{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;
                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }}>0</td>

                          }
                        </td>

                        <td class="border" style={{ width: '5vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 5 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }}>{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;
                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }}>0</td>

                          }
                        </td>


                        <td class="border" style={{ width: '5vw' }}>
                          {

                            shiftrosterlength !== 0 ?
                              isempshiftdetail.map((s, j) => {
                                ++a;
                                if (parseInt(s.shiftid) === 6 && parseInt(x.empid) === parseInt(s.empid)) {

                                  if (shiftcount === 0) {
                                    ++count;
                                    ++shiftcount;
                                  }
                                  else if (shiftcount !== 0) {
                                    ++shiftcount;
                                    value = 1;
                                  }
                                  if (a === shiftrosterlength) {
                                    a = 0;
                                    finalcount = shiftcount
                                    shiftcount = 0
                                    return <td style={{ color: '#003366' }}>{finalcount}</td>
                                  }
                                }
                                else if (a === shiftrosterlength && count !== 0) {
                                  a = 0;
                                  finalcount = shiftcount
                                  shiftcount = 0
                                  return <td style={{ color: '#003366' }}>{finalcount}</td>
                                }
                                else if (a === shiftrosterlength && count === 0) {
                                  a = 0;
                                  return <td style={{ color: '#003366' }}>0</td>
                                }
                              }) : <td style={{ color: '#003366' }}>0</td>

                          }
                        </td>

                        {/* --------------------------------------OnCall-------------------------------------------- */}

                        <td class="border" style={{ width: '5.5vw' }}>
                          {

                            isoncallLength !== 0 ?
                              isoncalldetails.map(c => {
                                ++b;

                                if (parseInt(x.empid) === parseInt(c.empid) && JSON.stringify(c.oncall) === 'true') {

                                  oncallcount = oncallcount + c.oncall_hr

                                  if (b === isoncallLength) {
                                    return <td style={{ color: '#003366' }}>{oncallcount}</td>
                                  }
                                }
                                else if (b === isoncallLength) {
                                  return <td style={{ color: '#003366' }}>{oncallcount}</td>
                                }
                                else if (oncallcount === 0 && b === isoncallLength) {
                                  return <td style={{ color: '#003366' }}>{oncallcount}</td>
                                }

                              }) : <td style={{ color: '#003366' }}>0</td>
                          }
                        </td>

                        {/* ----------------------------------------CallOut-------------------------------------------------------------------------------- */}

                        {

                          <td class="border" style={{ width: '5.5vw' }}>
                            {

                              isoncallLength !== 0 ?
                                isoncalldetails.map(c => {
                                  ++d;

                                  if (parseInt(x.empid) === parseInt(c.empid) && JSON.stringify(c.oncall) === 'true') {

                                    calloutcount = calloutcount + c.callout_hr


                                    if (d === isoncallLength) {
                                      return <td style={{ color: '#003366' }}>{calloutcount}</td>
                                    }
                                  }
                                  else if (d === isoncallLength) {
                                    return <td style={{ color: '#003366' }}>{calloutcount}</td>
                                  }
                                  else if (calloutcount === 0 && d === isoncallLength) {
                                    return <td style={{ color: '#003366' }}>{calloutcount}</td>
                                  }

                                }) : <td style={{ color: '#003366' }}>0</td>
                            }
                          </td>
                        }
                        {/* --------------------------------------OverTime---------------------------------------------------------------------------------- */}

                        {

                          <td class="border" style={{ width: '5.5vw' }}>
                            {

                              isotlength !== 0 ?
                                isotdetails.map(o => {
                                  ++e;

                                  if (parseInt(x.empid) === parseInt(o.empid)) {

                                    OTcount = OTcount + o.ot_hr

                                    if (e === isotlength) {
                                      return <td style={{ color: '#003366' }}>{OTcount}</td>
                                    }
                                  }
                                  else if (e === isotlength) {
                                    return <td style={{ color: '#003366' }}>{OTcount}</td>
                                  }
                                  else if (OTcount === 0 && e === isotlength) {
                                    return <td style={{ color: '#003366' }}>{OTcount}</td>
                                  }

                                }) : <td style={{ color: '#003366' }}>0</td>
                            }
                          </td>
                        }

                        {/* ----------------------------------------Statutory holiday------------------------------------------- */}

                        {
                          <td class="border " style={{ width: '4.05vw' }}>
                            {
                              isshlength !== 0 ?
                                isshdetails.map(s => {
                                  ++f;


                                  if (parseInt(x.empid) === parseInt(s.empid) && JSON.stringify(s.sh) === 'true' && s.type === 's') {
                                    console.log("s" + JSON.stringify(s))
                                    if (SHcount === 0) {
                                      ++SHcount;
                                      ++count1;
                                    }
                                    else if (SHcount !== 0) {
                                      ++SHcount;
                                    }

                                    if (f === isshlength) {
                                      return <td style={{ color: '#003366' }}>{SHcount}</td>
                                    }
                                  }
                                  else if (f === isshlength && count1 !== 0) {
                                    return <td style={{ color: '#003366' }}>{SHcount}</td>
                                  }
                                  else if (f === isshlength && count1 === 0) {
                                    return <td style={{ color: '#003366' }}>0</td>
                                  }

                                }) : <td style={{ color: '#003366' }}>0</td>
                            }
                          </td>
                        }
                        {/* ------------------------------------------Enter Remark--------------------------------------------------- */}

                        {
                          <td class="border" style={{ width: '15.5vw' }}>

                            {/* <button type="button" class="btn btn-primary btn-sm" onClick={() => ondetailclick(x.empid)}>Details</button> */}

                            <textarea id={x.empid} onChange={(e) => RemarkSubmit(e, x.empid)} name="co" cols="20" rows="10" class="" style={{ width: 170, height: 40 }} placeholder="Enter Remark"></textarea>
                            <button class="btn btn-primary btn-sm mt-1" style={{ marginLeft: 115, background: '#003366' }} type='button' onClick={() => onclicksubmit(x.empid, x.empname)}>submit</button>


                          </td>
                        }

                      </tr>
                    );
                  })}
              </tbody>
            </Scrollbars>
          </table>
          <div class="mt-4 " align="center">
            <form>
              <label htmlFor=""> Approved by : &nbsp;</label>
              <input type="checkbox" name="TL" value="Team Lead" onClick={(e) => onTeamLeadApprove(e)}></input>
              <label htmlFor=""> Team Lead &nbsp;</label>
              &nbsp;
              <input type="checkbox" name="MG" value="Manager" onClick={(e) => onManagerApprove(e)}></input>
              <label htmlFor="">Manager &nbsp; </label>
              &nbsp;
              <input type="checkbox" name="HOD" value="Head Of Department" onClick={(e) => onHODApprove(e)}></input>
              <label htmlFor=""> Head Of Department &nbsp; </label>
              &nbsp;
              <input type="checkbox" name="HR" value="HR" onClick={(e) => onHRApprove(e)}></input>
              <label htmlFor=""> HR &nbsp; </label>
            </form>
          </div>

          <button class="btn btn-primary btn-sm mt-1" style={{ width: 170, marginLeft: 440, background: '#003366' }} type='button' onClick={() => onApprovalSubmit()}>submit</button>
        </div>



        {/* <ReactBootStrap.Table striped hover size="sm">
            
          </ReactBootStrap.Table> */}
      </div>
    </div>


  );
}
export default Report;