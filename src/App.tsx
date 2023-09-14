// src/App.tsx
import React from 'react';
import { FloatButton, Layout } from 'antd';
import { HeaderMain } from './components/Header';
import { IndexPage } from './pages';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

const App: React.FC = observer(() => {
  return (
    <div className='background'>
      <Helmet>
        <title>Chào mừng đến với Truyện Chibi! 🌟</title>
        <meta
          name="description"
          content="Truyện Chibi là nơi bạn sẽ khám phá thế giới truyện tranh dễ thương độc đáo, cùng những câu chuyện tuyệt vời. Với bộ sưu tập đa dạng và chất lượng, chúng tôi mang đến cho bạn những giây phút giải trí thú vị. Khám phá ngay và cùng chia sẻ niềm đam mê truyện tranh tại Truyện Chibi! 📚✨"
        />
        <meta name="google-adsense-account" content="ca-pub-5735107318391592" />
      </Helmet>
      <Layout>
        <HeaderMain />
        <IndexPage />
      </Layout>
      <FloatButton.BackTop />
    </div>
  );
});

export default App;
