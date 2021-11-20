import { useSelector } from 'react-redux';
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Slider from './components/slider/slider';
import Footer from './components/footer/footer';
import logo from './logo.svg';
import './App.css';


function App() {
  let showLogin = useSelector(state => state.login);
  return (
    <div className="App light">
      <Navbar />
      {showLogin && <Login />} 
      <Slider />
      <Footer />
    </div>
  );
}

export default App;
