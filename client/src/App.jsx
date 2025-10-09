import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Verify from './pages/Verify';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PlusSuccess from "./pages/PlusSuccess.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Import context to access token
import { ShopContext } from './context/ShopContext';

const App = () => {
  const location = useLocation();
  const { token } = useContext(ShopContext); // ✅ Get token from context

  // ✅ Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/login', '/forgot-password', '/reset-password'];
  const shouldHideLayout = hideLayoutRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />

      {/* ✅ Hide Navbar on login/forgot-password */}
      {!shouldHideLayout && <Navbar />}

      {/* ✅ SearchBar always visible */}
      <SearchBar />

      <Routes>
        {/* ✅ When user visits '/', check login state:
            - if logged in -> show Home
            - if not logged in -> redirect to /login */}
        <Route
          path='/'
          element={token ? <Home /> : <Navigate to='/login' replace />}
        />

        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/plus-success' element={<PlusSuccess />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>

      {/* ✅ Hide Footer on login/forgot-password */}
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default App;
