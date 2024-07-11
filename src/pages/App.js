
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ConfigProvider, Flex, Layout, Modal } from 'antd';
import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import Product from '../components/Product';
import AppFooter from '../components/AppFooter';
import {MOCK_PRODUCT} from '../mocks/mockProduct';
import BiddingModal from '../components/BiddingModal';
import SignIn from '../components/SignIn';

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  padding: 8
};
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 700,
  lineHeight: '120px'
};



const footerStyle: React.CSSProperties = {
  textAlign: 'left',
  width: "100%",
  padding:10
};

function App() {
  const [openBiddingModal,setOpenBiddingModal]= useState(false);
  const [openSignInModal,setOpenSignInModal] = useState(false);
  const onSigninClick = () =>{
    setOpenSignInModal(true);
  }
  const onSigninClose = () =>{
    setOpenSignInModal(false);
  }
  const onBidButtonClick = () =>{
    setOpenBiddingModal(true);
  }
  const onBiddingModalClose = () =>{
    setOpenBiddingModal(false);
  }
  return (
      <ConfigProvider>
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}><AppHeader signIn={onSigninClick}/></Header>
            <Content style={contentStyle}><Product product={MOCK_PRODUCT} onBidButtonClick={onBidButtonClick}/></Content>
            <Footer style={footerStyle}><AppFooter /></Footer>
          </Layout>
        </Flex>
        {openBiddingModal && <BiddingModal onClose={onBiddingModalClose}/>}
        {openSignInModal && <Modal open footer={null} onCancel={onSigninClose} ><div style={{height:200}}><SignIn onSucess={onSigninClose} /></div></Modal>}
      </ConfigProvider>
  );
}

export default App;
