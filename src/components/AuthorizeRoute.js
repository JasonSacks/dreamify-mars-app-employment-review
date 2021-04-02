import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const AuthorizeRoute = ({token, component: Component, ...rest}) => {
  
return (
    <Route {...rest} render={(props) => (
        token.length > 0
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
  );
}

function mapStateToProps(state) {
    return { 
        token: state.token     
        }
}

function mapDispatchToProps (dispatch) {
    return { 
        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizeRoute);