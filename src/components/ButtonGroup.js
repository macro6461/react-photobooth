import React from 'react';
import {Button, Tooltip, Popconfirm} from 'antd'
import {
    DownloadOutlined,
    CameraOutlined,
    PictureOutlined,
    ClearOutlined
  } from '@ant-design/icons';
import '../App.css';

const ButtonGroup = (props) =>{

    const {images, onScreenshot, setImages, onDownload, onBurst} = props;

    var downloadTooltip = 'Download';

    if (images.length > 1 ) {
        downloadTooltip = 'Download All';
    }

    return <div className='buttonGroup'>
        <div style={{width: '99%', display: 'flex', justifyContent: 'center'}}>
        <Tooltip title="Burst">
            <Button shape="circle" style={{marginRight: 10}} onClick={onBurst}>
                <PictureOutlined className='burst' style={{marginLeft: 0}}/>
                <PictureOutlined className='burst' style={{marginLeft: 5}}/>
                <PictureOutlined className='burst' style={{marginLeft: 10}}/>
            </Button>
        </Tooltip>
        <Tooltip title="Capture">
            <Button shape="circle" onClick={onScreenshot}>
                <CameraOutlined/>
            </Button>
        </Tooltip>
        </div>
        {images.length > 0 
        ? <div>
            <Tooltip title={downloadTooltip}>
                <Button shape="circle" style={{marginRight: 10}} onClick={onDownload}>
                    <DownloadOutlined/>
                </Button>
            </Tooltip>
            <Popconfirm title="Are you sure?" onConfirm={()=>setImages('all')}>
                <Tooltip title='Clear All' overlayStyle={{zIndex: 10}}>
                    <Button shape="circle">
                        <ClearOutlined />
                    </Button>
                </Tooltip>
            </Popconfirm>
        </div>
        : null
        }
    </div>

};

export default ButtonGroup;