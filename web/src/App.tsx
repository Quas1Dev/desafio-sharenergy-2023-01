import LoginForm from './components/loginform';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="page_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/randomuser" element={<LoginForm/>}/>
          <Route path="/httpimage" element={<LoginForm/>}/>
          <Route path="/randomDogs" element={<LoginForm/>}/>
          <Route path="/customers" element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
