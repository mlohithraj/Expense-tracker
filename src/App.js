import './App.css';
import { Route, Switch } from 'react-router-dom';
import Signup from './components/Signing/Signup';
import Login from './components/Signing/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signUp">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
