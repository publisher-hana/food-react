import React, {  useState } from 'react';
import './Header.scss';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SearchForm from './SearchForm';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);  // 사이드바를 닫기 위해 false로 설정
  };
  return (
    <>
      <header className='header'>
      <Navbar openSidebar={openSidebar} />
      <div className='header-content flex align-center justify-center flex-column text-center'>
        <SearchForm />
        <h1 className='text-white header-title ls-2'>What are you favorite cuisines?</h1>
        <p className='text-uppercase text-white my-3 ls-1'>Personalize your experience</p>
      </div>
      {/* <p style={{height:'800px'}}>this is dummy text</p> */}
    </header>
    <Sidebar  isOpen={isOpen} closeSidebar={closeSidebar}/>
  </>
  )
}

export default Header