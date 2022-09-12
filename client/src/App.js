import './App.scss';
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Home from "./pages/home/Home.js";
import Watch from "./pages/watch/Watch.js";
import Register from "./pages/register/Register.js";
import Login from "./pages/login/Login.js"
import { useContext } from 'react';
import { AuthContext } from "./authContext/AuthContext.js";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Navigate to="/register" />}></Route>
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />}></Route>
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}></Route>
        {user && (
          <>
            <Route path='/movies' element={<Home type='movies' />}></Route>
            <Route path='/series' element={<Home type='series' />}></Route>
            <Route path='/watch' element={<Watch />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
