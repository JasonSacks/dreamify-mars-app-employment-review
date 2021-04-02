import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      padding: '20px',
    },
  }));
const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
              All mars images provided courtesy of NASA<br/>
              &copy; {new Date().getFullYear()}DreamifyMars Copyright: <a href="mailto:jason.samuel.sacks@gmail.com">Jason Sacks </a>
            </div>
        </>
    )
}

export default Footer;