import React from 'react';
import LayoutHeader from './layout/components/layout-header/index.jsx';
import GeneralProvider from './components/providers/generalProvider.jsx';

const App = () => {

  return (
    <div>
      <GeneralProvider>
        <LayoutHeader />
      </GeneralProvider>
    </div>
  )
}

export default App;
