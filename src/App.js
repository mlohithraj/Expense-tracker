
import './App.css';
import {
  Route,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './components/Signing/Signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/signUp'>
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
