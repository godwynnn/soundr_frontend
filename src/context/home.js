import React,{Component,useState,useEffect,useRef} from "react";
import user_img from '../1.jpeg';
import music_img from '../2.jpg';
import burna_img from '../images/burna.jpg'
import music from '../Victony.mp3';
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faForward,faBackward,faBolt } from '@fortawesome/free-solid-svg-icons';
import WaveSurfer from 'wavesurfer.js';
// import AudioPlayer from 'react-modern-audio-player';

import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import { Play } from "./footerPlay";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Navbar } from "./nav";
import { Footer } from "./footer";

// import Button from 'react-bootstrap/Button';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation,EffectCoverflow,Autoplay } from "swiper";
import {gsap} from "gsap";
// import Lettering from "./lettering";

// import '../css/index.css'


// import MyCustomPlugin from 'my-custom-plugin-path';




// const WaveFormOptions=ref=>({
//     barWidth: 3,
//     cursorWidth: 1,
//     container: ref,
//     // backend: 'WebAudio',
//     height: 80,
//     progressColor: '#2D5BFF',
//     responsive: true,
//     waveColor: '#EFEFEF',
//     cursorColor: 'transparent',
// });



const Home=()=>{

    const audio=document.querySelector('#audio')
    const music_container=document.querySelector('#music_container')
    const currently_playing=document.getElementById('audio')

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



    // const progress=useRef()
    const[progress,SetCurrentProgress]=useState(0)

    // Gsap
    const header_section1=useRef(null);
    const header_section2=useRef(null);


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
   
    
    


        function getAllPosts(){
            fetch(`http://127.0.0.1:8000/`)
            .then(response=>response.json())
            .then(data=>{
                // console.log(data)
                setPosts(data)
                setPlaying(false)
            })
            
        }

    // LOAD ALL POSTS
            // function soundrimage(){
            //     // setImage(music_img)
                
            // }

            useEffect(()=>{
                getAllPosts(); 
                headerAnime()
                // console.log(this)
            },[])
        


    // LOAD AND CONTROL MUSIC
                function playSong(e){
                
                    e.target.classList.add('playing')
                   
                    setIcon(faPause)
                    setFooterPlaying(true)
                    setPlaying(true)
                    // const audio_played=e.target.nextSibling
                    // console.log(audio)
                    // console.log(e.target.nextSibling)
                    // if(next){
                    //     
                    // }else return
                    audio.autoplay=true 
                    audio.play()
          
                }

                function pauseSong(e){

                    
                    e.target.classList.remove('playing')
                    setIcon(faPlay)
                    setFooterPlaying(true)
                    setPlaying(false)
                    // console.log(audio)
                    // console.log(e.target.nextSibling)
                    //  const audio_played=e.target.nextSibling
                     audio.pause()
                   
                }

            function playPause(e){
            
                      
                // let isplaying=audio.classList.contains('play') 
                   
                    if(playing){
                        
                        pauseSong(e)
                    }else{
                        playSong(e)
                    }


                    
                
            }


            const UpdateProgress=(e)=>{
                // console.log(audio.currentTime)
                const {duration,currentTime}=audio

                const ProgressPercent=(currentTime/duration)*100
                
                SetCurrentProgress(`${ProgressPercent}`)
                

            }


        const   setAudioSrc= async (e)=>{
        
            
            // let url=`http://127.0.0.1:8000/${e.target.id}/`
            
           
            console.log(e)
            setMusicId(e.target.id)
            await fetch(`http://127.0.0.1:8000/${e.target.id}/`).then(
                response=>response.json()
                ).then( data=>{
                console.log(data)
                  
                 setMusic( data)
            
                console.log(count)
                
                playPause(e)
                })
                
                
            
        }
            
        
        // NEXT SONG FUNCTION

                async function NextSong(e){
                        
                        if(count < posts.length-1){
                            count++
                        }else{
                            count=0
                        }
                        
                        setNext(true)
                        setCount(count)
                        
                    
                        let url=`http://127.0.0.1:8000/${posts[count].id}/`
                        e=posts[count].id
                        setMusicId(posts[count].id)
                        setPlaying(true)


                    await fetch(url).then(response=>response.json()
                        ).then(data=>setMusic(data))

                        audio.autoplay=true
                        
                        // console.log(posts[count])
                        console.log(count)

                    }
                    

            // PREVIOUS SONG FUNCTION
                
                    async function PrevSong(e){
                        if (count > 0){
                            count--
                        }else{
                            count=posts.length - 1
                        }
                        setNext(true)
                        setCount(count)
                        let url=`http://127.0.0.1:8000/${posts[count].id}/`
                        e=posts[count].id
                        setMusicId(posts[count].id)
                        setPlaying(true)

                        await fetch(url).then(response=>response.json()
                                ).then(data=>setMusic(data))

                            audio.autoplay=true
                            
                            // console.log(posts[count])
                            console.log(count)

                    }
                    

        
            const setProgress=(e)=>{
                const width=e.target.clientWidth
                // console.log(e)
                const clickX=e.nativeEvent.offsetX
                // console.log(clickX)
                const duration=audio.duration
                // console.log(duration)

                audio.currentTime=(clickX/width)*duration

            }


        // MUSIC INFO
        // const music_image= document.querySelector("#music_image")


        

    return(
        
<body>
            
            
            <Navbar/>
    <main className="landing">


        <div className="header">
            <div className="header_section1" ref={header_section1}>

                <div className="header_caption">
                    <p>
                        <span>Discover.</span>Listen.Share
                    </p><br/><br/>

                    {/* <Lettering className="fancyText" tagName="p" charClass="custom"> */}
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                    {/* </Lettering> */}
                    <br/>
                    <Button variant="outlined">Explore</Button>

                </div>

            </div>



            <div className="header_section2" ref={header_section2}>

                    <div className="header_img">

                        </div>

            </div>



        </div>

            

    
    <section className="section_1">
        <div className="section_caption">
        <p><FontAwesomeIcon  icon={faBolt} /> New Release</p>
        </div>
        {posts.map((post,i)=>(

            <div className="music_holder" key={i}>


                    <div className={"music_container" }  id={post.id} onClick={e=>setAudioSrc(e)}>
                      
                                    
                        <img  className={"music_image "}

                        id={post.id}
                        onClick={(e)=>{setAudioSrc(e)}} 
                        src={'http://127.0.0.1:8000'+post.image} key={i}></img>

                       


                        {/* <button >
                            <FontAwesomeIcon icon={post.id == music_id?icon:faPlay} 
                            // onClick={(e)=> ''} 
                              id="playBtn"  />
                        </button> */}



                        <div className={"music_overlay "+(post.id == music_id && playing?'playing':'')} 
                        id={post.id}
                     
                        onClick={e=>{setAudioSrc(e)
                        setNext(false)
                        setCount(i)
                        }}
                        ></div>


                          {/* <AudioPlayer
                                autoPlayAfterSrcChange={false}
                                src={'http://127.0.0.1:8000'+post.audio}
                            /> */}

                        
                        

                        </div>

                    <div className="caption_holder">
                        <p className="caption">{post.title}</p>
                    </div>
                       
                
                    
                
                </div>
                    
                    
                    )
                    
                )}
                
                {/* <Button   variant="contained" className="auth_btn">All  artiste</Button > */}
                
            <audio src={music.audio} id="audio" onTimeUpdate={e=>UpdateProgress(e)} />
            
    </section>
    

        <section className="section_2">
            <p>Artiste</p><br/>
        <div className="swipe-section">
                    <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    data-swiper-parallax={-300}
                    data-swiper-parallax-opacity={0}
                    coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    
                    
                    }}

                    // pagination={true}
                    modules={[EffectCoverflow, Pagination,Autoplay]}
                    className="mySwiper"
                >
                    
                    <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>
                    


                    <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>


                    <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>


                   <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>


                    <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>



                   <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>


                    <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>



                   <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>



                   <SwiperSlide>
                    
                    <div className="swiper_img_holder" >
                        <a href="#">
                            <p  className="swiper_img_caption">Burna Boy</p>
                        </a>
                        <img src={burna_img} />
                            
                    </div>
                    
                    
                    </SwiperSlide>


                </Swiper>
        </div>
            
        <Button   variant="contained" className="auth_btn">All  artiste</Button >
            </section>

            <section className="section_3">
                <p >Hello</p>

            </section>

            <Footer/>
    </main>
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




