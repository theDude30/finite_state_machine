
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Button, ConfigProvider, Flex, Layout } from 'antd';
import React,{useState} from 'react';
import AppHeader from '../components/AppHeader';
import Product from '../components/Product';
import AppFooter from '../components/AppFooter';
import {MOCK_PRODUCT} from '../mockProduct';
import SignInModal from '../components/SignInModal';
import { UserProvider } from '../components/UserContext';
import AddPaymentMethod from '../components/AddPaymentMethod';

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
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);


  const openSignInModal = () => {
    setIsSigninModalOpen(true);
  };
  const closeModal = () => {
    setIsSigninModalOpen(false);
  };

  const handleCancel = () => {
    setIsSigninModalOpen(false);
  };



  return (

      <ConfigProvider >
      <UserProvider>
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}><AppHeader signIn={openSignInModal} /></Header>
            <Content style={contentStyle}><Product product={MOCK_PRODUCT} /></Content>
            <Footer style={footerStyle}><AppFooter /></Footer>
          </Layout>
        </Flex>
        {isSigninModalOpen && <SignInModal handleCancel={handleCancel} handleOk={closeModal} />}
        </UserProvider>
      </ConfigProvider>
  );
}

export default App;
