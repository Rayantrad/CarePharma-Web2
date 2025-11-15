import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { IoCallOutline, IoPersonOutline, IoMenu, IoClose, IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import CartIcon from './CartIcon';
import { MdFavoriteBorder } from "react-icons/md";
import { UserContext } from "../Contexts/UserContext";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className='sticky top-0 z-50 bg-white'>
      {/* Top Bar - Free shipping message hidden on small screens */}
      <div className=" bg-black text-white py-1 ">
        <div className="container mx-auto flex justify-between items-center xs:px-1 sm:px-4 px-1">
          <div className="flex w-3xl justify-between lg:justify-start sm:gap-5 items-center">
            <div className="flex items-center gap-1">
              <IoCallOutline />
              <span className="text-xs">+1-202-555-0256</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineMail />
              <span className="text-xs">support@carepharma.com</span>
            </div>
          </div>
          <div className="hidden  justify-end lg:block">
            <span className="text-xs">Free shipping on orders over $50!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='container mx-auto xs:px-1 sm:px-4 px-1 '>
        <div className="my-2 flex justify-between items-center relative">
          {/* Logo and Name */}
          <div className="flex items-center border-none ">
            <NavLink to="/">
              <img src="/logo.avif" alt="CarePharma logo border-none" className="h-12 w-auto mr-2" />
            </NavLink>
            <div>
              <h1 className="text-lg font-bold">CarePharma</h1>
              <span className="text-xs block -mt-0.5 text-gray-400">
                Your Health Partner
              </span>
            </div>
          </div>

          <div className="hidden lg:flex gap-6 justify-center">
            {/* Desktop Navigation Links */}
            <div className="hidden xl:block">
              <div>
                <div className="flex gap-6 justify-center m-4">
                  <NavLink className={({ isActive }) => `text-sm font-medium hover:text-blue-600 transition-colors ${isActive ? "text-blue-600  font-bold underline" : "text-black"}`} to="/Products">Products</NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Icons and Burger Menu Button */}
          <div className="flex items-center gap-4">
            <div className="text-lg cursor-pointer hover:text-blue-600 transition-colors">
              {isAuth ? (
                <button onClick={handleLogout} title="Logout" className='text-xl items-center flex gap-1 cursor-pointer hover:text-blue-600 transition-colors'>
                  <IoLogOutOutline />
                </button>
              ) : (
                <NavLink to="/login" title="Login">
                  <IoPersonOutline />
                </NavLink>
              )}
            </div>
            <div className="text-lg cursor-pointer hover:text-pink-600 transition-colors">
              <NavLink to="/favourites">
                <MdFavoriteBorder />
              </NavLink>
            </div>
            <CartIcon />
            <button className="xl:hidden text-2xl transition-all duration-300 z-50" onClick={toggleMenu}>
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300" />

      {/* Mobile Menu - Sliding Overlay */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col p-6 pt-20">
          <NavLink className={({ isActive }) => `py-3 text-lg font-medium border-b border-gray-200 hover:text-blue-600 transition-colors ${isActive ? "text-blue-600 font-bold underline" : "text-gray-800"}`} to="/Products" onClick={toggleMenu}>Products</NavLink>
        </div>
      </div>

      {/* Overlay to close menu on click outside */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleMenu}></div>
      )}
    </div>
  );
};

export default Header;