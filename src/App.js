import React, { Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Teams from './containers/Teams/Teams';
import Students from './containers/Students/Students';
import Dashboard from './components/Dashboard/Dashboard';

const app = props => {
  let routes = (
    <Switch>
      <Route path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route path='/students' render={props => <Students {...props} />} />
      <Route path='/teams' render={props => <Teams {...props} />} />
      <Route path='/' render={props => <Dashboard {...props} />} />
      <Redirect to='/' />
    </Switch>
  );
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(app);
