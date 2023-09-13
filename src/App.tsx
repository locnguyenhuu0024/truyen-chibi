// src/App.tsx
import React from 'react';
import { FloatButton, Layout } from 'antd';
import { HeaderMain } from './components/Header';
import { IndexPage } from './pages';
import { observer } from 'mobx-react-lite';

const App: React.FC = observer(() => {
  return (
    <div className='background'>
      <Layout>
        <HeaderMain />
        <IndexPage />
      </Layout>
      <FloatButton.BackTop />
    </div>
  );
});

export default App;
