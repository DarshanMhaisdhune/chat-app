import { Route, Routes } from "react-router"
import App from "../App"
import ChatPage from "../components/ChatPage"
import ProtectedRoute from "../components/ProtectedRoute"

 const AppRoutes= ()=>{
    return(
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/chat" element={<ProtectedRoute/>}>
                <Route path="/chat" element={<ChatPage/>} />
            </Route>
        </Routes>
    )
 }

    export default AppRoutes