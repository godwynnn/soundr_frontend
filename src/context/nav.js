import React,{component} from "react";
import { Menu } from "./home";
import { Button } from "@mui/material";
import logo from '../css/logo.png'
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";


export const Navbar=()=>{

    function toggle(){
        document.getElementById('toggle').classList.toggle('active')
    }

    let navbar=document.getElementById('navbar')
    window.addEventListener('scroll',()=>{
       let scrolled=window.scrollY;
        if(scrolled>=30 ){
            navbar.style.backgroundColor='black';
            navbar.style.transition= '1s ease'
            // console.log('scrolled')
        }

        else{
            navbar.style.backgroundColor='transparent';
        }
    })

    

    return(

        <div className="nav" id="navbar">

                <div className="logo">
                    <img src={logo}></img>
                </div>
            
                <label id="toggle" for='check' onClick={toggle}></label>

                    <div className="search_holder">
                        <input placeholder="Search" />
                            <Button   variant="contained" className="auth_btn">Login</Button >
                        
                    </div>

                        <input type='checkbox' id="check"  />

                <Menu/>
            
        </div>

    
    )
}