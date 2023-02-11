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
// import { useLocation } from "react-router-dom";



const CreateUpload =()=>{


    const location=useLocation()
    const navigate=useNavigate()
    const{isloggedIn}=useContext(AuthContext)
    const[song_genre,setSongGenre]=useState([])
    // const [audio, setAudio] = useState('');
    // const handleAudioUpload = event => {
    //     setAudio(event.target.files[0]);
    //     console.log(event.target.files)
    //     console.log(event.target.value)
    // }

    const getSongGenre=async()=>{
        const token=localStorage.getItem('token')
        const res =await fetch('http://127.0.0.1:8000/create',{
            method:'GET',
            headers:{'Authorization':`Token ${token}`},
        })
        const data= await res.json()
        console.log(data.genre)
        setSongGenre(data.genre)
    }

    useEffect(()=>{
        getSongGenre()
    },[])
    
    const formik=useFormik({
        initialValues:{
            artist_name:"",
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


                console.log(data)
                fetch('http://127.0.0.1:8000/create',{
                    method:"POST",
                    body:data,
                    headers:{
                        // "Content-Type": "application/x-www-form-urlencoded",
                        // "Accept":"application/json",
                        // 'Content-Type': 'multipart/form-data'
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

                    }catch(error){
                        console.error(error)
                    }
                })
            }),
            // audioUpload: ((event)=>{
            //     formik.setFieldValue('audio',event.target.files[0])

            // })
            
        })
    


    
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

export default CreateUpload