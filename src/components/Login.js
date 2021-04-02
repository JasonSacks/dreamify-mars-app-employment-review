import React, {useEffect, useState} from 'react';
import GoogleLogin from 'react-google-login'; 
import SystemActions from '../Redux/Actions/SystemActions';
import {connect} from 'react-redux'; 

const Login = ({isWorking, validateToken, displayOverlay, hideOverlay}) => {
    
    const [isAuthenticating, setIsAutenticating] = useState(false);
    
    const handleLogin = async (googleData) =>  {
        validateToken(googleData);
        hideOverlay();
    }
    const showOverlay = () => {
        setIsAutenticating(true);
        displayOverlay("Authenticating");
    }
    useEffect(() => {
       if (isWorking && !isAuthenticating){
            hideOverlay();
        }
    },[isWorking])
 
    return (
    <>< GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_SECRET}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        onRequest={showOverlay}
        cookiePolicy={'single_host_origin'}
    /></>
    )
}

function mapStateToProps (state) {
    return {
        isWorking : state.isWorking
    };
}

function mapDispatchToProps (dispatch) {
    return { 
        validateToken: SystemActions.logInAsync(dispatch),
        displayOverlay: SystemActions.displayOverlay(dispatch),
        hideOverlay: SystemActions.hideOverlay(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);