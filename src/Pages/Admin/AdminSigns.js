import React from 'react';
import SignsAdd from '../../Components/Signs-Add';
import SignsEdit from '../../Components/Signs-Edit';
import SignsDelete from '../../Components/Signs-Delete';
import SignsNav from '../../Components/SignsNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AdminSigns = () => {
  return (
    <Router>
      <SignsNav />
      <Switch>
        <Route path='/Components/Signs-Add' exact component={SignsAdd} />
        <Route path='/Components/Signs-Edit' component={SignsEdit} />
        <Route path='/Components/Signs-Delete' component={SignsDelete} />
      </Switch>
    </Router>
  );
};

export default AdminSigns;