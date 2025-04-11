import { HashRouter as Router , Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { MealProvider } from './context/mealContext';
import HomePage from './pages/HomePage/Homepage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import MealDetailsPage from './pages/MealDetailsPage/MealDetailsPage';

function App() {
  return (
    <MealProvider>
      <Router>
        <Header />
        <Routes>  
          <Route path='/' element={<HomePage />} />
          <Route path='/meal/category/:name' element={<CategoryPage />}></Route>
          <Route path='/meal/:id' element={<MealDetailsPage />}></Route>
        </Routes>
      </Router>
    </MealProvider>
  );
}

export default App;
