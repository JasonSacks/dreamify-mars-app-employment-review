import React, {useState} from 'react';
import Login from './Login';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreditsDisplay from './CreditsDisplay';
import {Menu, MenuItem, Avatar} from '@material-ui/core';
import {Nav, Navbar} from 'react-bootstrap';
import SystemActions from '../Redux/Actions/SystemActions';

const Header = ({history, token, account, logOut}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const getClass = (path) => 
        (path === history.location.pathname) ? 
        'active' :
        '';
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const goToAccount = () => {
        setAnchorEl(null);
        history.push("/account")
    };
    const logAccountOut = () => {
        setAnchorEl(null);
        logOut();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{marginBottom: "15px"}}>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand >Dreamify Mars</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        {token.length > 0 && 
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link className={getClass("/mars")} href="/mars">Mars</Nav.Link>
                    <Nav.Link className={getClass("/dreams")} href="/dreams">Dreams</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <CreditsDisplay/>
                    <Avatar 
                        alt={`${account.FirstName} ${account.LastName}`} 
                        src={account.Avatar}
                        onClick={handleClick} />
                    <Menu
                        style={{paddingTop:'10px'}}
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                            <MenuItem onClick={goToAccount}>My Account</MenuItem>
                            <MenuItem onClick={logAccountOut}>Logout</MenuItem>
                    </Menu>
                </Nav>

            </Navbar.Collapse>
            
        }
        { token.length === 0  && 
            <Nav className="ml-auto">
                <Login/>
            </Nav>
        }
        </Navbar>
        </div>
        );  
}

function mapStateToProps(state) {
    return { 
        token: state.token,
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        logOut: SystemActions.logOut(dispatch) 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(withRouter(Header));