import React from 'react';

const photos = [
    {src: '/images/stolf.jpg'}
];

const initialState = {
    topText: "",
    bottomText: "",
    isTopDragging: false,
    isBottomDragging: false,
    topY: "10%",
    topX: "50%",
    bottomX: "50%",
    bottomY: "90%"
}

interface MemeMakerState {
    currentImage: number;
    modalIsOpen: boolean;
    currentImageBase64?: string | null;
    topText: string;
    bottomText: string;
    isTopDragging: boolean;
    isBottomDragging: boolean;
    topY: string;
    topX: string;
    bottomX: string;
    bottomY: string;
}

class MemeMaker extends React.Component<{}, MemeMakerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentImage: 0,
            modalIsOpen: false,
            currentImageBase64: null,
            ...initialState
        };
    }


    getBase64Image(img: HTMLImageElement): string {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext("2d");
        context?.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    }

    openImage = (index: number) => {
        const image = photos[index];
        const baseImage = new Image();
        baseImage.src = image.src;
        const currentImageBase64 = this.getBase64Image(baseImage);
        this.setState(prevState =>({
            currentImage: index,
            modalIsOpen: !prevState.modalIsOpen,
            currentImageBase64,
            ...initialState
        }));
    }

    render() {
        return (
            <div className="content">
                {photos.map((image, index) => (
                    <div className="image-holder" key={image.src}>
                    <span className="meme-top-caption">Top text</span>
                    <img
                    style = {{
                        width: "100%",
                        cursor: "pointer",
                        height: "100%"
                    }}
                    alt={String(index)}
                    src={image.src}
                    onClick={() => this.openImage(index)}
                    role="presentation"
                    />
                    <span className = "meme-bottom-caption">Bottom text</span>
                    </div>
                ))}
            </div>
        )
    }
}

export default MemeMaker;