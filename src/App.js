import React from 'react';
import LayoutHeader from './layout/components/layout-header/index.jsx';
import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import MyHeader from './layout/components/layout-header/my-header.jsx';

import LayoutView from './layout/index.jsx';


const App = () => {

  return (
    <div>
      <Router>
        <GeneralProvider>
          <LayoutView />
        </GeneralProvider>
      </Router>
    </div>
  )
}

export default App;
