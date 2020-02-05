import React, { Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Teams from './containers/Teams/Teams';
import Students from './containers/Students/Students';

const app = props => {
  let routes = (
    <Switch>
      <Route path='/students' render={props => <Students {...props} />} />
      <Route path='/' render={props => <Teams {...props} />} />
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
