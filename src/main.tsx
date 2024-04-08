import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { WithStore } from './stores/WithStore.tsx';
import { PATHS } from './utils/PATHS.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WithStore>
      <Routes>
        <Route path={PATHS.auth} element={<Auth />} />

        <Route path={'/*'} element={<App />} />
      </Routes>
    </WithStore>
  </BrowserRouter>,
);
