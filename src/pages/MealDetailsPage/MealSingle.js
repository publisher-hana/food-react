import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from '../../api/axios';
import "./Meal.scss";
import { AiFillHome } from "react-icons/ai";
import { FaUtensilSpoon } from "react-icons/fa";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineCheckSquare } from 'react-icons/ai';

function MealSingle() {
  const {id} = useParams();
  const [detailMeals, setDetailMeals] = useState([]);
  let ingredientsArr = [], measuresArr = [], meal = {};

  const handleLoad = async () => {
    try {
      const response = await axios.get(`lookup.php?i=${id}`);
      setDetailMeals(response.data.meals);
      const url = `/lookup.php?i=${id}`
      console.log(`api url : ${axios.defaults.baseURL}${url}`);
      console.log(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching categories:", error);  // 에러 처리
    }
  };

  useEffect(() => {
    handleLoad();  // 컴포넌트가 마운트되었을 때 API 호출
  }, [id]);
  
  if (!detailMeals) return <p>Loading...</p>; 
  if(detailMeals && detailMeals?.length > 0){
    for(let props in detailMeals[0]){
      if(props.includes('strIngredient')){
        if(detailMeals[0][props]) ingredientsArr.push(detailMeals[0][props]);
      }

      if(props.includes('strMeasure')){
        if(detailMeals[0][props]){
          if(detailMeals[0][props].length > 1){
            measuresArr.push(detailMeals[0][props]);
          }
        }
      }
    }

   meal = {
      id: detailMeals[0]?.idMeal,
      title: detailMeals[0]?.strMeal,
      category: detailMeals[0]?.strCategory,
      area: detailMeals[0]?.strArea,
      thumbnail: detailMeals[0]?.strMealThumb,
      instructions: detailMeals[0]?.strInstructions,
      source: detailMeals[0]?.strSource,
      tags: detailMeals[0]?.strTags,
      youtube: detailMeals[0]?.strYoutube,
      ingredients: ingredientsArr,
      measures: measuresArr
    }
  }
  let tags = meal?.tags?.split(',');
  let instructions = meal?.instructions?.split('\r\n');
  instructions = instructions?.filter(instruction => instruction.length > 1);
  
  return (
    <div className='section-wrapper'>
      <div className='container'>
        <div className='breadcrumb bg-orange text-white'>
          <ul className='flex align-center my-2'>
            <li className='breadcrumb-item'>
              <Link to = "/" className='flex align-center'>
                <AiFillHome size = {22} />
              </Link>
            </li>
            <li className='flex align-center mx-1'>
              <BiChevronsRight size = {23} />
            </li>
            <li className='breadcrumb-item flex'>
              <span to = "" className='fs-15 fw-5 text-uppercase'>{meal?.title}</span>
            </li>
          </ul>
        </div>
        <div className='sc-title'>Meal Details</div>
        <section className='sc-details bg-white'>
          <div className='details-head grid'>
            <div className='details-img'>
              <img src = {meal?.thumbnail} alt = "" className='img-cover' />
            </div>
            <div className='details-intro'>
              <h3 className='title text-oran`ge'>{meal?.title}</h3>
              <div className='py-4'>
                <div className='category flex align-center'>
                  <span className='text-uppercase fw-8 ls-1 my-1'>category: &nbsp;</span>
                  <span className='text-uppercase ls-2'>{ meal?.category }</span>
                </div>
                <div className='source flex align-center'>
                  <span className='fw-7'>Source: &nbsp;</span>
                  <a href = {meal.source}>
                    {meal.source ? (meal?.source).substring(0, 40) + "..." : "Not found" }
                  </a>
                </div>
              </div>
              <div className='tags flex align-start flex-wrap'>
                <h6 className='fs-16'>Tags:</h6>
                  <ul className='flex align-center flex-wrap'>
                    {
                      tags?.map((tag, idx) => (<li key = {idx} className = "fs-14">{tag}</li>))
                    }
                  </ul>
              </div>
              <div className='ingredients my-5 px-3 py-3'>
                <h6 className='fs-16 text-white'>Ingredients</h6>
                <ul className='grid'>
                  {
                    meal?.ingredients?.map((ingredient, idx) => (
                      <li key = {idx} className = "flex align-center">
                        <span className='li-dot'>{idx + 1}</span>
                        <span className='text-capitalize text-white fs-15'>{ingredient}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className='details-body'>
            <div className='measures my-4'>
              <h6 className='fs-16'>Measure:</h6>
              <ul className='grid'>
                {
                  meal?.measures?.map((measure, idx) => (
                    <li key = {idx} className = "fs-14 flex align-end">
                      <span className='li-icon fs-12 text-orange'>
                        <FaUtensilSpoon />
                      </span>
                      <span className='li-text fs-15 fw-6 op-09'>{measure}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='instructions my-4'>
              <h6 className='fs-16'>Instructions:</h6>
              <ul className='grid'>
                {
                  instructions?.map((instruction, idx) => (
                    <li key = {idx} className = "fs-14">
                      <AiOutlineCheckSquare size = {18} className = "text-orange li-icon" />
                      <span className='li-text fs-16 fw-5 op-09'>{instruction}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MealSingle