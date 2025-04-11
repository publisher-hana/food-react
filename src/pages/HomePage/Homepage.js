import React, {useContext, useEffect} from 'react'
import { MealContext } from '../../context/mealContext';
import CategoryList from '../../components/Category/CategoryList'
import MealList from '../../components/Meal/MealList';
import NotFound from '../../components/NotFound/NotFound';
import useLoader from '../../hooks/usdeLoader';
import Loader from '../../components/Loader/Loader';

function HomePage() {
  const { loading, startLoading, stopLoading } = useLoader();
  const { categories, meals } = useContext(MealContext);
  console.log('meals:'+meals);

  useEffect(() => {
    startLoading();
    // 예시: API 호출 후 데이터를 가져온 다음 로딩 중지
    setTimeout(() => {  // 임시로 데이터가 로드된 후
      stopLoading();
    }, 2000);
  }, []);

  return (
    <div>
       {loading ? (
        <Loader /> // 로딩 중일 때 Loader 표시
      ) : (
        <>
          {/* meals가 null이면 NotFound, 그렇지 않으면 MealList 렌더링 */}
          {meals === null ? <NotFound /> : meals?.length ? <MealList meals={meals} /> : null}
          <CategoryList categories={categories} />
        </>
      )}
    </div>
  )
}

export default HomePage