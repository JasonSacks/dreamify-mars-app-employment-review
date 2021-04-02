import ImageViewer from '../components/ImageViewer';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MarsActions from '../Redux/Actions/MarsActions';
import Button from '@material-ui/core/Button';
import SystemActions from '../Redux/Actions/SystemActions';
import EarthDateSelector from '../components/EarthDateSelector';
import NoImagesAvailable from '../components/NoImagesAvailable';
import ViewImage from '../components/ViewImage';

const MarsGallery = ({   
        accountId,
        isWorking,
        isLoaded, 
        token, 
        page, 
        earthDate, 
        isComplete,
        images, 
        index, 
        setPage, 
        setIndex, 
        dreamifyImage, 
        getData,
        setIsLoaded,
        setEarthDate,
        displayOverlay,
        closeOverlay }) => {
    
    const [imagePath,setImagePath] = useState('');
    
    const onButtonClick = async () => {
        displayOverlay('Processing Deep Dream');
        const result = await dreamifyImage({accountId, path : images[index].original}, token);
        closeOverlay();
        if (!result.hasErrors){
            setImagePath(result.data.path);
        }
    }
    const onCloseDialog =  () => {
        setImagePath('');
    }
    const _setPage = (page) => {
        setIsLoaded(false); 
        setPage(page);
    }

    useEffect(() => {
        document.title = "Dreamify Mars - Mars Images";
        if (isWorking){ 
            closeOverlay();
        }
        if (!isLoaded){ 
            setIsLoaded(true);
            const func = async () =>{
                displayOverlay(`Getting page ${page} for ${earthDate.split('T')[0]}`);
                await getData(
                    new Date(earthDate), 
                    page, 
                    isComplete, 
                    token);
                closeOverlay();
            }
            func();
        }
    },[page, earthDate]);
   
    if (images.length > 0)
    return (
        <>
            <ViewImage dreamImagePath={imagePath} onClose={onCloseDialog}/>
            <EarthDateSelector
            earthDate={earthDate}
            style={{margin:'10px'}}
            onEarthDateChange={(newValue)=> {
                setIsLoaded(false);
                setEarthDate(newValue.toISOString().split('T')[0]);
            }}/>
            <ImageViewer
                images={images}
                index={index}
                page={page}
                onRenderCustomControls={() => 
                    (<>
                        <Button 
                        onClick={onButtonClick} 
                        variant="outlined" 
                        style={{
                            backgroundColor:"white", 
                            marginLeft:'10px'}}>Dreamify</Button>
                        <br/>
                    </>)}
                setPage={_setPage}
                setIndex={setIndex}
            />
        </>
    );
    else
    return (<>
      <EarthDateSelector
            earthDate={earthDate}
            style={{margin:'10px'}}
            onEarthDateChange={(newValue)=> {
                setIsLoaded(false);
                setEarthDate(newValue.toISOString().split('T')[0]);
            }}/>
            <NoImagesAvailable/>
            </>);
}

function mapStateToProps(state) {
    return { 
        accountId: state.account.accountId,
        page: state.marsPage,
        hasPageIncremented: state.hasMarsPageIncremented,
        images: state.marsImages,
        index: state.marsIndex,
        isComplete: state.isMarsComplete,
        earthDate: state.earthDate,
        token: state.token,
        isLoaded: state.marsLoaded,
        isWorking: state.isWorking     
     }
  }

  function mapDispatchToProps (dispatch) {
    return { 
        setIndex: MarsActions.setIndex(dispatch),
        dreamifyImage: MarsActions.dreamifyImageAsync(dispatch),
        getData : MarsActions.getDataAsync(dispatch),
        setPage: MarsActions.setPage(dispatch),
        setEarthDate: MarsActions.setEarthDate(dispatch),
        setIsLoaded: MarsActions.setIsLoaded(dispatch),
        displayOverlay: SystemActions.displayOverlay(dispatch),
        closeOverlay: SystemActions.hideOverlay(dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarsGallery);