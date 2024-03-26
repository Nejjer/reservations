import { Header } from "./components/Header";
import { RestaurantList } from "./pages/RestaurantList";

function App() {
  return (
    <>
      <Header />
      <div className={"space-x-6"} />
      <RestaurantList />
    </>
  );
}

export default App;
