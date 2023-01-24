import Login from './components/Login';
import RandomUser from './components/RandomUsers';
import HttpImage from './components/HttpImage';
import RandomDog from './components/RandomDog';
import Clients from './components/Clients';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import api from './axiosInstance';
import ProtectedRoute from './components/utils-components/ProtectedComponents';
import { UserInterface } from './interfaces/GlobalInterface';

function App() {
  // User id for checking login goes here.
  const [user, setUser] = useState<string>(JSON.stringify({ _id: null }));

  // This should make the user "always on" *1
  useEffect(() => {
    const loadAndCheckUser = async () => {
      let storedUser : UserInterface = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem('user') || "{'_id': null }");
      const response = await api.get<UserInterface>("/confirmUser/" + storedUser._id);

      if (response.data._id) setUser(JSON.stringify(storedUser));
    }

    loadAndCheckUser();
  }, [])

  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login user={user} setUser={setUser} />} />
          <Route element={<ProtectedRoute user={JSON.parse(user)} redirectPath="/" />}>
            <Route path="/randomuser" element={<RandomUser />} />
            <Route path="/httpimage" element={<HttpImage />} />
            <Route path="/randomdog" element={<RandomDog />} />
            <Route path="/clients" element={<Clients />} />
          </Route>
          <Route path="*" element={<p>Nada por aqui: 404</p>} />
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