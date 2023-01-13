import React,{useState,useEffect,useRef} from "react"
import { useParams } from "react-router-dom"
import '../css/detail.css'
import { Navbar } from "./nav"
import { Play } from "./footerPlay";
import WaveSurfer from 'wavesurfer.js';


export const Detail=()=>{
    const[music_id,setMusicId]=useState(null)
    const [post, setPost]=useState([])
    const[playing,setPlaying]=useState(false)
    const[next,setNext]=useState(false)
    let[count,setCount]=useState(0)
    const[footerplaying,setFooterPlaying]=useState(false)
    const[music,setMusic]=useState('')
    const {id}=useParams()
    const waveform=useRef()
    function getPosts(){
        fetch(`http://127.0.0.1:8000/${id}/`)
        .then(res=>res.json())
        .then(data=>{setPost(data.music)
        // console.log(data)
        })
    }

    useEffect(()=>{
        getPosts()
        console.log(post.audio)
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
            <Navbar/>

            <div className="detail_page_content">


                <div className="detail_content_holder">
                   <div className="section1">
                    <img src={'http://127.0.0.1:8000'+post.image} alt="" />
                    <p>{post.artist_name}<br /><span>{post.title}</span></p>
                    
                   </div>

                   <div className="section2">
                        <div className="content_caption">
                            <p>{post.artist_name}</p>
                            <p>{post.title}</p>
                        </div>
                        <div id="waveform"  ref={waveform}></div>
                    
                   </div>
                </div>

            </div>


        </div>
    )
}