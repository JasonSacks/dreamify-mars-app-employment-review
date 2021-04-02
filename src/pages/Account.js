import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import AccountActions from '../Redux/Actions/AccountActions'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CreditsDisplay from '../components/CreditsDisplay';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '800px',
    padding: '30px'
  },
}));

const Account = ({
  isLoaded,
  account, 
  token, 
  getAccount,  
  updateAccount, 
  setValue,
  setIsLoaded}) => {
  const classes = useStyles();
  
const onSubmit = (e) => {
  const func = async () => await updateAccount(account, token);
  func();
  e.preventDefault();
}

useEffect(() => {
      document.title = "Dreamify Mars - Account";
      if (!isLoaded){
        setIsLoaded(true);
        const func = async () =>  
        await getAccount(account.accountId, token);
        func();
      }
    },[]);
    
  return (
    <form className={classes.root} onSubmit={onSubmit} autoComplete="on" >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField disabled label="Email" value={account.email || '' } onChange={ (e) => setValue({...account, email: e.target.value})}/>
        </Grid>
        <Grid item xs={6}>
          <CreditsDisplay />
        </Grid>
        <Grid item xs={6}>
          <TextField required label="First Name" value={account.firstName || ''} onChange={ (e) => setValue({...account, firstName: e.target.value})}/>
        </Grid>
        <Grid item xs={6}>
          <TextField required label="Last Name" value={account.lastName|| ''} onChange={ (e) => setValue({...account, lastName: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Address Line 1" value={account.address1 || ''} onChange={ (e) => setValue({...account, address1: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Address Line 2" value={account.address2 || ''} onChange={ (e) => setValue({...account, address2: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="City" value={account.city || ''} onChange={ (e) => setValue({...account, city: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="State/Province" value={account.state || ''} onChange={ (e) => setValue({...account, state: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Postal Code" value={account.postalCode || ''} onChange={ (e) => setValue({...account, postalCode: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Country" value={account.country || ''} onChange={ (e) => setValue({...account, country: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Phone Number" value={account.phoneNumber || ''} onChange={ (e) => setValue({...account, phoneNumber: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="outlined">Save</Button>
        </Grid>
      </Grid>
    </form>
  );
}

function mapStateToProps(state) {
    return { 
        account: state.account,
        token: state.token,
        isLoaded: state.accountLoaded     
     }
  }

  function mapDispatchToProps (dispatch) {
    return { 
        updateAccount: AccountActions.updateAccount(dispatch),
        getAccount: AccountActions.getAccount(dispatch),
        setValue: AccountActions.setValue(dispatch),
        setIsLoaded: AccountActions.setIsLoaded(dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account);