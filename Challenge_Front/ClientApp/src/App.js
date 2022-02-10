import React, { Component, useEffect, useState  } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { BingSercher } from './components/Sercher/BingSercher';
import axios from "axios";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/sercher' component={BingSercher} />
      </Layout>
    );
  }
}
