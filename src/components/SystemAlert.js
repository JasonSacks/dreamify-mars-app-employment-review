import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import SystemActions from '../Redux/Actions/SystemActions'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SystemAlert = ({alert, setAlert}) => {
  const [open, setOpen] = useState( alert != null && alert.length > 0);

  const handleClose = () => {
    setOpen(false); 
    setAlert('');
  };
  useEffect(() => {
      setOpen(alert != null && alert.length > 0);
  },[alert])
  
  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >{"Alert:"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
function mapStateToProps(state) {
  return { 
      alert: state.alert    
    }
}

function mapDispatchToProps (dispatch) {
  return { 
      setAlert: SystemActions.setAlert(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemAlert);