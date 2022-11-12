import React,{useState} from 'react';
import styled from "styled-components";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const StyledImageLightboxGallery = styled.div`
`;
const ImageLightboxGallery = ({images=[],open = false,setOpen = () => {},...props}) => {
    const [photoIndex,setPhotoIndex] = useState(0);
    return (
        <StyledImageLightboxGallery {...props}>

            <Lightbox
                mainSrc={images[photoIndex]}
                mainSrcThumbnail={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setOpen(false)}
                onMovePrevRequest={() =>
                    setPhotoIndex(
                        photoIndex => (photoIndex + images.length - 1) % images.length
                    )
                }
                onMoveNextRequest={() =>
                    setPhotoIndex(
                        photoIndex =>(photoIndex + 1) % images.length,
                    )
                }
            />

        </StyledImageLightboxGallery>
    );
};

export default ImageLightboxGallery;