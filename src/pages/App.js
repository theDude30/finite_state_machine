
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ConfigProvider, Flex, Layout } from 'antd';
import React from 'react';
import AppHeader from '../components/AppHeader';
import Product from '../components/Product';
import AppFooter from '../components/AppFooter';
import {MOCK_PRODUCT} from '../mocks/mockProduct';
import BiddingModal from '../components/BiddingModal';

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  padding: 8
};
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 800,
  lineHeight: '120px'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'left',
  width: "100%",
  padding:10
};

function App() {

  return (
      <ConfigProvider >
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}><AppHeader /></Header>
            <Content style={contentStyle}><Product product={MOCK_PRODUCT} /></Content>
            <Footer style={footerStyle}><AppFooter /></Footer>
          </Layout>
        </Flex>
        <BiddingModal />
      </ConfigProvider>
  );
}

export default App;
