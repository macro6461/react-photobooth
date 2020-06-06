import React, {useState} from 'react';
import {Modal} from 'antd';
import Image from './Image'

const ImageContainer = (props) =>{

    const [image, setImage] = useState(null)

    const {images, setImages} = props;

    var imgs = images.length === 0 
    ? <p>No Photos</p> 
    : images.map(x=>{
        return <Image src={x} key={x} setImages={setImages}/>
    })

    return <div className='imageContainer'>
    {imgs}
    </div>
};

export default ImageContainer;