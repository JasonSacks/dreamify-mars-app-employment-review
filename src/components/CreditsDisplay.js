import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CreditActions from '../Redux/Actions/CreditActions';

const CreditsDisplay = ({
    loadedDate,
    accountId, 
    token, 
    credits,
    getData}) => {

    useEffect( () => {
            const func = async () => await getData(accountId,token);
                func();
            },[loadedDate]);
    const style = {
        display:'flex', 
        alignContent:'center', 
        alignItems:'center', 
        paddingRight:'10px'
    };

    return (
        <span style={style} >Credits: {credits.value}</span>
    )
}

function mapStateToProps(state) {
    return { 
        credits: state.credits,
        token: state.token,
        accountId: state.account.accountId,
        loadedDate: state.creditsLoadedDate
     }
  }

function mapDispatchToProps (dispatch) {
    return { 
        getData : CreditActions.getDataAsync(dispatch)
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreditsDisplay);