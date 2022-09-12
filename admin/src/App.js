import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import React, { Fragment, useContext } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import { Movie } from "@mui/icons-material";
import NewMovie from "./pages/newMovie/NewMovie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
        {user && (
          <Fragment>
            <Route path="/users" element={<UserList />}></Route>
            <Route path="/user/:userId" element={<User />}></Route>
            <Route path="/newUser" element={<NewUser />}></Route>
            <Route path="/movies" element={<MovieList />}></Route>
            <Route path="/movie/:movieId" element={<Movie />}></Route>
            <Route path="/newMovie" element={<NewMovie />}></Route>
            <Route path="/lists" element={<ListList />}></Route>
            <Route path="/list/:listId" element={<List />}></Route>
            <Route path="/newlist" element={<NewList />}></Route>
          </Fragment>
        )}
      </Routes>
    </Router>
  );
}

export default App;
