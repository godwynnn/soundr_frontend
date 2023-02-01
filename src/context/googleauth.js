import { useContext } from "react";
import { AuthContext } from "./auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";




// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');




async function SocialGoogleLoginFunc (accesstoken){
    
    
   
        const response= await fetch('http://127.0.0.1:8000/auth/api/register-by-access-token/social/google-oauth2/',{
            method:"POST",
            body:   JSON.stringify({
                access_token:accesstoken
            }),
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"

            }
        })
        // const {data}=response
        const data=await response.json()
        console.log(data)
       localStorage.setItem('token',data.token)
        localStorage.setItem('logged_in',true)
        // setUserData(data.user)
        // if (localStorage.getItem('logged_in')){
        //     setIsLoggedIn(true)
        //     // Redirect back to previous location, or home
        //     const { state } = location;
        //     const { from } = state || { from: { pathname: "/" } };
        //     navigate(from, { replace: true });
        // } 
}

export default SocialGoogleLoginFunc