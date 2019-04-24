import React, { Component } from 'react';
import {LoginPage, SignUpPage, NotFoundPage, ProfilePage, AdminProfilePage} from './pages';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRouter from './router/PrivateRouter';
import AdminPrivateRouter from './router/AdminPrivateRouter';

class App extends Component {
  render() {
    return (
      <div>
        <Router basename="/panel">
          <Switch>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/login" component={LoginPage}/>            
            <PrivateRouter path="/profile" component={ProfilePage}/>
            <AdminPrivateRouter path="/adminprofile" component={AdminProfilePage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
