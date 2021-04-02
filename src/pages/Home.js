import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Home = () => {
 
  const images = [
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image1.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image1.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image2.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image2.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image3.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image3.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image4.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image4.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image5.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image5.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image6.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image6.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image7.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image7.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image8.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image8.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image9.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image9.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image10.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image10.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image11.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image11.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image12.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image12.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image13.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image13.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image14.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image14.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image15.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image15.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image16.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image16.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image17.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image17.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image18.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image18.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image19.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image19.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image20.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image20.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image21.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image21.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image22.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image22.jpg"
    },
    { 
      original:"https://deepdream.blob.core.windows.net/userimages/image23.jpg",
      thumbnail:"https://deepdream.blob.core.windows.net/userimages/image23.jpg"
    }];
  
  useEffect(() => document.title = "Dreamify Mars",[]);
  
  return (
    <>
     <h1 style={{textAlign:'center', margin:'20px'}}>Turn Mars photos into Dreams!</h1>
     <ImageGallery 
        items={images}
        showThumnails={false}
        showIndex={true}
        showNav={false}
        showFullscreenButton={false}
        autoPlay={true}
        showPlayButton={false}
        showBullets={false}
        style={{maxHeight: '300px'}}
        />
    </>
  );
}

function mapStateToProps(state) {
  return { 
      token : state.token     
   }
}

export default connect(
  mapStateToProps
)(Home);