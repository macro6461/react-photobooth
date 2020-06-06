import React, {Component} from 'react';
import {Select} from 'antd';
import ButtonGroup from './ButtonGroup';
import ImageContainer from './ImageContainer';
const Option = Select.Option;

const formats = [{val:'.png', name: 'PNG'}, {val:'.jpeg', name: 'JPEG'}, {val:'.jpg', name: 'JPG'}, {val:'.tiff', name: 'TIFF'}]

class Capture extends Component {

    state = {
        images: [],
        format: null,
        stream: null, 
        showScreenshot: false
    }

    componentDidMount = () =>{
        this.hasGetUserMedia()
    }
    
    hasGetUserMedia = () => {
        if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
            alert('Unable to enable camera.')
        } else {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
    }

    videoError = (e)=>{
        console.log(e)
    }

    handleVideo = (stream) => {
        var video = document.querySelector("video");
        this.setState({stream}, ()=>{
            video.srcObject = stream
        })
      }

    onScreenshot = () => {
        this.setState({showScreenshot: true}, ()=>{
            var img = document.querySelector('#tempImg')
            var video = document.querySelector('#video')
            var canvas = document.createElement('canvas')
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            var dataUrl = canvas.toDataURL('image/png');
            img.src = dataUrl
            this.setImages(dataUrl, true)
        })
        setTimeout(()=>{
            this.setState({showScreenshot: false})
        }, 2000)
    }
    
    onDownload = () => {
        const {image, format} = this.state
        var download = document.createElement('a');
        download.href = image
        download.download = 'yourScreenshot' + format;
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    };

    setImages = (data, action) => {
        var {images} = this.state
        if (data === 'all'){
            images = []
        } else if (action){
            images.push(data)
        } else {
            images = images.filter(x=>x !== data)
        }
        this.setState({images})
    };

    render() {

        const {setImages, state, onDownload, clearAll, onScreenshot} = this;
        const {images, showScreenshot, stream} = state

        return (<div>
            <div className='container' style={{border: !stream ? 'solid 1px black' : null}}>
            <div>
                <label htmlFor="select"> Format </label>
                <Select id="select" onChange={(format)=>this.setState({format})} style={{minWidth: 100}} defaultValue={'.png'}>
                    {formats.map(format=>{
                        return <Option key={format.val} value={format.val}>{format.name}</Option>
                    })}
                </Select>
            </div>
            <video autoPlay id="video"/>
            {showScreenshot ? <img id="tempImg"/> : null}
            <div>
            {!showScreenshot 
            ? <ButtonGroup 
                onDownload={onDownload} 
                onClearAll={clearAll}
                images={images}
                onScreenshot={onScreenshot}
                setImages={setImages}
            />
            : null
            }
              </div>
        </div>
        <ImageContainer images={images} setImages={setImages}/>
    </div>)
    }

};

export default Capture;