
import React from 'react';
import {  Modal,Input,Button, Form } from 'antd';
import { UserContext } from './UserContext';




export default function SignIn({onSucess}) {
    const nameRef=React.useRef();
    const handleSubmit= () => {
        localStorage.setItem("userName",nameRef.current.input.value)
        onSucess();
    }
    const user = localStorage.getItem("userName")

    if(user){
        return <span>Hi {user}, click next to continue <Button type='primary' onClick={onSucess}>Next</Button></span>
    }
  return (
        <div>
            <p>Enter your email and password to access your account.</p>
            <div>
                <span >name</span>
                <Input type='text' ref={nameRef} style={{paddindRight:10}}/>
            </div>
            <div>
                <span >Password</span>
                <Input type='password' />
            </div>
            <Button onClick={handleSubmit}>Login</Button>
        </div>
      );
};
