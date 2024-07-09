
import React from "react";
import { UserContext } from "./UserContext";


export default function AppHeader({userName,signIn}) {
    const {user , setUser} = React.useContext(UserContext);

    const onSignClick =(ev)=>{
        ev.preventDefault();
        signIn();
    }

    if (!user) {
        return <div style={{float:'left'}}><h3>Hi! <a onClick={onSignClick}>Sign in</a> or <a onClick={onSignClick}>register</a></h3></div>;
      }

      return <div style={{float:'left'}}><div>Welcome, {user}!</div></div>;
}
