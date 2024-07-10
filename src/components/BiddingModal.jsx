
import React,{useCallback, useEffect,useMemo} from 'react';
import {  Modal } from 'antd';
import useFSM from '../library/FSM';
import SignIn from './SignIn';
import AddPaymentMethod from './AddPaymentMethod';
import PlaceBidForm from './PlaceBidForm';
import BidProcessSteps from './BidProcessSteps';
import BidAccepted from './BidAccepted';


export default function BiddingModal(){

  let user = localStorage.getItem('user');
  let paymentMethod = localStorage.getItem('hasPayment');
  const conditions = useMemo(() => ({
    isNotLoggedIn: () => {
      user= localStorage.getItem('user');
      return !user
    },
    isLoggedIn: () => {
     user= localStorage.getItem('user');
     return !!user
    },
    hasPaymentMethods: () => {
      paymentMethod = localStorage.getItem('hasPayment')
      return paymentMethod?.length},
    hasNoPaymentMethods: () => {
      paymentMethod = localStorage.getItem('hasPayment')
      return !paymentMethod?.length},
    paymentFailed:() => paymentMethod === 'wrong',
    bidSucess:() =>Math.random()> 0.5,
    bidOutbidded: () => !conditions.bidSucess()
}), [user,paymentMethod]);

  const { state: currentState, transition, isLoading, error, getStateConfig, isInitialized } = useFSM('https://814bf7dff8994b558285e0fe209b494d.api.mockbin.io/',conditions);

  useEffect(() => {

    if(isInitialized && currentState === 'idle'){
      console.log('triggering bidding transition...')
      transition('bidding');
    }
  }, [currentState,transition]);

  const stateConfig = getStateConfig();
  console.log('Rendering state:', currentState);

  const handleLoginSuccess = useCallback(()=>{
    transition('loginSuccess')
  })

  const handleAddPayment = useCallback(()=>{
    transition('paymentMethodAdded')
  })

  const handlePlaceBid = useCallback(()=>transition('bidPlaced'));

  const renderBiddingState = () => {
    switch (currentState) {
      case 'checkingLogin':
        return <span>Checking Login ...</span>
      case 'login':
        return <SignIn onSucess={handleLoginSuccess}/>;
      case 'checkingPaymentMethods':
        return <div>checking payment methods...</div>;
      case 'addPaymentMethod':
        return <AddPaymentMethod onSuccess={handleAddPayment }  />;
      case 'placeBid':
        return <PlaceBidForm onSubmit={handlePlaceBid} />;
      case 'processingBid':
        return <div>Processing your bid...</div>;
      case 'bidAccepted':
        return <BidAccepted/>;
      case 'paymentError':
        return <div>There was an error processing your payment.</div>;
        case 'bidOutbidded':
        return <div> sorry you were outbidded</div>
      default:
        return <span>Unknown state {currentState}</span>;
    }
  };
    return (
        <Modal title="Place Bid" open width={1000}>
            <BidProcessSteps  currentState={currentState}/>
            <div style={{height:400,width:400}}>
            {renderBiddingState()}
            </div>
    </Modal>
    )
}
