import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Header from './pages/Header';
//import Cart from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About';
import Product from './pages/Product';
//import Checkout from './pages/Checkout';
import Footer from './pages/Footer';
//import AdminPanel from './pages/AdminPanel'; 
import OfficeChair from './pages/OfficeChair';
import BossChair from './pages/BossChair';
import DiningChair from './pages/DiningChair';
import StudyChair from './pages/StudyChair';
//import AdminLogin from './pages/AdminLogin';
import Faq from './pages/FAQs'; 
import HelpCenter from './pages/Helpcenter'; 

function AdminStateManager() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedAdmin = localStorage.getItem('isAdmin');
    setIsAdmin(storedAdmin === 'true');
  }, []);

  /*const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin/panel');
  }*/

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    navigate('/');
  };
  return (
    <div className="App">
        <Header isAdmin={isAdmin} onLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop isAdmin={isAdmin} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          {/*<Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/admin/panel" element={<AdminPanel isAdmin={isAdmin} />} />*/}
          <Route path="/office-chair" element={<OfficeChair isAdmin={isAdmin} />} />
          <Route path="/boss-chair" element={<BossChair isAdmin={isAdmin} />} />
          <Route path="/dining-chair" element={<DiningChair isAdmin={isAdmin} />} />
          <Route path="/study-chair" element={<StudyChair isAdmin={isAdmin} />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/help-center" element={<HelpCenter />} />
          {/*<Route path="/Cart" element={<Cart />} />*/}
          {/* <Route path="/checkout" element={<Checkout />} />
          You can add more routes here later */}
        </Routes>
        <Footer />
    </div>
  );
}
function App() {
  return (
    <div>
      <AdminStateManager />
    </div>
  );
}

export default App;
