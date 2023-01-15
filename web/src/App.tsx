import LoginForm from './components/LoginForm';
import RandomUser from './components/RandomUsers';
import HttpImage from './components/HttpImage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/randomuser" element={<RandomUser/>}/>
          <Route path="/httpimage" element={<HttpImage/>}/>
          <Route path="/randomDogs" element={<LoginForm/>}/>
          <Route path="/customers" element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
