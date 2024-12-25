import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import PrivateRoute from "../utils/PrivateRoute";
import Unauthorized from "../utils/Unauthorized";
// import About from "../Pages/About/About";
import Layout from "../Pages/Layout";
import BestImgs from "../Pages/BestImg/BestImgs";
import KanbanPage from "../KanbanSection/KanbanPage";
// import Contacts from "../Pages/Contacts/Contacts";
import FavoriteImg from "../Pages/FavoriteImg/FavoriteImg";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}


const AppRouter = () => {
  return (
   <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
          <Route path="" element={<Layout/>} >
          <Route path="/" element={<Home/>}/>
          <Route path="/kanbanPage" element={<KanbanPage/>}/>
          <Route path="/bestimg" element ={<BestImgs/>}/>
          {/* <Route path="/contucts" element ={<Contacts/>}/> */}
          <Route path="/favoriteImg" element ={<FavoriteImg/>}/>

          <Route element={<PrivateRoute role={[ROLES.Admin]}/>} >
          
          </Route>

          {/* <Route path="aboutus" element={<About/>} /> */}
        </Route>
        
        <Route path="unauthorized" element={<Unauthorized/>}/>
   </Routes>
  )
};
 

export default AppRouter