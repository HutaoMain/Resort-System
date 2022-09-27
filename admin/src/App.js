import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewService from "./pages/newService/NewService";
import NewRoom from "./pages/newRoom/NewRoom";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {
  userColumns,
  serviceColumns,
  roomColumns,
  reservationsColumn,
} from "./datatablesource";
import UpdateService from "./pages/updateService/UpdateService";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      navigate("/login", { replace: true });
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":userId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="services">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={serviceColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":serviceId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewService />
                </ProtectedRoute>
              }
            />
            <Route
              path="update/:serviceId"
              element={
                <ProtectedRoute>
                  <UpdateService />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":productId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="update/:roomId"
              element={
                <ProtectedRoute>
                  <UpdateRoom />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="reservations">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={reservationsColumn} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":productId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="update/:roomId"
              element={
                <ProtectedRoute>
                  <UpdateRoom />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
