import React, {useState, useEffect} from 'react';
import {Tooltip} from 'antd'
import {
    DeleteFilled,
    PictureFilled,
  } from '@ant-design/icons';

import '../App.css'; 

const Image = (props) =>{

    const {setImages, src} = props

    const [showOptions, setShowOptions] = useState(false)
    const [className, setClassName] = useState('thumbnail')
    const [tooltip, setTooltip] = useState(false)

    const onDelete = () =>{
        var temp = 'thumbnail shrink'
        setTooltip(false)
        setClassName(temp)
        setTimeout(()=>{
            setImages(src)
        }, 1000)
    }

    return <div className={className}
                onMouseEnter={()=>setShowOptions(true)} 
                onMouseLeave={()=>setShowOptions(false)}
                >
        {showOptions 
            ? <div style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            backgroundColor: 'white',
            opacity: 0.7,
            display: 'inline-flex'
            }}/>
            : null
        }

        {showOptions 
            ? <div style={{ position: 'absolute', 
            top: 0, 
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%', 
            fontSize: 25,
            height: '100%'}}>
                <Tooltip title="View" overlayStyle={{zIndex: 10}}>
                    <PictureFilled style={{marginRight: 10}}/>
                </Tooltip>
                <Tooltip title="Delete" visible={tooltip}>
                    <DeleteFilled onClick={onDelete} onMouseEnter={()=>setTooltip(true)} onMouseLeave={()=>setTooltip(false)}/>
                </Tooltip>
            </div>
            : null
        }
        <img src={src} style={{width: 100}}/>
    </div>

};

export default Image;