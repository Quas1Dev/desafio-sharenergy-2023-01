import LoginForm from './components/LoginForm';
import RandomUser from './components/RandomUsers';
import HttpImage from './components/HttpImage';
import RandomDog from './components/RandomDog';
import Clients from './components/Clients';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/randomuser" element={<RandomUser/>}/>
          <Route path="/httpimage" element={<HttpImage/>}/>
          <Route path="/randomdog" element={<RandomDog/>}/>
          <Route path="/clients" element={<Clients/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
