import './App.css';
import SignUp from './signin/signup';
import app from './fireBase.js';
import MakeNavbar from './navigation/navbar';
import MakeHome from './home/home';
import MakeHomeNavigation from './home/homeNavigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
    return (
      <Router>
        <MakeNavbar/>
          <Switch>
            <Route path="/">
              <div className="p-12 flex">
                <MakeHomeNavigation></MakeHomeNavigation>
                <div className="p-14">
                  <MakeHome></MakeHome>
                </div>
              </div>
            </Route>
          </Switch>
      </Router>
    );
}

export default App;
