import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewService from "./pages/newService/NewService";
import NewRoom from "./pages/newRoom/NewRoom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { userColumns, serviceColumns, roomColumns, reservationsColumn } from "./datatablesource";
import UpdateService from "./pages/updateService/UpdateService";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext)

    if(!user){
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} 
            />
            <Route path="users">
              <Route index element={
              <ProtectedRoute>
                <List columns = {userColumns}/>
              </ProtectedRoute>
            } />
              <Route path=":userId" element={<Single />} />
            </Route>
            <Route path="services">
              <Route index element={<List columns = {serviceColumns}/>} />
              <Route path=":serviceId" element={<Single />} />
              <Route
                path="new"
                element={<NewService />}
              />
              <Route
                path="update/:serviceId"
                element={<UpdateService />}
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List columns = {roomColumns}/>} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<NewRoom />}
              />
              <Route
                path="update/:roomId"
                element={<UpdateRoom />}
              />
            </Route>
            <Route path="reservations">
              <Route index element={<List columns = {reservationsColumn}/>} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<NewRoom />}
              />
              <Route
                path="update/:roomId"
                element={<UpdateRoom />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;