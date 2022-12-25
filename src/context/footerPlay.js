import React, {Component,useState,useEffect,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faForward,faBackward,faFastForward,faFastBackward } from '@fortawesome/free-solid-svg-icons';





export const Play=(props)=>{

    // console.log(props.progress)
    

    

    
    return(
        
        props.footerplaying?

            <div className="play_feature" id="play_feature">
                <div className="play_feature_caption">
                    <img  src={props.music.image} />
                    <p>{props.music.title}</p>
                </div>


                    <div className="progress_control_holder">

                            <div className="progress_holder" onClick={props.setProgress}   >

                            <div className="progress" style={{width:`${props.progress}%`}}>

                            </div>
                        

                            </div>




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
                                </div>


                    </div>

            </div>


        : ''
       
    )
}
