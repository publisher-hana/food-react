import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';  // axios 설정 파일

// MealContext 생성
export const MealContext = createContext();

// MealProvider 컴포넌트
export const MealProvider = ({ children }) => {
  console.log('mealprovider');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const updateMeals = (searchResults) => {
    setMeals(searchResults);
  };

  // API 호출 함수
  const handleLoad = async () => {
    try {
      const response = await axios.get('categories.php');
      setCategories(response.data.categories);
      const url = 'categories.php';  
      console.log(`api url : ${axios.defaults.baseURL}${url}`);
    } catch (error) {
      console.error("Error fetching categories:", error);  // 에러 처리
    }
  };

  useEffect(() => {
    handleLoad();  // 컴포넌트가 마운트되었을 때 API 호출
  }, []);

  
  return (
    <MealContext.Provider value={{ categories, meals, updateMeals  }}>
      {children}
    </MealContext.Provider>
  );
};