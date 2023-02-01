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
import { AudioFile } from "@mui/icons-material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';




const CreateUpload =()=>{

    const[song_genre,setSongGenre]=useState([])
    const [audio, setAudio] = useState('');
    const handleAudioUpload = event => {
        setAudio(event.target.files[0]);
        console.log(event.target.files)
        console.log(event.target.value)
    }

    const getSongGenre=async()=>{
        const res =await fetch('http://127.0.0.1:8000/create')
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
                
                const data={
                    artist_name:values.artist_name,
                    title:values.title,
                    audio: values.audio.name,
                    image:values.image.name,
                    description:values.description,
                    genre:values.genre,
                    
                    
                }

                console.log(data)
                fetch('http://127.0.0.1:8000/create',{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type": "application/json",
                        "Accept":"application/json"
                    },
                    
                }).then(res=>res.json())
                .then(data=>{
                    try{
                        console.log(data)
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

                        <TextField id="outlined-basic" className="description" label="Desciption" variant="outlined" rows={6} multiline />

                    </Box>
                    <br />

                <Button variant="contained" sx={{width:'30%'}} type='submit' >Submit</Button>
  

                
            </form>
                
            </div>
        )
    
}

export default CreateUpload