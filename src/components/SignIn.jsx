
import React from 'react';
import {Input,Button } from 'antd';




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
        <form onSubmit={handleSubmit}>
            <p>Enter your email and password to access your account.</p>
            <div>
                <span >name</span>
                <Input type='text' ref={nameRef} style={{paddindRight:10}}/>
            </div>
            <div>
                <span >Password</span>
                <Input type='password' />
            </div>
            <div style={{float:"right",paddingTop:20}}>
                <Button type="primary" htmlType="submit" >Login</Button>
            </div>
        </form>
      );
};
