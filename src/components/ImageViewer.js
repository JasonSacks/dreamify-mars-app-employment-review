import React, {useState} from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Slider from '@material-ui/core/Slider';

const ImageViewer = ({
    images, 
    index, 
    page, 
    setPage, 
    setIndex,
    showSlider = true, 
    onRenderCustomControls }) => 
{ 
    const [showThumbnails, setShowThumbnails] = useState(true);
    const onNextSlide = async (nextIndex) => {
        setIndex(nextIndex);
        if (nextIndex === images.length-1)
        {
            await setPage(page + 1);
        }
    };
    const onScreenChange = (isFullscreen) => {
        setShowThumbnails(!isFullscreen);
    }

    return (
        <> {showSlider &&  
                <Slider
                    value={index+1}
                    style={{width:"100%"}}
                    valueLabelDisplay="auto"
                    step={1}
                    min={1}
                    max={images.length -1}
                    onChange={ (event, newValue) => {
                        if ((newValue + 10) >= images.length){
                            setPage(page + 1);            
                        }
                        setIndex(newValue)
                    }}/>
            }
            <ImageGallery 
                items={images}
                thumbnailPosition="top"
                showThumbnails={showThumbnails}
                lazyLoad={true}
                showIndex={true}
                swipingTransitionDuration={0}
                onBeforeSlide={onNextSlide}
                onScreenChange={onScreenChange}
                startIndex={index}
                renderCustomControls={onRenderCustomControls} />
        </>      
    );
}

export default ImageViewer;
