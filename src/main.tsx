import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { WithStore } from './stores/WithStore.tsx';
import { PATHS } from './utils/PATHS.ts';
import { Toast } from './components/Toast';
import { AuthAdmin } from './pages/Auth/AuthAdmin.tsx';
import { App } from './App.tsx';
import { AuthEmployee } from './pages/Auth/AuthEmployee.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WithStore>
      <Routes>
        <Route path={PATHS.auth} element={<Auth />} />
        <Route path={PATHS.authAdmin} element={<AuthAdmin />} />
        <Route path={PATHS.authEmployee} element={<AuthEmployee />} />

        <Route path={'/*'} element={<App />} />
      </Routes>
      <Toast />
    </WithStore>
  </BrowserRouter>,
);
