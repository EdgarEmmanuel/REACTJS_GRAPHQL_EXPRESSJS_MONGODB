import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import HomePage from './components/Home_page';
import AuthenticationPage from './components/Authentication_page';
import BooksPage from './components/Books_page';
import EventsPage from './components/Events_page';
import SignupPage from './components/Signup_page';
import requireLogin from './_helpers/routeGuard';
import { GuardedRoute, GuardProvider } from 'react-router-guards';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/">
          <AuthenticationPage/>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/signup">
            <SignupPage/>
          </Route>
        </Switch>

        <GuardProvider guards={[requireLogin]}>
            <Switch>
              <GuardedRoute exact path="/home">
                <HomePage/>
              </GuardedRoute>
            </Switch>
            <Switch>
              <GuardedRoute exact path="/books">
                <BooksPage/>
              </GuardedRoute>
            </Switch>
            <Switch>
              <GuardedRoute exact path="/events">
                <EventsPage/>
              </GuardedRoute>
            </Switch>
        </GuardProvider>
      </Router>
    </div>
  );
}

export default App;
