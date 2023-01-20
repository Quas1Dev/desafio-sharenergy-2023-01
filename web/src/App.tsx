import Login from './components/Login';
import RandomUser from './components/RandomUsers';
import HttpImage from './components/HttpImage';
import RandomDog from './components/RandomDog';
import Clients from './components/Clients';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  // User id for checking login goes here.
  // Avoid using context.
  const [user, setUser] = useState<string>(JSON.stringify({ _id: null }));
  const [userConfirmed, setUserConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const response = await axios.get("http://localhost:3333/confirmUser/" + JSON.parse(user)._id);
      if (response.data._id) {
        setUserConfirmed(true);
      }
    }
    checkUser();
  }, [user])

  /* 
     This should make the user "always on" *1
   */
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log("Logged user:", loggedInUser);
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(JSON.stringify({ _id: null }));
    }
  }, [])

  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          {userConfirmed &&
            <>
              <Route path="/randomuser" element={<RandomUser />} />
              <Route path="/httpimage" element={<HttpImage />} />
              <Route path="/randomdog" element={<RandomDog />} />
              <Route path="/clients" element={<Clients />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

/*
*1 - If user has already logged in, and we saved its info
in the local storage, we retrieve the user's info to our
user state, which is used to decide whether we display 
this component or not.
*/