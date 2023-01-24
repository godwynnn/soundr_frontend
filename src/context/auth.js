import React, {Component,useEffect,useState,useRef} from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../css/auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate, useParams,useLocation, json } from "react-router-dom";
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import { useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import SocialGoogleLoginFunc from "./googleauth";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
// import '../css/index.css'



export const AuthContext=React.createContext()

export  const Authenticate=()=>{

    const navigate=useNavigate()
    const [showPassword, setShowPassword] = React.useState(true);
    const [client_id,setClientId]=useState('')
    // const [codeResponse,setCodeResponse]=useState('')
    
    // const login=document.querySelector('#login')
    // const register=document.querySelector('#signup')
    // const btn_box=document.querySelector('#btn_box')
    const loginRef=React.createRef()
    const registerRef=React.createRef()
    const btn_boxRef=React.createRef()

    const {setIsLoggedIn,setUserData,isloggedIn,}=useContext(AuthContext)

    



    const location=useLocation()


    async function LoginInfo(){
        const response= await fetch('http://127.0.0.1:8000/auth/login')

        const data=await response.json()
        console.log(data)
        localStorage.setItem('g_client_id',data.g_client_id)
        
    }

    
        const GoogleLoginFunc = useGoogleLogin({
            flow: 'auth-code',
            onSuccess: async (codeResponse) => {
                console.log(codeResponse);
                
                // const tokens = await axios.post(
                //     'http://localhost:3000/auth/google', {
                //         code: codeResponse.code,
                //     });

                // console.log(tokens);
                SocialGoogleLoginFunc(codeResponse.code)
            },
            onError: errorResponse => console.log(errorResponse),
        });

    useEffect(()=>{
        LoginInfo()
    },[])

    // console.log(location)
    const loginformik=useFormik({
        initialValues:{
            // firstName:"",
            // lastName:"",
            email:"",
            password:"",   
        },
        validationSchema:Yup.object({
            email:Yup.string().email('invalid email address').required(),
            password:Yup.string().min(6,'password must be more than characters').required(),
        }),
        onSubmit:(values=>{
            fetch('http://127.0.0.1:8000/auth/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/form-data',
                  },
                  body: JSON.stringify(values)

            }).then(res=>res.json()).then(data=>{
                
                console.log(data)
                localStorage.setItem('token',data.token)
                localStorage.setItem('logged_in',true)
                setUserData(data.user)
                // setIsLoggedIn(true)
                if (localStorage.getItem('logged_in')){
                    setIsLoggedIn(true)
                    // Redirect back to previous location, or home
                    const { state } = location;
                    const { from } = state || { from: { pathname: "/" } };
                    navigate(from, { replace: true });
                }
            })
            
        })
    })

    const registerformik=useFormik({
        
        initialValues:{
            
            firstName:"",
            lastName:"",
            email:"",
            password:"",
           
        },
        validationSchema:Yup.object({
            firstName:Yup.string().required(),
            lastName:Yup.string().required(),
            email:Yup.string().email('invalid email address').required(),
            password:Yup.string().min(6,'password must be more than characters').required(),
        }),
    
        onSubmit:((values)=>{
            const user_data={
                first_name:values.firstName,
                last_name:values.lastName,
                email:values.email,
                password:values.password

            }
            console.log(values)
            fetch('http://127.0.0.1:8000/auth/register',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/form-data',
                  },
                  body: JSON.stringify(user_data)

            }).then(res=>res.json()).then(data=>console.log(data))
        }),
        

    })
    // console.log(registerformik.errors)


    const handleClickShowPassword = () => setShowPassword(!showPassword);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function loginButton(){
        loginRef.current.style.left='0%'
        registerRef.current.style.left='100%'
        btn_boxRef.current.style.left='0%'
        navigate(`/auth?login`)


    }
    function registerButton(){
        loginRef.current.style.left='-100%'
        registerRef.current.style.left='0%'
        btn_boxRef.current.style.left='50%'
        navigate(`/auth?signup`)


    }

    

    // const {loginButton,registerButton}=React.useContext(AuthContext)

    return(

<React.Fragment>
        
        
            <div className="auth_bg">
                <div className="auth_holder">
                    <div className="auth_toggle">
                        <div className="btn_box" id="btn_box" ref={btn_boxRef}></div>

                        <button onClick={loginButton} id='login_btnbox'>Login</button>
                        <button onClick={registerButton} id='register_btnbox'>Sign up</button>

                    </div>
                <Box sx={{ display: 'flex', marginTop:'10%',flexDirection:'row',overflowX:'hidden'}}>
                
                    <form className="login input-group" id="login" ref={loginRef} onSubmit={loginformik.handleSubmit}>
                        <TextField 
                            fullWidth sx={{ width:'100% ' }}
                            // helperText="enter email"
                            id="outlined-error"
                            label="Email"
                            defaultValue=""
                            name="email"
                            value={loginformik.values.email}
                            onChange={loginformik.handleChange}
                            onBlur={loginformik.handleBlur}
                            type='email'
                            className="auth_input"
                            error={loginformik.touched.email && loginformik.errors.email}
                            helperText={loginformik.touched.email && loginformik.errors.email }
           
                            /> 

                        <TextField 
                            fullWidth 
                            sx={{ width:'100% ',marginTop:'5% '  }}
                        
                            type='password'
                            // helperText="enter password"
                            id="outlined-error"
                            label="Password"
                            defaultValue=""
                            name="password"
                            className="auth_input"
                            value={loginformik.values.password}
                            onChange={loginformik.handleChange}
                            onBlur={loginformik.handleBlur}
                            error={loginformik.touched.password && loginformik.errors.password}
                            helperText={loginformik.touched.password && loginformik.errors.password }
                            // helperText={}
                            inputProps={{
                                endAdornment:(
                                        <InputAdornment position="end">
                                            
                                            <IconButton
                                            aria-label="toggle password"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            
                                    
                                            >
                                                <VisibilityIcon />
                                            {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                                            </IconButton>
                                        </InputAdornment>
                                ),
                            }}
                            
                            
                            />

                            
                            <Button variant="contained" type='submit' color="info" sx={{ width:'30% ', marginTop:'3%' }}>
                            Login
                            </Button>
                            <br />
                            <GoogleLogin
                                
                                onSuccess={GoogleLoginFunc}

                                // onSuccess={credentialResponse => {
                                //     console.log(credentialResponse.credential);
                                //     SocialGoogleLoginFunc(credentialResponse.credential)
                                //   }}


                                onError={() => {
                                    console.log('Login Failed');
                                }}

                                useOneTap
                                />;
                            
                            
                        
                    </form>


                    <form className="signup input-group" id="signup" ref={registerRef}  onSubmit={registerformik.handleSubmit}>

                    <TextField 
                            fullWidth sx={{ width:'100%', }}
                            // helperText="enter email"
                            id="email"
                            label="Email"
                            
                            name="email"
                            type='email'
                            className="auth_input"
                            value={registerformik.values.email}
                            onChange={registerformik.handleChange}
                            onBlur={registerformik.handleBlur}
                            error={registerformik.touched.email && registerformik.errors.email}
                            helperText={registerformik.touched.email && registerformik.errors.email }
                            
                            
                            />


                    <TextField 
                            fullWidth sx={{ width:'100%',marginTop:'5%', }}
                            // helperText="enter email"
                            id="firstName"
                            label="firstName"
                        
                            name="firstName"
                            type='text'
                            className="auth_input"
                            // defaultValue={registerformik.values.firstName}
                            value={registerformik.values.firstName}
                            onChange={registerformik.handleChange}
                            onBlur={registerformik.handleBlur}
                            error={registerformik.touched.firstName && registerformik.errors.firstName}
                            helperText={registerformik.touched.firstName && registerformik.errors.firstName }
    
                            />


                        <TextField 
                            fullWidth sx={{ width:'100%',marginTop:'5%' }}
                            // helperText="enter email"
                            id="lastName"
                            label="lastName"
                            // defaultValue=""
                            name="lastName"
                            type='text'
                            className="auth_input"
                            value={registerformik.values.lastName}
                            // defaultValue={registerformik.values.lastName}
                            onChange={registerformik.handleChange}
                            onBlur={registerformik.handleBlur}
                            error={registerformik.touched.lastName && registerformik.errors.lastName}
                            helperText={registerformik.touched.lastName && registerformik.errors.lastName }

                            /> 



                        <TextField 
                            fullWidth 
                            sx={{ width:'100% ',marginTop:'5% '  }}
                        
                            type='password'
                            // helperText="enter password"
                            id="password"
                            label="Password"
                            defaultValue=""
                            name="password"
                            className="auth_input"
                            value={registerformik.values.password}
                            onChange={registerformik.handleChange}
                            onBlur={registerformik.handleBlur}
                            error={registerformik.touched.password && registerformik.errors.password}
                            helperText={registerformik.touched.password && registerformik.errors.password }
                            inputProps={{
                                endAdornment:(
                                        <InputAdornment position="end">
                                            
                                            <IconButton
                                            aria-label="toggle password"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            
                                    
                                            >
                                                <VisibilityIcon />
                                            {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                                            </IconButton>
                                        </InputAdornment>
                                ),
                            }}
                            
                            
                            />

                            <Button variant="contained" type='submit' color="success" sx={{ width:'30% ', marginTop:'3%' }}>
                            Sign up
                            </Button>
                        
                            
                        
                    </form>
            
                </Box>
            </div>
            </div>
            
        
        
        </React.Fragment>
    
        
    )
}

