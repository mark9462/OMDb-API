import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import home from './views/home';
import search from './views/search';
import item from './views/item';
import './scss/main.scss';

render(
  <Router>
    <Route path="/" exact component={home} />
    <Route path="/search" component={search} />
    <Route path="/item" component={item} />
  </Router>,
  document.getElementById('app')
);
