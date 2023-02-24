import React,{useState,useEffect,useRef} from "react"
import { Link, useParams } from "react-router-dom"
import '../css/detail.css'
import { Navbar } from "./nav"
import { Play } from "./footerPlay";
import WaveSurfer from 'wavesurfer.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";

export const HeroDetail=(props)=>{
   
    const waveform=useRef()
    useEffect(()=>{
        
        if(waveform.current){
            let wavesurfer = WaveSurfer.create({
                container: waveform.current,
                waveColor: 'white',
                progressColor: 'grey'
            });
            // wavesurfer.load(`http://127.0.0.1:8000/${post.audio}`);
            const song='http://127.0.0.1:8000/media/audio/frodo_baggins_e.l_feat._nova_blaq_aac_75229.m4a'
            wavesurfer.load(song);
        }
    },[])

    
    
    
    return(

        <div className="detail_page" key={props.post.id}>
            {/* <Navbar/> */}

            
                <div className="detail_page_content">
                    {props.isLoading?
                            <Stack sx={{ color: 'grey.500',display:'flex',flexDirection:'row', justifyContent:'center'}} spacing={2} direction="row">
                                        
                            <CircularProgress color="inherit" />
                        </Stack> 
                
                    :


                            <div className="detail_content_holder">
                                    <div className="section1">
                                        <img src={'http://127.0.0.1:8000'+props.post.image} alt="" />
                                        <p>{props.post.artist_name}<br /><span>{props.post.title}</span></p>
                                        
                                    </div>

                                    <div className="section2">
                                            <div className="content_caption">
                                                <p>{props.post.artist_name}</p>
                                                <p>{props.post.title}</p>
                                            </div>
                                            <div id="waveform"  ref={waveform}></div>


                                            
                                            
                                    </div>
                                    
                                    
                            </div>
                             }



                             <br /><br />
                             {JSON.parse(localStorage.getItem('logged_in')) && props.post.posted_by_user?

                            <Link to={`/update/${props.post.id}`}>
                            <Button   variant="contained" >Edit</Button >
                            </Link>                         
                             
                             :
                             ''
                             }
                             

                </div>
                   
                

            


        </div>
    )
}