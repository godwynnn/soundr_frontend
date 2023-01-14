import React,{Component,useState,useEffect,useRef, useContext} from "react";
import {Routes,Route} from "react-router-dom"
import user_img from '../1.jpeg';
import music_img from '../2.jpg';
import burna_img from '../images/burna.jpg'
import AudioPlayer from 'react-h5-audio-player';
import ReactAudioPlayer from 'react-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import footer_img1 from '../css/ft1.png'
import footer_img2 from '../css/ft2.png'
import download1 from '../css/download1.png'
import download2 from '../css/download2.png'
import music from '../Victony.mp3';
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faForward,faBackward,faBolt,faEllipsisVertical,faDownload,faBookmark } from '@fortawesome/free-solid-svg-icons';
import WaveSurfer from 'wavesurfer.js';
// import AudioPlayer from 'react-modern-audio-player';

import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import { Play } from "./footerPlay";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import { Navbar } from "./nav";
import { Footer } from "./footer";
import { Index } from "./index";

// import Button from 'react-bootstrap/Button';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation,EffectCoverflow,Autoplay } from "swiper";

import { ScrollTrigger,gsap } from "gsap/all";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Detail } from "./detail";
import { Music } from "./allsongs";
import { Authenticate } from "./auth";

// import Lettering from "./lettering";

// import '../css/index.css'


export const searchContext=React.createContext()




const Home=()=>{

    const navigate=useNavigate()
    const audio=document.querySelector('#audio')
    const music_container=document.querySelector('#music_container')
    const currently_playing=document.getElementById('audio')
    
    const{searchedPost,searched,setSearchInput,setSearched}=useContext(searchContext)
    const [image, setImage]=useState('')
    const[music_id,setMusicId]=useState(null)
    const [posts, setPosts]=useState([])
    const [icon,setIcon]=useState(faPlay)
    const[playing,setPlaying]=useState(false)
    const[next,setNext]=useState(false)
    let[count,setCount]=useState(0)
    const[footerplaying,setFooterPlaying]=useState(false)
    const[music,setMusic]=useState('')
    const[audioUrl,setAudioUrl]=useState('')
    const footer_audio=useRef(null)

    const param=useParams()
    

    const song_id=document.getElementById(music_id)

    // const progress=useRef()
    const[progress,SetCurrentProgress]=useState(0)

    // GSAP
    const header_section1=useRef(null);
    const header_section2=useRef(null);

    gsap.registerPlugin(ScrollTrigger);
    function headerAnime(){
        gsap.fromTo(header_section1.current,{
            x: -100,
            opacity:-2,
           
        },{
            x: 0,
            duration:3,
            delay:0,
            opacity:1
        })
        gsap.fromTo(header_section2.current,{
            x: -500,
            opacity:-1,
           
        },{
            x: 0,
            duration:4.5,
            delay:0,
            opacity:0.7
        })

       
    }
    

            
            // let sections = gsap.utils.toArray(".panel");
            
            // const tl =gsap.timeline({
            //     scrollTrigger: {
            //         trigger: ".section_3",
            //         toggleActions: "restart pause pause reverse",
            //         anticipatePin: 1,
            //         // speed: 0.5,
            //         start: "top top",
            //         // endTrigger:".section_3",
                    
                    
            //         // markers:true,
            //         pin: true,
                     
            //         // pinSpacing: false, 
            //         scrub: 1,
            //         // snap: 1 / (sections.length - 1),
            //         // base vertical scrolling on how wide the container is so it feels more natural.
                    
            //         end: 'bottom bottom',
            //         // end: () => "+=" + document.querySelector('.section_3').offsetWidth,
            //     }

            // })

            // tl.to('.section_3_content_holder', {
            // xPercent: -100,
            // ease: "none",
            // duration:3,
            
            // });

            // tl.to('.section_3_content_holder', {
            //     xPercent: -200,
            //     ease: "none",
            //     duration:3,
                
            //     });
            // tl.to('.panel2', {
            //     xPercent: -200,
            //     ease: "none",
            //     duration:1,
                
            //     });
            //     tl.to('.panel3', {
            //         xPercent: -300,
            //         ease: "none",
            //         duration:1,
                    
            //         })

         async function  getAllPosts(){
            
             await fetch(`http://127.0.0.1:8000/`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data.music)
                // localStorage.setItem('searchvalue','')
                setPosts(data.music)
                setPlaying(false)
                
                
                
               
            })
           
            
            
            
            
        };

            // WINDOW RELOAD EVENT
            window.onload=function(){
                
                localStorage.setItem('footer_playing',false)
                localStorage.setItem('playing',false)
                localStorage.removeItem('music_data')
                // setSearched(true)
                
                
                
            }



            useEffect(()=>{
                
                setSearched(false)
                getAllPosts(); 
                headerAnime()
                
                
                
                
                // console.log(this)
            },[])
            
            
                
                
          


    // LOAD AND CONTROL MUSIC
                function playSong(e){
                
                    // e.target.classList.add('playing')
                   
                    setIcon(faPause)
                    setFooterPlaying(true)
                    setPlaying(true)
                    localStorage.setItem('playing',true)
                    localStorage.setItem('footer_playing',true)
                    footer_audio.current.audio.current.play()
                    // footer_audio.current.play()
                    // const audio_played=e.target.nextSibling
                    // console.log(audio)
                    // console.log(e.target.nextSibling)
                    // if(next){
                    //     
                    // }else return
                    // audio.autoplay=true 
                    // audio.play()

          
                }

                function pauseSong(e){

                    
                    // e.target.classList.remove('playing')
                    setIcon(faPlay)
                    setFooterPlaying(true)
                    setPlaying(false)
                    localStorage.setItem('playing',false)
                    localStorage.setItem('footer_playing',true)
                    footer_audio.current.audio.current.pause()
                    // console.log(audio)
                    // console.log(e.target.nextSibling)
                    //  const audio_played=e.target.nextSibling
                    //  audio.pause()
                   
                }

            function playPause(e){
     
                // let isplaying=song_id.classList.contains('playing') 
                   
                    if(playing){
                        
                        pauseSong(e)
                    }else{
                        playSong(e)
                    }   
            }


        const   setAudioSrc= async (e)=>{
            // let url=`http://127.0.0.1:8000/${e.target.id}/`

            // console.log(e)
            setMusicId(e.target.id)
            await fetch(`http://127.0.0.1:8000/${e.target.id}/play`).then(
                response=>response.json()
                ).then( data=>{
                console.log(data)
                  
                 setMusic( data)
                 localStorage.setItem('music_data',JSON.stringify(data))
            
                console.log(music_id)
                
                playPause(e)
                })
   
        }
            
        
        // NEXT SONG FUNCTION

                async function NextSong(){
                        // audio.currentTime=0
                        if(count < posts.length-1){
                            count++
                        }else{
                            count=0
                        }
                        
                        setNext(true)
                        setCount(count)
                        
                    
                        let url=`http://127.0.0.1:8000/${posts[count].id}/play`
                        // posts[count].id
                        setMusicId(posts[count].id)
                        setPlaying(true)


                    await fetch(url).then(response=>response.json()
                        ).then(data=>setMusic(data))

                        footer_audio.current.audio.current.autoplay=true
                        
                        // console.log(posts[count])
                        // console.log(count)

                    }
                    

            // PREVIOUS SONG FUNCTION
                
                    async function PrevSong(){
                        if (count > 0){
                            count--
                        }else{
                            count=posts.length - 1
                        }
                        setNext(true)
                        setCount(count)
                        let url=`http://127.0.0.1:8000/${posts[count].id}/play`
                        // e=posts[count].id
                        setMusicId(posts[count].id)
                        setPlaying(true)

                        await fetch(url).then(response=>response.json()
                                ).then(data=>setMusic(data))

                            footer_audio.current.audio.current.autoplay=true
                            
                            // console.log(posts[count])
                            // console.log(count)

                    }

            
            const UpdateProgress=(e)=>{
                // console.log(audio.currentTime)
                const {duration,currentTime}=footer_audio.current.audio.current

                if (duration == currentTime){
                    
                    NextSong()
                }else{
                    const ProgressPercent=(currentTime/duration)*100
                
                    SetCurrentProgress(`${ProgressPercent}`)
                }
            }
            

        
            const setProgress=(e)=>{
                // const width=e.target.clientWidth
                // console.log(e)
                // const clickX=e.nativeEvent.offsetX
                // console.log(clickX)
                // audio.currentTime=(clickX/width)*duration
                const duration=audio.duration
                console.log(audio.duration/60)

                audio.currentTime=duration*(e.target.value/100)
            }

            const RunDownload=async (e)=>{
                e.preventDefault()
                fetch(`http://127.0.0.1:8000/download?id=${e.target.id}`)
                .then(res=>res.json()).then(data=>console.log(data))

            }

            // console.log(searchedPost)
            console.log(searched)


            
        

        return(
              
            <body>
                            
                       
                            <Navbar/>
            <Routes>

            
                    <Route path="/search=:query"  element={<Search searchedposts={searchedPost}/>}></Route>  

                    <Route path="/" element={<Index 
                        posts={posts}
                        music_id={music_id}
                        playing={playing}
                        setAudioSrc={(e)=>setAudioSrc(e)}
                        setNext={setNext}
                        setCount={setCount}
                        ref1={header_section1}
                            // ref2={header_section2}
                    />}></Route>

                    <Route path="/:id"  element={<Detail/>} />
                    <Route path="/recent"  element={<Music/>} />
                    <Route path="/auth"  element={<Authenticate/>} />

            </Routes>  
            
            
                


                    
                            <Play image={image} 
                                playing={playing}
                                footerplaying={footerplaying} 
                                playpause={(e)=>playPause(e)}
                                playicon={icon} 
                                progress={progress} 
                                setProgress={e=>setProgress(e)}
                                music={music}
                                next={NextSong}
                                prev={PrevSong}
                                play={playSong}
                                pause={pauseSong}
                                audio={footer_audio}
                                update={(e)=>UpdateProgress(e)}
                                set_music={setMusic}
                                setFooterPlaying={setFooterPlaying}
                                
                                />
                          

                        
                        

                </body>
           
        )
}

export default Home




export const Menu=()=>{

    return(

            <aside className="menu">
                   

                    <ul >
                        
                        <li>home</li>
                        <li>new release</li>
                        <li>latest</li>
                        <li>genre</li>
                        <li>contact</li>


                    </ul>


                    <div className="profile_bottom">
                        <img src={user_img} />
                        <p>Miracle c Godwin</p>
                    </div>

                </aside>


               


       
    )
}







export const Search=(props)=>{

    const{setSearchedPost,searchedPost,searchInput,searched,setSearched}=useContext(searchContext)
    console.log(searchedPost)


    // useEffect(()=>{
    //     setSearched(true)
    //     if (localStorage.getItem('searchvalue') != ''){
    //         // navigate("/")
    //         fetch(`http://127.0.0.1:8000/search?q=${localStorage.getItem('searchvalue')}`)
    //         .then(res=>res.json()).then(data=>{
    //             setSearchedPost(data.music)
    //             // setSearched(true)
    //             // navigate(`/search/${localStorage.getItem('searchvalue')}`)
                
    //             // console.log(data)
    //         })
       
    // }
    // },[])
        
    window.onload=function(){
        setSearched(true)
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
    }

    return(
        

               
                
                            
                       
                        
                   
                <main className="landing">
            
            
       
            <section className="section_1">
                    <div className="section_1_holder">

                                
                    {searchedPost.map((post,i)=>(

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

                    </div>
            </section>

                </main>





    
            
       
            
       
    )
}



