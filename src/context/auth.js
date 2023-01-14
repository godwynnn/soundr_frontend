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
import { useNavigate, useParams } from "react-router-dom";
// import '../css/index.css'





export  const Authenticate=()=>{

    const navigate=useNavigate()
    const [showPassword, setShowPassword] = React.useState(true);
    const login=document.querySelector('#login')
    const register=document.querySelector('#signup')
    const btn_box=document.querySelector('#btn_box')

    const handleClickShowPassword = () => setShowPassword(!showPassword);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function loginButton(){
        login.style.left='0%'
        register.style.left='100%'
        btn_box.style.left='0%'
        navigate(`/auth?login`)


    }
    function registerButton(){
        login.style.left='-100%'
        register.style.left='0%'
        btn_box.style.left='50%'
        navigate(`/auth?signup`)


    }

    return(
        <div className="auth_bg">
            <div className="auth_holder">
                <div className="auth_toggle">
                    <div className="btn_box" id="btn_box"></div>

                    <button onClick={loginButton}>Login</button>
                    <button onClick={registerButton}>Sign up</button>

                </div>
            <Box sx={{ display: 'flex', marginTop:'10%',flexDirection:'row',overflowX:'hidden'}}>
            
                <div className="login input-group" id="login">
                    <TextField 
                        fullWidth sx={{ width:'100% ' }}
                        // helperText="enter email"
                        id="outlined-error"
                        label="Email"
                        defaultValue=""
                        name="email"
                        type='email'
                        className="auth_input"
                        
                        
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

                        
                        
                       
                </div>


                <div className="signup input-group" id="signup">

                <TextField 
                        fullWidth sx={{ width:'100%', }}
                        // helperText="enter email"
                        id="outlined-error"
                        label="Email"
                        defaultValue=""
                        name="email"
                        type='email'
                        className="auth_input"
                        
                        
                        />


                <TextField 
                        fullWidth sx={{ width:'100%',marginTop:'5%' }}
                        // helperText="enter email"
                        id="outlined-error"
                        label="FirstName"
                        defaultValue=""
                        name="first_name"
                        type='text'
                        className="auth_input"
 
                        />


                    <TextField 
                        fullWidth sx={{ width:'100%',marginTop:'5%' }}
                        // helperText="enter email"
                        id="outlined-error"
                        label="LastName"
                        defaultValue=""
                        name="last_name"
                        type='text'
                        className="auth_input"

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

                        
                        
                       
                </div>
           
            </Box>
        </div>
        </div>
        // <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        // <OutlinedInput
        // fullWidth sx={{ width:'100% ' }}
        //     id="outlined-adornment-password"
            
        //     type={showPassword ? 'text' : 'password'}
        //     endAdornment={
        //     <InputAdornment position="end">
                
        //         <IconButton
        //         aria-label="toggle password visibility"
        //         onClick={handleClickShowPassword}
        //         onMouseDown={handleMouseDownPassword}
        //         edge="end"
                
           
        //         >
        //         {showPassword ? <VisibilityOff /> : <Visibility />}
        //         </IconButton>
        //     </InputAdornment>
        //     }
        //     label="Password"
        //     helperText="enter email"
        
    )
}

