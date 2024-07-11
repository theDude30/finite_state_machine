
import { Divider } from "antd";
import React from "react";


export default function AppHeader({signIn}) {
    const user = localStorage.getItem("userName")
    const onSignClick =(ev)=>{
        ev.preventDefault();
        signIn();
    }

        const header = (!user) ? <div style={{float:'left'}}><div>Hi! <a onClick={onSignClick}>Sign in</a> or <a onClick={onSignClick}>register</a></div></div> : <div style={{float:'left'}}><div>Welcome, {user}!</div></div>;


      return <div>{header} <Divider style={{position: 'relative',bottom: 20,borderColor:'lightgrey',borderWidth:'medium'}}/></div>;
}
