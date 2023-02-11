import React,{Component,useState,useEffect,useRef, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { faPlay,faPause,faForward,faBackward,faBolt,faEllipsisVertical,faDownload,faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import {Routes,Route} from "react-router-dom"

import { Footer } from "./footer";
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


export const Music=(props)=>{


    const navigate=useNavigate()
    

    const[posts,setPosts]=useState([])
    const[page_num,setPageNumbers]=useState(1)
    const[postsCount,setPostsCount]=useState(0)

    const baseUrl=`http://127.0.0.1:8000/recent`
    


    async function getAllPosts (baseUrl){
        await fetch(baseUrl)
        .then((res)=>res.json()).then((data)=>{
            setPosts(data.musics)
            setPageNumbers(data.num_pages)
            setPostsCount(data.post_count)
            console.log(data)
        })
    }



    useEffect(()=>{
        
        
        
            getAllPosts(baseUrl)
        
        // getAllPosts(baseUrl)
           
    },[])


    window.onload=()=>{
        if (localStorage.getItem('pageUrl')!=''){
            getAllPosts(JSON.parse(localStorage.getItem('pageUrl')))
        }else{
            getAllPosts()
        }
    }

    // const onChange = (pageNumber) => {
    //     console.log('Page: ', pageNumber);
    //   };
    function changeUrl(baseUrl){
        getAllPosts(baseUrl)

        localStorage.setItem('pageUrl',JSON.stringify(baseUrl))
    }


    // let items = [];


    //     function PaginateControls(pages){
    //     const window_btn=3
    //     const curr_page=1
    //     let maxLeft = (curr_page - Math.floor(window_btn / 2))
    //     let maxRight = (curr_page + Math.floor(window_btn/ 2))
        

    //     if (maxLeft < 1) {
    //         maxLeft = 1
    //         maxRight =window_btn
    //     }

    //     if (maxRight > pages) {
    //         maxLeft = pages - (window_btn- 1)
            
    //         if (maxLeft < 1){
    //             maxLeft = 1
    //         }
    //         maxRight = pages
    //     }

    
    //     // let active = page_num;
       
    //     for (let number = maxLeft; number <= maxRight; number++) {
    //             items.push(
    //                 <Pagination.Item key={number} activeLabel=''>
    //                 <Link onClick={()=>{changeUrl(baseUrl+`?page=${number-1}`)}} to={`?page=${number}`}>{number}</Link>
    //                 </Pagination.Item>,
    //             );
    //     }}



    // PaginateControls(page_num)


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


    return(
        <main className="landing">
   

        <section className="section_1">
                          

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
                                                        <a href="#"> <FontAwesomeIcon  icon={faBookmark} /></a>
                                                            
                                                 </div> 
                                                                                        
                                                </div>
                                                
                                           
                                                
                                            
                                            </div>
                                                
                                                
                                                )
                                                
                                            )}
                                    
                            </div>
                                    
                                
                                {/* <audio src={music.audio} id="audio" onTimeUpdate={e=>UpdateProgress(e)} /> */}


                                <div className="paginate_nav">
                    {/* <Pagination.First  onClick={FirstPage}/>
                        <Pagination  >{items}</Pagination>
                    <Pagination.Last onClick={LastPage}/> */}


                    <Stack spacing={2}>
                        <Pagination
                                count={page_num} 
                                showFirstButton 
                                showLastButton
                                hidePrevButton 
                                hideNextButton
                            
                                // activePage={1}
                                // onSelect={(e)=>{changeUrl(baseUrl+`?page=${e-1}`);navigate(`?page=${e}`)}}
                                onChange={(e,value)=>{changeUrl(baseUrl+`?page=${value}`);navigate(`?page=${value}`);console.log(value)}}
                            />
                            </Stack>
                    </div>       
            </section>

                    

                    <br /><br />
                   
    
        
            <Footer/>

        </main>
    )
}