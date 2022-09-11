import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeList from './pages/HomeList';
import Details from './pages/Details';
import {HeritageListContextProvider} from "./context/heritageListContext"
import Header from './components/Header';

function App() {
 
  return (
    <div className="container">
      <HeritageListContextProvider>
      <BrowserRouter>
       <Header />
        <Routes>
          <Route path="/" element={<HomeList />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
      </HeritageListContextProvider>
    </div>
  );
}

export default App;
