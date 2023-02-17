import React,{useEffect, useState, useRef} from "react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import '../css/packages.css'
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal,useFlutterwave } from 'flutterwave-react-v3';
import { usePaystackPayment } from 'react-paystack';

const UserPackages=()=>{

    const[packages, setPackages]=useState([])
    const location=useLocation()
    const navigate=useNavigate()
    const token=localStorage.getItem('token')

    async function GetAllPackages(){
        const res= await fetch('http://127.0.0.1:8000/packages',{
            method:'GET',
            headers:{
                'Authorization':`Token ${token}`

            }
        })

        const data= await res.json()
        // console.log(data.packages)
        setPackages(data.packages)
    }

    useEffect(()=>{
        GetAllPackages()
    },[])

    console.log(packages)




    return(
        <div className="packages_landing">


            <div className="packages_holder">

            {packages.map((val,index)=>(
                <div className="packages"  key={index}>
                    <p>{val.name}</p><br />
                    <p>limt-{val.limit} for ${val.amount}</p><br /><br />

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo saepe enim quasi doloribus praesentium magni alias.</p>
                    <br />
                    
                    

                    {val.purchased?
                    <h4>Already purchased</h4>
                    :
                    
                    <Link to={'/package/'+val.id}>
                            <Button   variant="contained">Select</Button >
                    </Link>
                    }
                    
                    
                    
                   
                        
                    


                </div>

            ))}

            </div>


        </div>
    )


}
export default UserPackages
