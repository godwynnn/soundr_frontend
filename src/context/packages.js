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

const Packages=()=>{

    const[packages, setPackages]=useState([])
    const location=useLocation()
    const navigate=useNavigate()

    async function GetAllPackages(){
        const res= await fetch('http://127.0.0.1:8000/packages')

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
                    
                    <Link to={'/package/'+val.id}>
                    <Button   variant="contained">Select</Button >
                    
                    
                    </Link>
                        
                    


                </div>

            ))}

            </div>


        </div>
    )


}
export default Packages






export const PackageDetail=()=>{
    const param=useParams()
    const[packages, setPackage]=useState([])
    const[profile, setProfile]=useState([])
    const[Flw, setFlw]=useState({
        secret_key:'',
        public_key:'',
    })

    const[Pstack, setPstack]=useState({
        secret_key:'',
        public_key:'',
    })


    const token=localStorage.getItem('token')
    const location=useLocation()
    const navigate=useNavigate()

    const ref_id=Math.random().toString(36).slice(2);

    async function GetPackage(){
        const res= await fetch(`http://127.0.0.1:8000/packages?package_id=${param.packageId}`,{
            headers:{
                'Authorization':`Token ${token}`

            }
        })

        const data= await res.json()
        console.log(data)
        setPackage(data.package)
        setProfile(data.profile)
        setFlw({
            secret_key:data.flw_secret_key,
            public_key:data.flw_public_key
        })
        setPstack({
            secret_key:data.p_stack_secret_key,
            public_key:data.p_stack_public_key,
        })
    }

    useEffect(()=>{
        GetPackage()
    },[])

    

    // FLUTTERWAVE PAYMENT INTEGRATION
        const config = {
        public_key: Flw.public_key,
        tx_ref: `SDR-${ref_id}`,
        amount: packages.amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
        email: profile.email,
        phone_number: '',
        name: `${profile.first_name} ${profile.second_name}`,
        },
        customizations: {
        title: 'Soundr',
        description: 'Payment for soundr package',
        // logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    async function FlutterWavePayment(response){
        const res=await fetch(`http://127.0.0.1:8000/payment?type=flw&package_id=${packages.id}`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body:JSON.stringify(response)
        })
        const data= await res.json()

        try{
            console.log(data)
        }catch(err){
            console.log(err)
        }
        
    }

    // PAYSTACK PAYMENT INTEGRATION
    const pstack_config = {
        reference: `PS-${ref_id}`,
        email: profile.email,
        amount: 100*packages.amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: Pstack.public_key,
    };

    const initializePayment = usePaystackPayment(pstack_config)


    async function PaystackPayment(response){
        const res=await fetch(`http://127.0.0.1:8000/payment?type=paystack&package_id=${packages.id}`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body:JSON.stringify(response)
        })
        const data= await res.json()

        try{
            console.log(data)
        }catch(err){
            console.log(err)
        }
        
    }


    const onSuccess = (response) => {
        // Implementation for whatever you want to do with reference and after success call.
        // console.log(response);
        PaystackPayment(response)
      };


      const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        alert('paystack payment portal closed')
      }

    return(
        <div className="packages_landing">
        
        {JSON.parse(localStorage.getItem('logged_in'))?
            <div className="packages_holder">

            
            <div className="package_detail"  >
                <p>{packages.name}</p><br />
                <p>limit-{packages.limit} for ${packages.amount}</p><br /><br />

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo saepe enim quasi doloribus praesentium magni alias.</p>
                <br /><br />
                
               <br />



               <Button
               
               onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                    FlutterWavePayment(response)
                     console.log(response);
                      closePaymentModal() // this will close the modal programmatically
                  },
                  onClose: () => {
                    alert('flutterwave payment portal closed')
                  },
                });
              }}
               
               variant="contained">Pay With Flutterwave</Button >
               



                <br />
                <Button  
                 onClick={() => {
                    initializePayment(onSuccess, onClose)
                }}
                variant="contained">Pay With PayStack</Button >
            </div>

   

        </div>
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