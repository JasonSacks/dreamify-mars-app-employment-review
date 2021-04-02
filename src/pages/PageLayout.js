import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingOverlay from 'react-loading-overlay'
import {connect} from 'react-redux';
import SystemAlert from '../components/SystemAlert';

const PageLayout = ({isWorking, workingText, children }) => {

    return (
        <>
            <LoadingOverlay
                active={isWorking}
                text ={workingText}
                spinner={true}>
                <Header/>
                <SystemAlert/>
                <div>{children}</div>
                <Footer />
            </LoadingOverlay>
       </>
    )
}

function mapStateToProps(state) {
    return { 
        isWorking: state.isWorking,
        workingText: state.workingText     
    }
}
  
export default connect(
    mapStateToProps
  )(PageLayout);
  