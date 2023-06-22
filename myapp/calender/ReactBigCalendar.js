import React, { useState } from "react";
import  {momentLocalizer,Calendar  } from "react-big-calendar";
//import Calendar from "Calendar";
import moment from "moment";
import events from "./events";
//import axios from "axios";
//import componentDidMount from "react"
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, /*setEventsData*/] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
  };
  
  return (
    <div className="App">
      <Calendar
        views={["month"]}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "90vh" }}
        //style={{ width: "80vh" }}
        //onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        
      />
    </div>
  );
}
 /*Calendar()
   {
    axios
      .get("http://localhost:3000/"+ "api/calendar/", {
        })
      

      .then(json => {
        json.data.data.data.map(data =>
          this.setState(
            events({
              title: data.title,
              start: data.startDate,
              end: data.endDate
            })
          )
        );

      })
      .catch(erros => {
        console.log(erros);
      });
    }

  componentDidMount()
   {
    this.loadCalendar();
  };
*/
