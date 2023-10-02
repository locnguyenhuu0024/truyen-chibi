import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { RootStore, RootStoreContext } from './stores/index.ts';
import './index.css'
import { Analytics } from '@vercel/analytics/react';

const rootStore = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Router>
      <RootStoreContext.Provider value={rootStore}>
        <App />
      </RootStoreContext.Provider>
    </Router>
    <Analytics />
  </React.Fragment>,
)
