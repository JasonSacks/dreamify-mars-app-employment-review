import ImageViewer from '../components/ImageViewer';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import DreamActions from '../Redux/Actions/DreamActions';
import Button from '@material-ui/core/Button';
import NoImagesAvailable from '../components/NoImagesAvailable';

const DreamGallery = ({
    accountId,
    isLoaded, 
    token, 
    index, 
    images, 
    page, 
    getData, 
    lastDreamId, 
    setPage, 
    setIndex,
    setIsLoaded, 
    deleteImage,
    isDreamPageComplete}) => {

    const onButonClick = async () => {
        await deleteImage(images[index].itemId, isDreamPageComplete, token);
        if (images.length ===0) setIsLoaded(false); 
    }
    const _setPage = async (pageArg) =>  {
        const newPage = isDreamPageComplete ? pageArg : page;
        setIsLoaded(false);
        setPage(newPage);
    }

    useEffect( () => {
        document.title = document.title = "Dreamify Mars - Mars Dreams";
        if (images.length === 0){
            setIsLoaded(false);
        }
        if (!isLoaded || (!isDreamPageComplete && index === (images.length - 1))){
            setIsLoaded(true);
            const func = async () => await getData(accountId, page, lastDreamId, token);
            func();
        }
   },[page]);

    if (images.length > 0 ) 
    return (
        <ImageViewer
            images={images}
            index={index}
            page={page}
            onRenderCustomControls={() => 
                (<Button 
                    onClick={onButonClick} 
                    variant="outlined" 
                    style={{backgroundColor:"white", marginLeft:'10px'}}>Delete</Button>)}
            setPage={_setPage}
            setIndex={setIndex}/>);
    else 
    return (<><NoImagesAvailable/></>)
}

function mapStateToProps(state) {
    return { 
        page: state.dreamPage,
        accountId: state.account.accountId,
        images: state.dreamImages,
        index: state.dreamIndex,
        lastDreamId: state.lastDreamId,
        token: state.token,
        isLoaded: state.dreamsLoaded,
        isDreamPageComplete : state.isDreamPageComplete
    }
}

function mapDispatchToProps (dispatch) {
    return { 
        setIndex: DreamActions.setIndex(dispatch),
        deleteImage: DreamActions.deleteDreamImageAsync(dispatch),
        getData : DreamActions.getDataAsync(dispatch),
        setPage : DreamActions.setPage(dispatch),
        setIsLoaded: DreamActions.setIsLoaded(dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DreamGallery);