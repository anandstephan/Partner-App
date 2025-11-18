import { useSelector } from "react-redux"
import Auth from "./navigator/auth/Auth"
import BottomTab from "./navigator/bottom/bottom"
import { useCallback, useEffect, useState } from "react"
import Storage from "./utilites/storage"
    import YoutubeIframe, { PLAYER_STATES } from "react-native-youtube-iframe";
import { View } from "react-native"
const Main = () =>{


const VideoPlayer = () => {
  const onStateChange = useCallback((state) => {
    console.log("YT State =>", state);

    if (state === PLAYER_STATES) {
      console.log("Video has finished!");
    }
  }, []);

  return (
    <View>
      <YoutubeIframe
        height={300}
        play={true}
        videoId="Q0Z6ry00"
        webViewProps={{
          injectedJavaScriptBeforeContentLoaded: `
            window.location.origin = 'https://example.com';
            true;
          `,
        }}
        onChangeState={onStateChange}
      />
    </View>
  );
};

// return <VideoPlayer/>
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