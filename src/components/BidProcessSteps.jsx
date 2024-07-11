
import {Steps} from 'antd';
import { UserOutlined,LoadingOutlined,SolutionOutlined,DollarOutlined,SmileOutlined} from '@ant-design/icons';

const stateToStepIndex = {
    checkingLogin: 0,
    login: 0,
    checkingPaymentMethods: 1,
    addPaymentMethod: 1,
    placeBid: 2,
    processingBid: 2,
    bidAccepted: 3,
    paymentError: 3,
    bidOutbidded: 3
  };


export default function BidProcessSteps({currentState}) {
    const currentStep = stateToStepIndex[currentState]
    const steps = [
        {
          title: 'Login',
          status: currentStep > 0 ? 'finish' : currentStep === 0 ? 'process' : 'wait',
          icon: currentStep > 0 ? <UserOutlined /> : <LoadingOutlined />,
        },
        {
          title: 'Payment method',
          status: currentStep > 1 ? 'finish' : currentStep === 1 ? 'process' : 'wait',
          icon: currentStep > 1 ? <DollarOutlined /> : currentStep === 1 ? <LoadingOutlined /> : <DollarOutlined />,
        },
        {
            title: 'Place bid',
            status: currentStep > 2 ? 'finish' : currentStep === 2 ? 'process' : 'wait',
            icon: currentStep > 2 ? <DollarOutlined /> : currentStep === 2 ? <LoadingOutlined /> : <DollarOutlined />,
        },
        {
          title: 'Done',
          status: currentStep === 3 ? 'finish' : 'wait',
          icon: currentStep === 3 ? <SmileOutlined /> : <SmileOutlined />,
        },
      ];
      return <Steps items={steps} />
}
