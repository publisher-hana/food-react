import React, {useContext} from 'react'
import {ImCancelCircle} from "react-icons/im"
import "./Header.scss";
import { Link } from 'react-router-dom';
import { MealContext } from '../../context/mealContext';

function Sidebar({isOpen, closeSidebar }) {
  const {categories} = useContext(MealContext);
 
  return (
    <div className={`sidebar  ${isOpen ? 'sidebar-visible' : ""}`}>
        <button type='button' className='navbar-hide-btn' onClick={closeSidebar}>
          <ImCancelCircle size = {24} />
        </button>
        <div className='side-content'>
          <ul className='side-nav'>
            {
              categories.map(category =>(
                
                <li className='side-item' key={category.idCategory}>
                  <Link to ={`/meal/category/${category.strCategory}`} className='side-link ls-1 fs-13' onClick={()=>closeSidebar}>
                    {category.strCategory}
                  </Link>

                </li>
              ))
            }
          </ul>
        </div>
    </div>
  )
}

export default Sidebar