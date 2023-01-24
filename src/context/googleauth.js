const SocialGoogleLoginFunc=(accesstoken,app_id,app_secret)=>{
    // console.log(`MY CREDENTIALS ${app_id},${app_secret}`)
    // let client_id='nILBGJCOSiaLKDyRZeFpHmUoyDw0PgChrkEGzjkj'
    // let client_secret='fkUSbr5mtR6oIX3osX51zS1ycbWOfNWGvEjhhKwVQvBb3rJ8gRN1BW2gkFMiPBfBKq3437IC3joXQUEFxPRs1PSXfSgKehOCwoRJoNgjtAzI6ZXwdjyX3RyZfTKKb8hE'

    // console.log(client_secret.includes(' '))
    // http://127.0.0.1:8000/client/auth/convert-token
    // grant_type:"convert_token",
    // client_id: client_id,
    // client_secret: client_secret,
    // backend:"google-oauth2", 
    // token:accesstoken
    // http://127.0.0.1:8000/
    fetch('http://127.0.0.1:8000/auth/api/register-by-access-token/social/google-oauth2/',{
       
        method: "POST",
        body: JSON.stringify({
            
            access_token:accesstoken

        }),
        headers: {
            "Content-Type": 'application/json;charset',
            "accept":'application/json;charset'

        }

    })
    .then(response=>{
        return response.json()
    }).then(data=>{
       try{
        console.log(data)
        localStorage.setItem('access_token',data.access_token)
        localStorage.setItem('refresh_token',data.refresh_token)
       }catch(error){
        console.log(error)
       }

    })
}

export default SocialGoogleLoginFunc