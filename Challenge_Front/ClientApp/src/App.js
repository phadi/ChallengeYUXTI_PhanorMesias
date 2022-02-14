import React, { Component, useEffect, useState  } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BingSercher } from './components/Sercher/BingSercher';
import { LocationList } from './components/Locations/LocationList';
import axios from "axios";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/locationlist' component={LocationList} />
        <Route path='/sercher' component={BingSercher} />
      </Layout>
    );
  }
}
