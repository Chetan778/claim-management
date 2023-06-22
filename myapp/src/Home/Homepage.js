import './Homepage.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { NavLink } from 'react-router-dom';






const Homepage = () => {





    return (

        <>

            <div class="container-flex">
                <div class="row">
                <div class="col-5 text-center mt-5 shadow-lg " style={{marginLeft:380}}>
                    <img  style={{ height: 300 }} src="images/claims-management.jpg" alt="logo" />
                        

                    </div>
                </div>
            </div>



        </>
    );
}

export default Homepage;