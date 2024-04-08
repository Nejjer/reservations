import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { RestaurantList } from './pages/RestaurantList';
import { Restaurant } from './pages/Restaurant';
import { CreateEditRestaurant, EMode } from './pages/CreateEditRestaurant';
import { PATHS } from './utils/PATHS.ts';
import { WithStore } from './stores/WithStore.tsx';

function App() {
  return (
    <WithStore>
      <Header />
      <div className={'space-x-6'} />
      <Routes>
        <Route
          path='/admin/*'
          element={
            <Routes>
              <Route path='/*' element={<RestaurantList isAdmin />} />
              <Route path={'restaurant/:id'} element={<Restaurant isAdmin />} />
              <Route
                path={PATHS.restaurantEdit + '/:id'}
                element={<CreateEditRestaurant mode={EMode.Edit} />}
              />
              <Route
                path={PATHS.restaurantCreate}
                element={<CreateEditRestaurant mode={EMode.Create} />}
              />
            </Routes>
          }
        />

        <Route path='/*' element={<RestaurantList />} />
        <Route path={'restaurant/:id'} element={<Restaurant />} />
        <Route
          path={PATHS.restaurantEdit + '/:id'}
          element={<CreateEditRestaurant mode={EMode.Edit} />}
        />
        <Route
          path={PATHS.restaurantCreate}
          element={<CreateEditRestaurant mode={EMode.Create} />}
        />
      </Routes>
    </WithStore>
  );
}

export default App;
