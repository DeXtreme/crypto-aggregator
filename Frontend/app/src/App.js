import { useSelector } from 'react-redux';
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import logo from './logo.svg';
import './App.css';

function App() {
  let showLogin = useSelector(state => state.login);
  return (
    <div className="App">
      <Navbar />
      {showLogin && <Login />} 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
