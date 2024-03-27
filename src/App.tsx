import { Header } from './components/Header';
import { CreateEditRestaurant } from './pages/CreateEditRestaurant';

function App() {
  return (
    <>
      <Header />
      <div className={'space-x-6'} />
      <CreateEditRestaurant />
    </>
  );
}

export default App;
