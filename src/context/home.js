import React,{Component,useState,useEffect,useRef} from "react";
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
import { faPlay,faPause,faForward,faBackward,faBolt } from '@fortawesome/free-solid-svg-icons';
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

// import Button from 'react-bootstrap/Button';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation,EffectCoverflow,Autoplay } from "swiper";

import { ScrollTrigger,gsap } from "gsap/all";
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
    const footer_audio=useRef(null)

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

        function getAllPosts(){
            fetch(`http://127.0.0.1:8000/`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data.music)
                setPosts(data.music)
                setPlaying(false)
            })
            
        }


            useEffect(()=>{
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
            await fetch(`http://127.0.0.1:8000/${e.target.id}/`).then(
                response=>response.json()
                ).then( data=>{
                console.log(data)
                  
                 setMusic( data)
            
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
                        
                    
                        let url=`http://127.0.0.1:8000/${posts[count].id}/`
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
                        let url=`http://127.0.0.1:8000/${posts[count].id}/`
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
                            Personalized music streaming service, built with the intention of giving you a seamless music experience.
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



                                <div className={"music_overlay "+ (post.id == music_id && playing?'playing':'')} 
                                id={post.id}
                            
                                onClick={e=>{setAudioSrc(e)
                                setNext(false)
                                setCount(i)
                                }}
                                ></div>


                                </div>

                            <div className="caption_holder">
                                <p className="caption">{post.title}</p>
                            </div>
                            
                        
                            
                        
                        </div>
                            
                            
                            )
                            
                        )}
                        
                        {/* <Button   variant="contained" className="auth_btn">All  artiste</Button > */}
                        
                    {/* <audio src={music.audio} id="audio" onTimeUpdate={e=>UpdateProgress(e)} /> */}
                    
            </section>
        
            <section className="featured">
                <div className="feature_holder">

                    

                </div>

                
                <div className="feature_holder">

                    <div className="feature_content">

                        <p>Enjoy More Songs | Listen To Awesome Music | Free and Ad-Supported</p>
                        <p>You can enjoy a seamless music experience with our free ad-supported service and variety of in-app purchases</p>

                    </div>

                    <div className="feature_content">

                        <p>Unlimited music | New songs every day | Explore and download with soundr</p>
                        <p>Customize your own music playlists from millions of songs and enjoy it anywhere.</p>

                    </div>


                    <div className="feature_content">

                        <p>Free and Free | The Best Music in One Place | Search, play and download</p>
                        <p>soundr is a free, ad-supported music service with in-app purchases that lets you control every aspect of your music. Listen to the songs you want and enjoy a seamless experience.</p>

                    </div>


                </div>

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
                    
                    
                    <div className="section_3-overlay">


                    <p>Available For Download on all IOS and Android Devices For Free.</p>

                            <div className="section_3_content_holder panel panel1">
                                    <div className="section_3_content">

                                        <img src={footer_img1}></img>
                                        <img src={download2}></img>
                                    </div>


                                    <div className="section_3_content">
                                        <img src={footer_img2}></img>
                                        <img src={download1}></img>
                                    </div>

                            </div>


                            {/* <div className="section_3_content_holder panel panel2">
                                <p >Hello2</p>
                            </div>


                            <div className="section_3_content_holder panel panel3">
                                <p >Hello3</p>
                                
                            </div> */}
                    </div>
                    


                    

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
                play={playSong}
                pause={pauseSong}
                audio={footer_audio}
                update={(e)=>UpdateProgress(e)}
                 
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




