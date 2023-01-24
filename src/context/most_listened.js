import React,{Component,useState,useEffect,useRef, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { faPlay,faPause,faForward,faBackward,faBolt,faEllipsisVertical,faDownload,faBookmark } from '@fortawesome/free-solid-svg-icons';


import { ScrollTrigger,gsap } from "gsap/all";


import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import {Routes,Route} from "react-router-dom"

import { Footer } from "./footer";


export const MostListened=(props)=>{


    const [posts,setPosts]=useState([])
    async function  getAllPosts(){
            
        const response=await fetch(`http://127.0.0.1:8000/`)
        const data= await response.json()
        console.log(data.most_listened)

        setPosts(data.most_listened)
  
   };

   useEffect(()=>{
    getAllPosts()
   },[])

   
    return(
        <section className="section_1">
                          

        <div className="section_1_holder">

        
                {posts.map((post,i)=>(

                    <div className="music_holder" key={i}  >


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



                                <div className={"music_overlay "+ (post.id == props.music_id && props.playing?'playing':'')} 
                                id={post.id}
                            
                                onClick={(e)=>{props.setAudioSrc(e)
                                props.setNext(false)
                                props.setCount(i)
                                }}
                                ></div>


                                </div>
                        
                    <Link to={`/${post.slug}`}  >
                    
                            <div className="caption_holder">
                                <div className="capt_hold">
                                    <p className="caption">{post.title}</p>
                                </div>

                                <div class="dropdown caption_menu">
                                    <button class="dropbtn caption_menu_btn"><FontAwesomeIcon  icon={faEllipsisVertical} /></button>
                                        <div class="dropdown-content">
                                            <a href={('http://127.0.0.1:8000'+post.audio)} download ><FontAwesomeIcon  icon={faDownload} /> Download</a>
                                            <a href="#"> <FontAwesomeIcon  icon={faBookmark} /> Favourite</a>
                                        
                                        </div>
                                </div>
                                                                    
                            </div>
                            
                        </Link>
                            
                        
                        </div>
                            
                            
                            )
                            
                        )}
                
            </div><br />
                
            <br /><br /><br />
            {/* <audio src={music.audio} id="audio" onTimeUpdate={e=>UpdateProgress(e)} /> */}
            
</section>


    )
}

