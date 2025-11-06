import { useSelector } from "react-redux"
import Auth from "./navigator/auth/Auth"
import BottomTab from "./navigator/bottom/bottom"

const Main = () =>{
    const state = useSelector(state => state.auth.isLoggedIn)

return state ? <BottomTab/> :<Auth/>
}

export default Main