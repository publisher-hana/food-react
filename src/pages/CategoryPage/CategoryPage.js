import React, {useContext, useEffect, useState} from 'react'
import { MealContext } from '../../context/mealContext';
import { useParams } from 'react-router-dom';
import MealList from '../../components/Meal/MealList';
import axios from '../../api/axios';

const CategoryPage = () => {
  const {name} = useParams();
  const { categories } = useContext(MealContext);
  const [categoryMeals, setCategoryMeals] = useState([]);
  let catDescription = "";

  if(categories){
    categories.forEach(category => {
      if(category?.strCategory === name) catDescription = category?.strCategoryDescription;
    })
  }

  const handleLoad = async () => {
    try {
      const response = await axios.get(`filter.php?c=${name}`);
      setCategoryMeals(response.data.meals);
      const url = `filter.php?c=${name}`;  
      console.log(`page api url : ${axios.defaults.baseURL}${url}`);
    } catch (error) {
      console.error("Error fetching categories:", error);  // 에러 처리
    }
  };
  
  useEffect(() => {
    handleLoad();  // 컴포넌트가 마운트되었을 때 API 호출
  }, [name]);
  return (
    <main className='main-content py-5'>
      <div className='container'>
        <div className='cat-description px-4 py-4'>
          <h2 className='text-orange fw-8'>{name}</h2>
          <p className='fs-18 op-07'>{catDescription}</p>
          {
             (categoryMeals?.length) ? <MealList meals = { categoryMeals } /> : null
          }
        </div>
      </div>
      
    </main>
  )
}

export default CategoryPage
