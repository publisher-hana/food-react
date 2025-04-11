import React, {useEffect }  from 'react';
import MealSingle from './MealSingle';
import Loader from '../../components/Loader/Loader';
import useLoader from '../../hooks/usdeLoader';


const MealDetailsPage = () => {
  const { loading, startLoading, stopLoading } = useLoader();
  useEffect(() => {
    startLoading(); // 로딩 시작
    // 데이터 로드 시 로딩 중지  (MealSingle 컴포넌트에서 데이터를 로드한 후 stopLoading 호출)
    stopLoading();
  }, []);

  return (
  <main className='main-content bg-whitesmoke'>
     {loading && <Loader />} {/* 로딩 중일 때만 Loader 컴포넌트 표시 */}
    <MealSingle />
   </main>
  )
}

export default MealDetailsPage
