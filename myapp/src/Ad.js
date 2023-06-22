import React, { Component, useEffect } from 'react';
import './App.css';

// class Auth extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       msg: "Not known",
//       localdata:"local status",
//       status:"not set",
//     };
//   }
//   componentDidMount() 
//   {
//     fetch('http://127.0.0.1:3003',{
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       credentials: 'include'
//     })
//       .then(response => 
//         {
//           this.state.status = response.status;
//           return response.text();
//         }
//       )
//       .then(msg => 
//         this.setState({ msg })
//         );
//   }
//   render() {
//     return (

//       <div className="App"> 
//       <div> LocalData is  - {this.state.localdata}</div>
//       <div> Server data is - {this.state.msg} </div> 
//         api call status is  - { this.state.status } 
//       </div>
//     );
//   }
// }

function Auth() {

 useEffect(() => {
        console.log("helloooo")
        fetch('http://127.0.0.1:3003',
            {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
              credentials: 'include',
              mode:'cors'
            }
        ).then(resp => resp.json())
            .then(resp => console.log(resp))
    }, []);


  return (
    <>

    </>
  )
}

export default Auth;