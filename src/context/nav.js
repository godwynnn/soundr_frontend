import React,{component, useContext,useState,useEffect} from "react";
import { Menu,searchContext } from "./home";
import { Button } from "@mui/material";
import logo from '../css/logo.png'
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth";
// import { searchContext } from "./home";


export const Navbar=()=>{
    const{searchInput,setSearchInput,setSearchedPost,setSearched}=useContext(searchContext)

    const{isloggedIn,user,setIsLoggedIn}=useContext(AuthContext)
    const navigate=useNavigate()
    const{ query }=useParams()
    const location=useLocation()
    // const[searchUrl,setSearchUrl]=useState(`http://127.0.0.1:8000/search?q=${query}`)

                function toggle(){
                    document.getElementById('toggle').classList.toggle('active')
                }
                
                const setInput=(e)=>{
                    
                    setSearchInput(e.target.value)
                    localStorage.setItem("searchvalue", e.target.value);
                    
                    
                }

                const searchPost=(e)=>{
                    try{
                        e.preventDefault()
                    }catch(err){
                        console.log(err)
                    }
                    
                    if (searchInput.length > 0){
                        fetch(`http://127.0.0.1:8000/search?q=${searchInput}`)
                        .then(res=>res.json()).then(data=>{
                            setSearchedPost(data.music)
                            setSearched(true)
                            navigate(`/search=${searchInput}`)
                            
                            
                            // console.log(data)
                        })

                    }
  
                    
                }

                // window.onload=function(){
                    
                    
                // }
                
                useEffect(()=>{
                    
                    console.log(searchInput)

                    if (localStorage.getItem('searchvalue') != ''){
                        // navigate("/")
                        fetch(`http://127.0.0.1:8000/search?q=${localStorage.getItem('searchvalue')}`)
                        .then(res=>res.json()).then(data=>{
                            setSearchedPost(data.music)
                            // setSearched(true)
                            // navigate(`/search/${localStorage.getItem('searchvalue')}`)
                            
                            // console.log(data)
                        })
                   
                }
                    
                },[])

                function logoutUser(){
                    if(localStorage.getItem('logged_in')){
                        localStorage.setItem('logged_in',false)
                        localStorage.setItem('token','')
                        navigate('/')
                    }
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

                function redirectLogin(){
                    navigate(`/auth?login`,
                    {
                        state: { from: location }, // <-- pass current location
                        replace: true
                      }
                    
                    )
                }

                console.log('user is logged is '+isloggedIn)

            return(

                <div className="nav" id="navbar">

                    <Link to='/'>
                        <div className="logo">
                            <img src={logo}></img>
                        </div>
                    </Link>

                        
                    
                        <label id="toggle" for='check' onClick={toggle}></label>

                        {/* {isloggedin? '' :
                        
                        } */}

                            <div className="search_holder">
                                <form onSubmit={searchPost}>
                                    <input placeholder="Search" onChange={(e)=>setInput(e)} value={searchInput} />
                                    {/* <button type="submit">search</button> */}
                                </form>
                                {JSON.parse(localStorage.getItem('logged_in'))?
                                <Button   variant="contained" className="auth_btn" onClick={logoutUser}>Logout</Button >
                                :
                                <Button   variant="contained" className="auth_btn" onClick={redirectLogin}>Login</Button >
                                }
                                    
                                
                            </div>

                                <input type='checkbox' id="check"  />

                        <Menu/>
                    
                </div>

            
            )
    }