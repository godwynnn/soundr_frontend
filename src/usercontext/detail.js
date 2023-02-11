import React,{useState,useEffect,useRef} from "react"
import { useParams } from "react-router-dom"
import '../css/detail.css'
import { Navbar } from "../context/nav";
import { Play } from "../context/footerPlay";
import WaveSurfer from 'wavesurfer.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import {ShareSocial} from 'react-share-social' 

export const UserDetail=()=>{
    const navigate=useNavigate()
    const[music_id,setMusicId]=useState(null)
    const [post, setPost]=useState([])
    const[playing,setPlaying]=useState(false)
    const[next,setNext]=useState(false)
    let[count,setCount]=useState(0)
    const[footerplaying,setFooterPlaying]=useState(false)
    const[music,setMusic]=useState('')
    const {id}=useParams()
    const waveform=useRef()
    const location=useLocation()
    const[isLoading,setLoading]=useState(true)
    
    // function getPosts(){
    //     setLoading(true)
    //     fetch(`http://127.0.0.1:8000/${id}/`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //     setPost(data.music)
    //     setLoading(false)
    //     console.log(data)
    //     })
    // }

    const getPosts=async ()=> {
        setLoading(true)
        const token=localStorage.getItem('token')
        // console.log(token)
        const response= await fetch(`http://127.0.0.1:8000/${id}/`,{
            method:'GET',
            headers:{
                
                'Authorization':`Token ${token}`,
            
            }
        })
        console.log(response.url)
        if (response.status===401){
            navigate(
                `/auth?login`,
                {
                  state: { from: location }, // <-- pass current location
                  replace: true
                }
              );
            localStorage.setItem('next_url',response.url)
        }
        const data=await response.json()
        console.log(data)

        setPost(data.music)
        setLoading(false)
    
    }

    useEffect(()=>{
        getPosts()
        // console.log(post.audio)
        // if (((localStorage.getItem('music_data') != ''))){
        //     setMusic(JSON.parse(localStorage.getItem('music_data')))
        // }
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

        <div className="detail_page" key={post.id}>
            {/* <Navbar/> */}

            
                <div className="detail_page_content">
                    {isLoading?
                            <Stack sx={{ color: 'grey.500',display:'flex',flexDirection:'row', justifyContent:'center'}} spacing={2} direction="row">
                                        
                            <CircularProgress color="inherit" />
                        </Stack> 
                
                    :


                            <div className="detail_content_holder">
                                    <div className="section1">
                                        <img src={'http://127.0.0.1:8000'+post.image} alt="" />
                                        <p>{post.artist_name}<br /><span>{post.title}</span></p>
                                        
                                    </div>

                                    <div className="section2">
                                            <div className="content_caption">
                                                <p>{post.artist_name}</p>
                                                <p>{post.title}</p><br />
                                                {/* <ShareSocial 
                                                    url ="url_to_share.com"
                                                    socialTypes={['facebook','twitter','reddit','linkedin']}
                                                /> */}
                                            </div>
                                            <div id="waveform"  ref={waveform}></div>
                                        
                                    </div>
                            </div>
                             }

                </div>
                   


            


        </div>
    )
}