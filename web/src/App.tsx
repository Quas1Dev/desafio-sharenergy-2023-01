import LoginForm from './components/LoginForm';
import RandomUser from './components/RandomUsers';
import HttpImage from './components/HttpImage';
import RandomDog from './components/RandomDog';
import Clients from './components/Clients';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// User id for checking login goes here.
// Avoid using context.
const [user, setUser] = useState<string>("");

function App() {
  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm user={user} setUser={setUser} />}/>
          <Route path="/randomuser" element={<RandomUser user={user}/>}/>
          <Route path="/httpimage" element={<HttpImage user={user}/>}/>
          <Route path="/randomdog" element={<RandomDog user={user}/>}/>
          <Route path="/clients" element={<Clients user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
