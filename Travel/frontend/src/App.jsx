
import { Navbar, Searchbar, Details, Footer } from "./components/index";

function App() {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Searchbar />
        <Details />
      </div>
      <div className="h-96 "></div>
      <div className="h-40 "></div>
      <Footer />
    </div>
  );
}

export default App;
