import React,{useEffect, useState, useRef} from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import '../css/favourite.css'
// import '../css/index.css'
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faBookmark,faDownload } from "@fortawesome/free-solid-svg-icons";

const Favourite=(props)=>{
    const navigate=useNavigate()
    const[offset,setOffSet]=useState(0)
    const [limit,setLimit]=useState(2)
    const[isLoading,setLoading]=useState(true)
    const[musicCount,setMusicCount]=useState(0)
    // console.log(musicCount)

    const[posts,setPosts]=useState([])
    const[page_num,setPageNumbers]=useState(1)
    const[postsCount,setPostsCount]=useState(0)
    const baseUrl=`http://127.0.0.1:8000/favourite`
    
    const token=localStorage.getItem('token')

    async function getAllPosts (){

        setLoading(true)
        await fetch(baseUrl,{
            method:'GET',
            headers:{
                'Authorization':`Token ${token}`

            }

        })
        .then((res)=>res.json()).then((data)=>{
            setPosts(data.favourite)
            setOffSet(offset+limit)
            setLoading(false)
            console.log(offset)
            
            console.log(data)
            setMusicCount(Math.floor(data.music_len/2))
            // setPlaying(false)
        })
    }


    useEffect(()=>{
        getAllPosts()
    },[])




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
        getAllPosts();

    }

    return(
        <div className="favourite_page">
            <div className="favourite_header">
                <p><FontAwesomeIcon icon={faBookmark} /> Favourite</p>

            </div>
            <section className="favourite_holder">

            {posts.map((post,i)=>(
                <div className="favourite_section">

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
                                            <i  id={post.id} onClick={setFavourite} className="favourite fa-solid fa-bookmark "  style={post.status?{color:'#2B434E'}:{color:'white'}}></i>
                                           
                                        </div> 
                                                                            
                                    </div>

                </div>
                )
            )}


            </section>

        </div>
    )
}

export default Favourite