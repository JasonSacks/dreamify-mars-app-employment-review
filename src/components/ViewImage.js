import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ViewImage = ({dreamImagePath, onClose}) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };
    useEffect(()=>{
        if (dreamImagePath === undefined) return;
            setOpen(dreamImagePath.length > 0);
        },[dreamImagePath]);

    return (
        <Dialog fullScreen={true} onClose={handleClose} open={open}>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Close
            </Button>
            </DialogActions>
            <DialogContent dividers>
                <div style={{textAlign:"center"}}>
                    Added to your Dream Gallery
                </div>
            </DialogContent>
            <DialogContent dividers>
                <div style={{textAlign:"center"}}>
                    <img src={dreamImagePath} style={{maxWidth:'100%',maxHeight:'100%'}} />
                </div>
            </DialogContent>
         </Dialog>
    );
}
export default ViewImage;