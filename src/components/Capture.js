import React, {Component} from 'react';
import {Select} from 'antd';
import ButtonGroup from './ButtonGroup';
import ImageContainer from './ImageContainer';
import {saveAs} from 'save-as';
import {
    VideoCameraOutlined, 
    LoadingOutlined,
    VideoCameraAddOutlined
  } from '@ant-design/icons';
var JSZip = require("jszip");

const Option = Select.Option;

class Capture extends Component {

    state = {
        images: [],
        format: null,
        stream: null, 
        showScreenshot: false,
        feedForceEnd: false,
        interval: null
    }

    componentDidMount = () => {
        if (!this.props.cutFeed){
            this.hasGetUserMedia()
            this.setState({feedForceEnd: false})
        } else {
            this.setState({feedForceEnd: true})
        }
    }

    componentDidUpdate = (prevProps, prevState) =>{
        if (this.props.cutFeed !== this.state.feedForceEnd){
            this.setState({
                feedForceEnd: this.props.cutFeed
            }, ()=>{
                if (!this.state.feedForceEnd){
                    this.hasGetUserMedia()
                } else {
                    this.onCutFeed()
                }
            })
        }
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
        }, 1000)
    }
    
    onDownload = (x) => {
        const {images} = this.state
        const {format} = this.props
        if (x){
            this.handleDownload(x, 'react-photobooth-image' + format)
        } else if (images.length > 1){
            var zip = new JSZip();
            var img = zip.folder("photobooth-images");
            images.forEach((x, i)=>{
                var content = x.split("base64,")[1]
                img.file("image" + i + format, content, {base64: true})
            })
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "react-photobooth-images.zip")
            });
        } else {
            this.handleDownload(images[0], 'react-photobooth-image' + format)
        }
    };

    handleDownload = (data, name) => {
        var download = document.createElement('a');
        download.href = data
        download.download = name
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

    onBurst = () =>{
        var count = 0

        var interval = setInterval(()=>{
            this.onScreenshot()
            count++
            if (count === this.props.burst){
                clearInterval(this.state.interval)
                this.setState({interval: null})
            }
        }, this.props.burstRate * 1000)

        this.setState({interval})
    }

    onCutFeed = () =>{
        var video = document.querySelector("video");
        this.setState({stream: null}, ()=>{
            video.srcObject.getVideoTracks().forEach(track => track.stop())
        })
    }

    render() {

        const {setImages, state, onDownload, clearAll, onScreenshot, onBurst} = this;
        const {images, showScreenshot, stream} = state

        return (<div>
            <div className='container' style={{border: !stream ? 'solid 1px black' : null}}>
                <video autoPlay id="video"/>
                {!stream 
                    ? <div className="dummyContainer" onClick={this.state.feedForceEnd ? ()=>this.props.setCutFeed(false) : null}>
                        <div>
                            {!this.state.feedForceEnd ? <VideoCameraOutlined/> : <VideoCameraAddOutlined style={{cursor: 'pointer'}} /> }
                            {!this.state.feedForceEnd ? <h3>Establishing Feed <LoadingOutlined/></h3> : <h3> Click To Start Feed </h3>}
                        </div>
                    </div> 
                    : null
                }
                {showScreenshot ? <img id="tempImg"/> : null}
                <div>
                {!showScreenshot && stream
                ? <ButtonGroup 
                    onDownload={onDownload} 
                    onClearAll={clearAll}
                    images={images}
                    onScreenshot={onScreenshot}
                    setImages={setImages}
                    onBurst={onBurst}
                />
                : null
                }
            </div>
        </div>
        <ImageContainer images={images} setImages={setImages} format={this.props.format} handleDownload={this.handleDownload}/>
    </div>)
    }

};

export default Capture;