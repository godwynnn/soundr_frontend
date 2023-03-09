import React,{useEffect,useState,Component} from "react";
import { json, useLocation } from "react-router-dom";
import {FormikConsumer, useFormik} from 'formik'
import * as Yup from 'yup'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../css/upload.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AudioFile, HeadsetSharp } from "@mui/icons-material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import { AuthContext } from "./auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";





export default function Update(){
        const location=useLocation()
        const navigate=useNavigate()
        const param=useParams()
        const[songDetail,setSongDetail]=useState({
            artist_name:'',
            title:'',
            audioFile:'',
            imageFile:'',
            description:'',
            genre:''
        })
        // const[artist_name,setArtistName]=useState('')
        // const[title,setTitle]=useState('')
        // const[audioFile,setAudioFile]=useState('')
        // const[imageFile,setImageFile]=useState('')
        // const[description,setDescription]=useState('')
        // const[genre,setGenre]=useState('')
        const[song_genre,setSongGenre]=useState([])
        // console.log(songDetail)



        const getSongGenre=async()=>{
            const token=localStorage.getItem('token')
            const res =await fetch(`http://127.0.0.1:8000/update/${param.id}`,{
                method:'GET',
                headers:{'Authorization':`Token ${token}`},
            })
            const data= await res.json()
            // const new_data=await res.blob()
            console.log(data)

            setSongGenre(data.genre)
            // const song=data.music.audio.split('/')
            // console.log(data.music.audio.split('/')[data.music.audio.split('/').length-1])
            
        


            setSongDetail({
                artist_name:data.music.artist_name,
                title:data.music.title,
                audioFile:data.music.audio,
                imageFile:data.music.image,
                description:data.music.description,
                genre:data.music.genre,
            })
            // const audio_blob = new Blob([data.music.audio]);
            const audio = new File([data.music.audio],  data.music.audio.split('/')[data.music.audio.split('/').length-1]);


            // const image_blob = new Blob([data.music.image]);
            const image = new File([data.music.image], data.music.image.split('/')[data.music.image.split('/').length-1]);

            // console.log(data.music.audio.blob())

            
            formik.setFieldValue('artist_name',data.music.artist_name)
            formik.setFieldValue('title',data.music.title)
            formik.setFieldValue('audio',audio)
            formik.setFieldValue('image',image)
            formik.setFieldValue('description',data.music.description)
            formik.setFieldValue('genre',data.music.genre)



        }
        // const song_detail=this.songDetail


        const formik=useFormik({
    
            initialValues:{
                artist_name:'',
                title:"",
                // audio:"",
                // image:"",
                description:"",
                genre:"",
    
            },
            
            validationSchema:Yup.object({
                artist_name:Yup.string().required(),
                title:Yup.string().required(),
                // audio:Yup.string().required(),
                
    
                }),
                
            
                onSubmit:((values)=>{
                    const token=localStorage.getItem('token')
                    // const data={
                    //     artist_name:values.artist_name,
                    //     title:values.title,
                    //     audio: values.audio,
                    //     image:values.image,
                    //     description:values.description,
                    //     genre:values.genre,
                     
                    // }
    
    
                    const data=new FormData()
                    data.append('artist_name',values.artist_name)
                    data.append('title',values.title)
                    data.append('audio',values.audio)
                    data.append('image',values.image)
                    data.append('description',values.description)
                    data.append('genre',values.genre)


                    // console.log(typeof(values.audio))
    
    
                    console.log(data)
                    console.log(formik.values)
                    fetch(`http://127.0.0.1:8000/update/${param.id}`,{
                        method:"PUT",
                        body:data,
                        headers:{
                            // "Content-Type": "application/x-www-form-urlencoded",
                            // "Accept":"multipart/form-data",
                            // 'Content-Type': 'multipart/form-data',
                            'Authorization':`Token ${token}`,
                        },
                        
                    }).then(res=>res.json())
                    .then(data=>{
                        try{
                            console.log(data)
                            formik.setFieldValue('artist_name','')
                            formik.setFieldValue('title','')
                            formik.setFieldValue('audio','')
                            formik.setFieldValue('image','')
                            formik.setFieldValue('description','')
                            formik.setFieldValue('genre','')
    
                            if(data.status === false){
                                // alert('incorrect username or password')
                                document.getElementById('upload_msg').style.display='block'
                                document.getElementById('upload_msg').innerHTML=`<li style=color:red>${data.message}</li>`
        
                                setTimeout(()=>{
                                    if(document.getElementById('upload_msg').style.display=='block'){
                                        document.getElementById('upload_msg').style.display='none'
                                        // document.getElementById('error_msg').style.transition='2s ease'
                                    }
                                },10000)
                            }
    
                        }catch(error){
                            console.error(error)
                        }
                    })
                }),
                // audioUpload: ((event)=>{
                //     formik.setFieldValue('audio',event.target.files[0])
    
                // })
                
            })
        
    
        useEffect(()=>{
            getSongGenre()
        },[])

    return(
        
        <div className="create_landing">

        {JSON.parse(localStorage.getItem('logged_in'))?
        
        
        
            <form action="" 
                className="create_form" 
                // onSubmit={(e)=>{
                //     e.preventDefault();
                //     formik.handleSubmit();
                // }}
            onSubmit={formik.handleSubmit}
            >
                
                    <Box component="form" sx={{  width: '100%', display:'flex',flexDirection:'column',gap:'20px' }}  
                        >
                        <TextField 
                        id="outlined-basic"
                        label="Artist Name" 
                        variant="outlined" 
                        name="artist_name"
                        // initialValue={songDetail.artist_name}
                        value={formik.values.artist_name}
                        onChange={formik.handleChange} 
                        />
                        <TextField id="outlined-basic" label="Title" variant="outlined" name='title' onChange={formik.handleChange} value={formik.values.title} />

                        <IconButton  aria-label="upload picture" component="label" sx={{ background:'grey',width:'20%',borderRadius:'5%' }}>
                            <input hidden accept="audio" type="file" name='audio'  onChange={(e)=>formik.setFieldValue("audio",e.currentTarget.files[0])} />
                            <AudioFile  />
                        </IconButton>

                        <IconButton  aria-label="upload picture" component="label" sx={{ background:'grey',width:'20%',borderRadius:'5%'  }}>
                            <input hidden accept="image" type="file"  name='image'  onChange={(e)=>formik.setFieldValue("image",e.currentTarget.files[0])}  />
                            <PhotoCamera   />
                        </IconButton>

                        {/* <input type="file" value={audio} onChange={handleAudioUpload} name='audio'  /> */}

                        <FormControl sx={{width:'50%' , color:'black',}}>
                            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.genre}
                                name='genre'
                                label="Genre"
                                onChange={formik.handleChange('genre')}
                                
                                >

                                {song_genre.map(genre=>(
                                    <MenuItem key={genre.id} value={genre.id} sx={{color:'black'}}>{genre.name}</MenuItem>
                                ))}
                                
                                
                                </Select>
                            </FormControl>

                        <TextField id="outlined-basic" className="description" name="description" value={formik.values.description} onChange={formik.handleChange} label="Desciption" variant="outlined" rows={6} multiline />

                    </Box>
                    <br />

                <Button variant="contained" sx={{width:'30%'}} type='submit' >Submit</Button>
                <ul id="upload_msg">

                </ul>


                
            </form>
        :
        navigate(
            `/auth?login`,
            {
                state: { from: location }, // <-- pass current location
                replace: true
            }
            )}
    </div>
    )
}