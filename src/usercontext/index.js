import React,{Component,useState,useEffect,useRef, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { faPlay,faPause,faForward,faBackward,faBolt,faEllipsisVertical,faDownload,faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import {Routes,Route} from "react-router-dom"

import { Footer } from "../context/footer";
import ReactPaginate from 'react-paginate';
// import { Pagination } from "react-bootstrap";
// import { Pagination,PaginationProps } from 'antd';
// import { Pagination } from 'antd';
// import 'rsuite/dist/rsuite.min.css';
// import { Pagination } from 'rsuite'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../css/allsongs.css'
import { useNavigate, useParams,useLocation } from "react-router-dom";

import { number } from "yup";
import Spinner from 'react-bootstrap/Spinner'

import CircularProgress from '@mui/material/CircularProgress';

export const UserIndex=(props)=>{


    const navigate=useNavigate()
    const[offset,setOffSet]=useState(0)
    const [limit,setLimit]=useState(3)
    const[isLoading,setLoading]=useState(true)
    const[musicCount,setMusicCount]=useState(0)
    // console.log(musicCount)

    const[posts,setPosts]=useState([])
    const[page_num,setPageNumbers]=useState(1)
    const[postsCount,setPostsCount]=useState(0)
    const baseUrl=`http://127.0.0.1:8000?limit=${limit}&offset=${offset}`
    
    const token=localStorage.getItem('token')

    const scrollSection=useRef()


    async function getAllPosts (){

        setLoading(true)
        await fetch(baseUrl,{
            method:'GET',
            headers:{
                'Authorization':`Token ${token}`

            }

        })
        .then((res)=>res.json()).then((data)=>{
            setPosts([...posts,...data.music])
            setOffSet(offset+limit)
            setLoading(false)
            console.log(offset)
            
            console.log(data)
            setMusicCount(Math.floor(data.music_len/2))
            // setPlaying(false)
        })
    }

    // const showMorePosts=()=>{
       
    //     getAllPosts()
    // }

    window.onscroll=()=>{
        if (document.documentElement.scrollHeight - 
            document.documentElement.scrollTop === document.documentElement.clientHeight){
            getAllPosts()
        }
    }



    useEffect(()=>{
        
        
       
            getAllPosts()
        

        // getAllPosts(baseUrl)
           
    },[])




    // const onChange = (pageNumber) => {
    //     console.log('Page: ', pageNumber);
    //   };
    function changeUrl(baseUrl){
        getAllPosts(baseUrl)

        localStorage.setItem('pageUrl',JSON.stringify(baseUrl))
    }


 


    function  FirstPage(){
        const number=1
        changeUrl(baseUrl+`?page=${number-1}`)
        navigate(`?page=${number}`)
        
    }

    function  LastPage(){
        const number=page_num
        changeUrl(baseUrl+`?page=${number-1}`)
        navigate(`?page=${number}`)
        
    }

    
    async function setFavourite(e){
        console.log(e.target)
        e.preventDefault()
        const res=await fetch(`http://127.0.0.1:8000/add/favourite?music_id=${e.target.id}`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`
            }
        })

        const data=await res.json()

        console.log(data)
        if (data.favourite ===true){
            e.target.style.color='#2B434E'
        }else{
            e.target.style.color='white'
        }

    }

    return(
        <main className="landing">
   
    
    <section className="section_1">
                {isLoading?
                            <Stack sx={{ color: 'grey.500',display:'flex',flexDirection:'row', justifyContent:'center'}} spacing={2} direction="row">
                                        
                            <CircularProgress color="inherit" />
                        </Stack> 
                
                        :
                          

                    <div className="section_1_holder">

                    
                            {posts.map((post,i)=>(

                                <div className="songs_holder" key={i}  >


                                        <div className={"music_container" } >
                                        
                                                        
                                            <img  className={"music_image "}

                                            // id={post.id}
                                            // onClick={(e)=>{setAudioSrc(e)}} 
                                            src={'http://127.0.0.1:8000'+post.image} key={i}></img>

                                        


                                            {/* <button >
                                                <FontAwesomeIcon icon={post.id == music_id?icon:faPlay} 
                                                // onClick={(e)=> ''} 
                                                id="playBtn"  />
                                            </button> */}



                                        <div className={"music_overlay "+ (post.id === JSON.parse(localStorage.getItem('music_id')) && JSON.parse(localStorage.getItem('playing'))?'playing':'')} 
                                            id={post.id}
                                        
                                            onClick={(e)=>{props.setAudioSrc(e)
                                            props.setNext(false)
                                            props.setCount(i)
                                            }}
                                            ></div>


                                            </div>
                                    
                                
                                
                                        <div className="caption_holder">
                                        <Link to={`/${post.slug}`}  >
                                            <div className="capt_hold">
                                                <p className="caption">{post.title}</p>
                                            </div>
                                            </Link>
                                            

                                                <div class="caption_menu">
                                                    <a href={('http://127.0.0.1:8000'+post.audio)} download ><FontAwesomeIcon  icon={faDownload} /></a>
                                                <i  id={post.id} onClick={setFavourite} className="favourite fa-solid fa-bookmark "  style={post.user_favourite?{color:'#2B434E'}:{color:'white'}}></i>
                                               
                                            </div> 
                                                                                
                                        </div>
                                        
                                    
                                        
                                    
                                    </div>
                                        
                                        
                                        )
                                        
                                    )}
                            
                    </div>
                        
                               
        }
                             
        </section>
    
     
            
            
            <br /><br /><br />

            
                                   
           
                    {/* <button onClick={showMorePosts}>Load more</button> */}
                   
    
        
            <Footer/>

        </main>
    )
}