import { Header } from './components/Header';
import { Restaurant } from './pages/Restaurant';

function App() {
  return (
    <>
      <Header />
      <div className={'space-x-6'} />
      <Restaurant />
    </>
  );
}

export default App;
