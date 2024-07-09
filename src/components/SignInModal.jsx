
import React from 'react';
import {  Modal } from 'antd';
import { UserContext } from './UserContext';


export default function SignInModal ({handleOk,handleCancel}) {
      const { user, setUser } = React.useContext(UserContext);
    const nameRef=React.useRef();
    const handleSubmit= () =>{
        setUser(nameRef.current.value)
        handleOk();
    }

  return (
      <Modal title="Sign In" open onOk={handleSubmit} onCancel={handleCancel} >
        <p>Enter your email and password to access your account.</p>
        <div>
            <span style={{marginRight:32}}>name</span>
            <input type='text' ref={nameRef} style={{paddindRight:10}}/>
        </div>
        <div>
            <span style={{marginRight:6}}>Password</span>
            <input type='password' />
        </div>
      </Modal>
  );
};
