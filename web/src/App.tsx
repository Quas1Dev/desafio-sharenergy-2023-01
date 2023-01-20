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
  const [user, setUser] = useState<string>("");
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
  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          {userConfirmed && 
           <>
          <Route path="/randomuser" element={<RandomUser user={user} setUser={setUser} />} />
          <Route path="/httpimage" element={<HttpImage user={user} setUser={setUser} />} />
          <Route path="/randomdog" element={<RandomDog user={user} setUser={setUser} />} />
          <Route path="/clients" element={<Clients user={user} setUser={setUser} />} />
          </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
