import React, {Component,useState,useEffect,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faForward,faBackward,faFastForward,faFastBackward,faVolumeHigh, faMinimize} from '@fortawesome/free-solid-svg-icons';

import AudioPlayer from 'react-h5-audio-player';
import ReactAudioPlayer from 'react-audio-player';
import ReactJkMusicPlayer from "react-jinke-music-player";
import 'react-h5-audio-player/lib/styles.css';
import { WaveSurfer } from 'wavesurfer-react';
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import { click } from "@testing-library/user-event/dist/click";
import 'react-jinke-music-player/assets/index.css'
// import MyCustomPlugin from 'my-custom-plugin-path';





export const Play=(props)=>{

    // console.log(props.progress)
   
    // const volume_control=document.querySelector('.volume_icon');
    // const volume_holder=document.querySelector('#volume_holder')
    // volume_control.addEventListener('click',()=>{
        
    // })
    function ShowVolume(){
        document.querySelector('#volume_holder').classList.add('active')
    }
    function removeVolume(){
        document.querySelector('#volume_holder').classList.remove('active')
    }
    

    
    return(
        
        props.footerplaying?

            <div className="play_feature" id="play_feature">
                <div className="play_feature_caption">
                    <img  src={props.music.image} />
                    <p>{props.music.title}</p>
                </div>


                    <div className="progress_control_holder">

                            {/* <div className="progress_holder" onClick={props.setProgress}   >

                            <div className="progress" style={{width:`${props.progress}%`}}>

                            </div>
                        

                            </div>
                            <input type="range" min="0" max="100" value={props.progress} class="progress_holder" onChange={props.setProgress}  />




                            <div className="controls">
                                    <button>
                                    <FontAwesomeIcon  icon={faFastBackward} className='control' onClick={props.prev} />
                                    </button>
                                    
                                    <button>
                                    <FontAwesomeIcon  icon={props.playicon}  className='control' onClick={props.playpause}/>
                                    </button>

                                    <button>
                                    <FontAwesomeIcon  icon={faFastForward} className='control' onClick={props.next}/>
                                    </button>

                                    <button>
                                    <FontAwesomeIcon  icon={faVolumeHigh} className='control volume_icon' onMouseOver={ShowVolume} onMouseOut={removeVolume}/>
                                    </button>
                                </div>
                            
                            <div className="volume_holder" id='volume_holder'>
                            <input type="range" min="0" max="100" value='0' class="volume" onChange=''   />
                            </div> */}


                            
                            <AudioPlayer
                                    autoPlay
                                    src={props.music.audio}

                                    onPlay={props.play}
                                    onPause={props.pause}
                                    onClickNext={props.next}
                                    onClickPrevious={props.prev}
                                    showSkipControls={true} 
                                    showJumpControls={false}
                                    ref={props.audio}
                                    onEnded={props.update}
                                    layout="horizontal" 
                                        
 
                                    />
                            <div className="minimize">
                            <FontAwesomeIcon  icon={faMinimize} onClick=''/>
                            </div>


                    </div> 


                               
                                    
                                   


            </div>


        : ''
       
    )
}
