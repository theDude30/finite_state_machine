
import React from "react";


export default function AppHeader({signIn}) {
    const user = localStorage.getItem("userName")
    const onSignClick =(ev)=>{
        ev.preventDefault();
        signIn();
    }

    if (!user) {
        return <div style={{float:'left'}}><h3>Hi! <a onClick={onSignClick}>Sign in</a> or <a onClick={onSignClick}>register</a></h3></div>;
      }

      return <div style={{float:'left'}}><div>Welcome, {user}!</div></div>;
}
