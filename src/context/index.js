import React,{Component,useState,useEffect,useRef, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import { faPlay,faPause,faForward,faBackward,faBolt,faEllipsisVertical,faDownload,faBookmark } from '@fortawesome/free-solid-svg-icons';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation,EffectCoverflow,Autoplay } from "swiper";


import { ScrollTrigger,gsap } from "gsap/all";

import footer_img1 from '../css/ft1.png'
import footer_img2 from '../css/ft2.png'
import download1 from '../css/download1.png'
import download2 from '../css/download2.png'
import music from '../Victony.mp3';
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import {Routes,Route} from "react-router-dom"
import user_img from '../1.jpeg';
import music_img from '../2.jpg';
import burna_img from '../images/burna.jpg'
import AudioPlayer from 'react-h5-audio-player';

import { Footer } from "./footer";


export const Index=React.forwardRef((props,ref1)=>{


    gsap.registerPlugin(ScrollTrigger);
    const feature_holder1=useRef()
    const feature_holder2=useRef()

    // gsap.fromTo(feature_holder1.current,{
    //     scrollTrigger:{
    //         trigger:feature_holder1.current,
    //         start:'20px 80% ',
    //         markers:true,
    //     },

    //     x: -100,
    //     opacity:-2,
    //     },{
    //         x: 0,
    //         duration:3,
    //         delay:0.5,
    //         opacity:1
    //     })
//    useEffect(()=>{
//     // props.getAllPosts()
//     // props.setMusicId(localStorage.getItem('music_id'))
//    },[])
    

    

    return(
        <main className="landing">
                
                    
                    
                
                    
                        
                    
            <div className="header">
                    <div className="header_section1" ref={props.ref1}>

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



                    <div className="header_section2" ref={props.ref2}  >

                            <div className="header_img">

                                </div>

                    </div>



                </div>




                    <section className="section_1">
                        <div className="section_caption">
                        <p><FontAwesomeIcon  icon={faBolt} /> New Release</p>
                        </div>

                        <div className="section_1_holder">

                        
                                {props.posts.map((post,i)=>(

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

                                                <div class="dropdown caption_menu">
                                                    <button class="dropbtn caption_menu_btn"><FontAwesomeIcon  icon={faEllipsisVertical} /></button>
                                                        <div class="dropdown-content">
                                                            <a href={('http://127.0.0.1:8000'+post.audio)} download ><FontAwesomeIcon  icon={faDownload} /> Download</a>
                                                            <a id={post.id}  onClick={e=>props.addToFavourite(e)} > 
                                                            <FontAwesomeIcon  icon={faBookmark} style={{}} /> Favourite</a>
                                                        
                                                        </div>
                                                </div>
                                                                                    
                                            </div>
                                            
                                         
                                            
                                        
                                        </div>
                                            
                                            
                                            )
                                            
                                        )}
                                
                            </div><br />
                                
                            <br /><br /><br />
                            {/* <audio src={music.audio} id="audio" onTimeUpdate={e=>UpdateProgress(e)} /> */}
                            <Link to='/musics'>
                            <Button   variant="contained" className="more_songs_btn" >More Songs</Button >
                            </Link>
                    </section>

                    

                    
                
                    <section className="featured">
                        <div className="feature_holder" ref={feature_holder1}>

                            

                        </div>

                        
                        <div className="feature_holder"  ref={feature_holder2}>

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
    )
})