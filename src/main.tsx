import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { RootStore, RootStoreContext } from './stores/index.ts';
import './index.css'

const rootStore = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <RootStoreContext.Provider value={rootStore}>
        <App />
      </RootStoreContext.Provider>
    </Router>
  </React.StrictMode>,
)
