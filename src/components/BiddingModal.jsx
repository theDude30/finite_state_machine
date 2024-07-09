import React from 'react';
import {  Modal,Input,Steps,Button } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const STEPS=[
    {
      title: 'Login',
      status: 'finish',
      icon: <UserOutlined />,
    },
    {
      title: 'Payment Method',
      status: 'finish',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Place Bid',
      status: 'wait',
      icon: <LoadingOutlined />,
    },
    {
      title: 'Done',
      status: 'wait',
      icon: <SmileOutlined />,
    }
  ];


export default function BiddingModal(){
    return (
        <Modal title="Place Bid" open width={1000}>
            <Steps items={STEPS} />
            <p>Place your bid</p>
            <div style={{display:"flex"}}>
                <Input type='text' />
                <Button type="primary" style={{marginLeft:10}}>Place Bid</Button>
            </div>
    </Modal>
    )
}
