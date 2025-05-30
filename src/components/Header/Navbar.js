import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {MdFoodBank} from 'react-icons/md';
import {IoMdMenu} from 'react-icons/io';

import "./Header.scss";
const Navbar = ({openSidebar} ) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    }else{
      setScrolled(false);
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
  })

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled': ""}`}>
      <div className='container w-100'>
        
            <div className='flex align-center justify-between text-white'>
                <Link to ="/" className="navbar-brand fw-3 fs-22 flex align-center">
                  <MdFoodBank />
                  <span className='navbar-brand-text fw-7'>FastEat.</span>
                </Link>
                <div className='navbar-btns flex align-center'>
                  <button type='button' className='text-white' onClick={openSidebar}>
                      <IoMdMenu size={27} />
                  </button>
                </div>
            </div>
        
      </div>
    </nav>
  )
}

export default Navbar