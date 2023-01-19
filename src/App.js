import { useContext,useState,useEffect, } from "react";
import {Routes,Route,Navigate} from "react-router-dom"
import Home from "./context/home";
import { Search } from "./context/home";

import { searchContext } from "./context/home";
import { useNavigate, useParams } from "react-router-dom";
import { Detail } from "./context/detail";
import { AuthContext } from "./context/auth";


function App() {
  // const {searched}=useContext(searchContext)
  const{ query }=useParams()
  const[searchInput,setSearchInput]=useState('')
  const[searchedPost,setSearchedPost]=useState([])
  const[searched,setSearched]=useState(false)
  const [user,setUserData]=useState(null)
  const [isloggedIn,setIsLoggedIn]=useState(false)

  const auth_data={
    user,
    setUserData,
    isloggedIn,
    setIsLoggedIn,
    // loginRef,
    // registerRef,
    // btn_boxRef,
    // loginButton,
    // registerButton,

}
  console.log(searched)

  return (

      <AuthContext.Provider value={auth_data}>


          
        <searchContext.Provider value={{searchInput,setSearchInput,setSearchedPost,searchedPost,setSearched,searched}} > 
        {/* <Routes>

          <Route path="/search=:query" element={<Search/>}/>
          <Route path="/"  element={<Home/>} />
          <Route path="/:id"  element={<Detail/>} />

        </Routes> */}
        <Home/>
        </searchContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
