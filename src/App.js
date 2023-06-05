import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Main from "./components/main";

function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Main />}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
