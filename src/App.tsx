// src/App.tsx
import React from 'react';
import { FloatButton, Layout } from 'antd';
import { HeaderMain } from './components/Header';
import { Footer } from 'antd/es/layout/layout';
import { BrightColorPalette as Palette } from './styles/palette';
import { IndexPage } from './pages';
import { observer } from 'mobx-react-lite';

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: Palette.Background
};

const App: React.FC = observer(() => {
  return (
    <div className='background'>
      <Layout>
        <HeaderMain />
        <IndexPage />
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
      <FloatButton.BackTop />
    </div>
  );
});

export default App;
