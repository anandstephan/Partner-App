import { useSelector } from "react-redux"
import Auth from "./navigator/auth/Auth"
import BottomTab from "./navigator/bottom/bottom"
import { useCallback, useEffect, useState } from "react"
import Storage from "./utilites/storage"
    import YoutubeIframe, { PLAYER_STATES } from "react-native-youtube-iframe";
import { View } from "react-native"
const Main = () =>{

    const state = useSelector(state => state.auth.isLoggedIn)


    const [alreadyLoggedIn,setAlreadyLoggedIn] = useState(false)

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