import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { RestaurantList } from './pages/RestaurantList';
import { Restaurant } from './pages/Restaurant';
import { CreateEditRestaurant, EMode } from './pages/CreateEditRestaurant';
import { PATHS } from './utils/PATHS.ts';
import { Profile } from './pages/Profile';
import { BookList } from './pages/BookList';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { AppStoreContext, StoreCtx } from './stores/WithStore.tsx';
import { Role } from './stores/ProfileStore.ts';
import { EmployeeBookList } from './pages/EmployeeBookList';

const App = () => {
  const {
    appStore: { profileStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <>
      <Header />
      <div className={'space-x-6'} />
      <div className={'px-6'}>
        <Routes>
          {profileStore.role === Role.Employee && (
            <Route path={'/employee/booklist'} element={<EmployeeBookList />} />
          )}
          {profileStore.role === Role.Admin && (
            <Route
              path='/admin/*'
              element={
                <Routes>
                  <Route path='/*' element={<RestaurantList isAdmin />} />
                  <Route
                    path={'restaurant/:id'}
                    element={<Restaurant isAdmin />}
                  />
                  <Route
                    path={PATHS.restaurantEdit + '/:id'}
                    element={<CreateEditRestaurant mode={EMode.Edit} />}
                  />
                  <Route
                    path={PATHS.restaurantCreate}
                    element={<CreateEditRestaurant mode={EMode.Create} />}
                  />
                  <Route path={PATHS.bookList} element={<BookList />} />
                </Routes>
              }
            />
          )}

          <Route path='/*' element={<RestaurantList />} />
          <Route path={'restaurant/:id'} element={<Restaurant />} />
          <Route path={PATHS.profile} element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

const connected = observer(App);
export { connected as App };
