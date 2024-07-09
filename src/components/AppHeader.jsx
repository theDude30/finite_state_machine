

export default function AppHeader({userName,signIn}) {
    const onSignClick =(ev)=>{
        ev.preventDefault();
        signIn();
    }

    return <div style={{float:'left'}}>
        <h3>Hi! <a onClick={onSignClick}>Sign in</a> or <a onClick={onSignClick}>register</a></h3>
    </div>
}
