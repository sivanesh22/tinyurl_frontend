import './App.css';
import Login from './screens/Login';
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
