import { Navigate, Outlet } from "react-router";
import { useChatContext } from "../context/ChatContext";


const ProtectedRoute =()=>{
    const {roomId, currentUser} = useChatContext();
    return roomId && currentUser ? <Outlet/> : <Navigate to="/" />;

};

export default ProtectedRoute;