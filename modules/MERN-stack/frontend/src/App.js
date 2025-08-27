import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
      
          <Routes>
            {/* <Route path='/' element={<div>hi</div>} /> */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
      
      <ToastContainer />
    </>
  );
}

export default App;
