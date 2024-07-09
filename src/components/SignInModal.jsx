
import React from 'react';
import {  Modal,Input } from 'antd';
import { UserContext } from './UserContext';




export default function SignInModal ({handleOk,handleCancel}) {
      const { user, setUser } = React.useContext(UserContext);
    const nameRef=React.useRef();
    const handleSubmit= () =>{
        setUser(nameRef.current.input.value)
        handleOk();
    }

  return (
      <Modal title="Sign In" open onOk={handleSubmit} onCancel={handleCancel} >
        <p>Enter your email and password to access your account.</p>
        <div>
            <span >name</span>
            <Input type='text' ref={nameRef} style={{paddindRight:10}}/>
        </div>
        <div>
            <span >Password</span>
            <Input type='password' />
        </div>
      </Modal>
  );
};
