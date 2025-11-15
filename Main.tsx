import { useSelector } from "react-redux"
import Auth from "./navigator/auth/Auth"
import BottomTab from "./navigator/bottom/bottom"
import { useEffect, useState } from "react"
import Storage from "./utilites/storage"

const Main = () =>{
    const state = useSelector(state => state.auth.isLoggedIn)

    console.log("State",state)    
    const [alreadyLoggedIn,setAlreadyLoggedIn] = useState(false)
    console.log("alreadyLoggedIn",alreadyLoggedIn)
    useEffect(() => {
          (  async function getToken() {
                const token = await Storage.getItem("token")
                console.log("Token",token)
                if(token){
                    setAlreadyLoggedIn(true)
                }else{
                    setAlreadyLoggedIn(false)
                }
            })()
    },[state])
return (alreadyLoggedIn || state) ? <BottomTab/> :<Auth/>
}

export default Main