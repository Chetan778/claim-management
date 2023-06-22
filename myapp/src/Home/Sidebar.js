import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { BsFillDatabaseFill,BsFillPersonPlusFill } from "react-icons/bs"
import { VscPreview } from "react-icons/vsc"


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";


const Header = () => {

    const navigate = useNavigate();
    const [user, User] = useState(JSON.parse(localStorage.getItem("name")) || [])
    //const [user, User] = useState([])
    const [name, Name] = useState([])
    sessionStorage.setItem("user_session",JSON.stringify(user));
    const userName = JSON.parse(sessionStorage.getItem("user_session"))

    
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    // var buttons =  document.querySelectorAll('.b');
    // var activeClassName = 'active';
    
    // function activeState(items, activeName) {
    //   for(var i = 0; i < items.length; i++) {
    //     if(items[i].classList.contains(activeName)) {
    //       items[i].classList.remove(activeName);
    //     }
    //   }
    // }
    
    // for(var i = 0; i < buttons.length; i++) {
        
    //   buttons[i].addEventListener('click', function(e){
    //     activeState(buttons, activeClassName);
    //     e.target.classList.add(activeClassName);
    //   });
    // }


    
   

    useEffect(() => {
        

        fetch('http://10.155.3.231:3003/',
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                credentials: 'include'
            }
        ).then(resp => resp.json())
            .then(resp => {User(resp);console.log("UserName = "+resp);localStorage.setItem("name",JSON.stringify(resp))})
            .then(error => console.log("found error"))

        
    }, []);

   
    const onHomeClick = () => {
        var today = new Date(),
     
        curMonth = today.getMonth()+1;

        console.log("Month = "+curMonth)
        navigate('/');
    }

    const onRosterClick = () => {

        user.map(x => {

            console.log(x)
            if (x.rollid === 1) {

                navigate('/Roster');
            }
            else if (x.rollid !== 1)
            {
                alert("You are not Authorized");
            }

        })
    }

    const onviewClick = () => {

        user.map(x => {


            if (x.rollid === 2 || x.rollid === 1) {
                sessionStorage.setItem("e_name",JSON.stringify(x.empname));
                sessionStorage.setItem("e_id",JSON.stringify(x.empid));
                navigate('/empView');
            }

        })

    }

    const onReportClick = () => {

        user.map(x => {


            if (x.rollid === 1) {
                navigate('/report');
            }
            else{
                alert("You are not Authorized");
            }

        })

    }

    const onArchivalClick = () => {

        user.map(x => {


            if ((x.rollid === 2 || x.rollid === 1)) {
                navigate('/Archival');
            }

        })

    }

//     const MenuItem = styled(MenuItem)`
//   background: #fcde73;
  
// `;
    

    return (
        <>

        {console.log("username in sidebar = "+user)}
        {console.log("storage = "+localStorage.getItem("name"))}

            <div class="conatainer-flex bg1">
                <div class="row   me-1" style={{ background: '#87CEEB' }}>
                    <div class="col mt-2 mb-1  logo ">


                        <img class="mb-1" style={{ height: 51 }} src="images/travelex_logo.png" alt="Travelexlogo" />
                        {
                            user.map(x => {
                                if (x.rollid === 1 || x.rollid === 2) {
                                    return <h3 class="float-end fw-bold mt-3 me-2" style={{ fontSize: 18,color: '#003366' }}><BsFillPersonPlusFill class="me-2 mb-1" />{x.empname.replace('EMEA\\','')}</h3>
                                }
                            })
                        }

                    </div>
                </div>

                <div class="row shadow-lg">
                    <div class="col-3 col-md-3 col-xl-1 px-sm-1 px-0">
                        <div id="header">
                            {/* collapsed props to change menu size using menucollapse state */}
                            <ProSidebar collapsed={menuCollapse}>
                                <SidebarHeader>
                                    <div className="logotext">
                                        {/* small and big change using menucollapse state */}
                                        <p>{menuCollapse ? "Menu" : "Menu"}</p>
                                    </div>
                                    <div className="closemenu" onClick={menuIconClick}>
                                        {/* changing menu collapse icon on click */}
                                        {menuCollapse ? (
                                            <FiArrowRightCircle />
                                        ) : (
                                            <FiArrowLeftCircle />
                                        )}
                                    </div>
                                </SidebarHeader>
                                <SidebarContent>
                                    <Menu iconShape="square">
                                        <MenuItem id="a" onClick={onHomeClick} active={window.location.pathname === "/"}  icon={<FiHome />}>
                                            Home
                                        </MenuItem>
                                        <MenuItem id="a"  onClick={onRosterClick} active={window.location.pathname === "/Roster"}  icon={<FaList />}>Roster</MenuItem>
                                        <MenuItem id="a" onClick={onviewClick} active={window.location.pathname === "/empView"}  icon={<RiPencilLine />}>View/Edit</MenuItem>
                                        <MenuItem id="a" onClick={onReportClick} active={window.location.pathname === "/report"}  icon={<VscPreview />}>Review</MenuItem>
                                        <MenuItem id="a" onClick={onArchivalClick} active={window.location.pathname === "/Archival"}  icon={<BsFillDatabaseFill />}>Archival</MenuItem>
                                        <MenuItem id="a" icon={<BiCog />}>Settings</MenuItem>
                                    </Menu>
                                </SidebarContent>
                                <SidebarFooter>
                                    <Menu iconShape="square">
                                        <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                                    </Menu>
                                </SidebarFooter>
                            </ProSidebar>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Header;