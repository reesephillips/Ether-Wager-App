
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterApp from './compononents/EnterApp';
import BetPage from './compononents/BetPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<EnterApp />}/>
          <Route path = "/betpage" element = {<BetPage />}/>
        </Routes>
      </Router>
    </>      
  );
}

export default App;
