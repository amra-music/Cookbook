import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header/index';
import Routes from 'routing/Routes';
import Footer from 'components/Footer/index';

import 'App.css';

function App() {
  return (
    <div className='page-container'>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </div >);
}

export default App;
