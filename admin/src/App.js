import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ViewUser from "./pages/viewUser/ViewUser";
// import NewService from "./pages/newService/NewService";
import NewRoom from "./pages/rooms/newRoom/NewRoom";
import { Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {
  userColumns,
  roomColumns,
  reservationsColumn,
} from "./datatablesource";
import UpdateRoom from "./pages/rooms/updateRooms/UpdateRoom";
import UpdateReservation from "./pages/reservation/UpdateReservation";
import ViewRoom from "./pages/rooms/viewRoom/ViewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/">
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route index element={user ? <Home /> : <Login />} />
          <Route path="users">
            <Route
              index
              element={user ? <List columns={userColumns} /> : <Login />}
            />
            <Route
              path="view/:userId"
              element={user ? <ViewUser /> : <Login />}
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={user ? <List columns={roomColumns} /> : <Login />}
            />
            <Route
              path="view/:roomId"
              element={user ? <ViewRoom /> : <Login />}
            />
            <Route path="new" element={user ? <NewRoom /> : <Login />} />
            <Route
              path="update/:roomId"
              element={user ? <UpdateRoom /> : <Login />}
            />
          </Route>
          <Route path="reservations">
            <Route
              index
              element={user ? <List columns={reservationsColumn} /> : <Login />}
            />
            <Route
              path="update/:reservationId"
              element={user ? <UpdateReservation /> : <Login />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
