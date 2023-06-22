//const now = new Date();

var arr= [
  {
    id: 0,
    title: "Morning Shift",
    allDay: true,
    start: new Date(2023,1, 1),
    end: new Date(2023, 1, 1),
    colorEvento:'red'
  },
  {
    id: 1,
    title: "Mid Shift",
    start: new Date(2023, 1, 2),
    end: new Date(2023, 1, 2)
  },

  {
    id: 2,
    title: "Late Shift",
    start: new Date(2023,1, 3),
    end: new Date(2023,1,3)
  },

  {
    id: 3,
    title: "call Out",
    start: new Date(2023, 1, 1),
    end: new Date(2023, 1, 1)
  },

  {
    id: 4,
    title: "On call",
    start: new Date(2023, 1, 1),
    end: new Date(2023, 1, 1)
  },
  {
    id: 5,
    title: "OverTime",
    start: new Date(2023, 14, 2),
    //end: new Date(2023, 1, 6),
    desc: "overtime"
  },
  {
    id: 6,
    title: "Statutory Holiday",
    start: new Date(2023, 1, 22),
    end: new Date(2023, 1, 22),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  }
];
export default arr;