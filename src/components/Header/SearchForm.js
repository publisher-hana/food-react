import React,  { useState, useContext }  from 'react'
import {BsSearch} from  "react-icons/bs";
import axios from '../../api/axios';
import { MealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const { updateMeals } = useContext(MealContext);  // Context에서 updateMeals 가져오기
  const [errorMsg, setErrorMsg]  = useState("");
  const navigate = useNavigate();

  const handleSearchTerm = (e) => {
    e.preventDefault();
    if((e.target.value.replace(/[^\w\s]/gi, "")).length !== 0){
      setSearchTerm(e.target.value);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid search term ...");
    }
  }
  

  const handleSearchResult = async (e) => {
    e.preventDefault();  // 폼 제출 기본 동작 방지
    navigate("/");

    try {
      const response = await axios.get(`search.php?s=${searchTerm}`);  // searchTerm 추가
      console.log("Search results:", response.data); 
      updateMeals(response.data.meals);  // 검색 결과를 Context에 저장
    } catch (error) {
      console.error("Error fetching search results:", error);  // 에러 처리
    }
  };

  return (
    <form className='search-form flex align-center' onSubmit={handleSearchResult}>
      <input type='text' className='form-control-input text-dark-gray fs-15' placeholder='Search recipes has ...'  onChange={handleSearchTerm}/>
      <button type='submit' className='form-submit-btn text-white text-uppercase fs-14'>
        <BsSearch className='btn-icon' size={20} />
      </button>
    </form>
  )
}

export default SearchForm