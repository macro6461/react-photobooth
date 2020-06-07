import React, {useState, useEffect} from 'react';
import { SettingOutlined, 
    ToolOutlined,
    PictureOutlined,
    FieldTimeOutlined,
    ApiOutlined,
    DisconnectOutlined
} from '@ant-design/icons';
import {Drawer, Collapse, Card, Select, InputNumber, Tooltip} from 'antd'
import "antd/dist/antd.css";
import '../App.css';
import { Field } from 'rc-field-form';
const { Panel } = Collapse;
const Option = Select.Option;

const Menu = (props) =>{

    const {setFormat, format, formats, burst, setBurst, burstRate, setBurstRate, cutFeed, setCutFeed} = props;

    const [showMenu, setShowMenu] = useState(false)
    
    const itemStyle={
        padding: '10px 0 10px 0', 
        overflowX: 'hidden'
    }

    const handleDrawer = (x) =>{
        setShowMenu(x)
    };

    const handleCut = () =>{
        setShowMenu(false)
        setCutFeed(!cutFeed)
    };

    return (<Card className="menu">
        <h1>React Photobooth</h1>
        <div>
        <Tooltip title="Settings" placement="left"><SettingOutlined style={{fontSize: 25, cursor: 'pointer'}} onClick={()=>handleDrawer(!showMenu)}/> </Tooltip>
        <Drawer
            title="Settings"
            placement="right"
            closable={false}
            onClose={()=>handleDrawer(false)}
            bodyStyle={itemStyle}
            footerStyle={itemStyle}
            visible={showMenu}
            getContainer={false}
            footer={
                <p style={{position: 'relative', padding: '0 10px 0 10px', cursor: 'pointer'}}  onClick={handleCut} >
                    {cutFeed ? 'Start Video Feed' : 'End Video Feed'}
                    {cutFeed ? <ApiOutlined style={{fontSize: 25}}/> : <DisconnectOutlined style={{fontSize: 25}}/> }
                </p>
            }
      >
      <Collapse accordion>
        <Panel header={<p>Image Format <ToolOutlined /></p>} key="1" showArrow={false}> 
        <p className='description'>What type of file do you want your images to be saved as?</p>
        <Select onChange={(e)=>setFormat(e)} defaultValue={format} style={{width: "100%"}}>
            {formats.map(form => {
                return <Option value={form.val} key={form.val}>{form.name}</Option>
            })}
        </Select>
        </Panel>
        <Panel header={<p>Burst Amount<span style={{position: 'relative'}}>
                <PictureOutlined className='burst' style={{marginLeft: 0, top: -4, left: -18, backgroundColor: '#fafafa'}}/>
                <PictureOutlined className='burst' style={{marginLeft: 5, top: -4, left: -18,backgroundColor: '#fafafa'}}/>
                <PictureOutlined className='burst' style={{marginLeft: 10, top: -4,left: -18, backgroundColor: '#fafafa'}}/>
            </span></p>} key="2" showArrow={false}>
            <p className='description'>How many pictures do you want in one burst?</p>
            <InputNumber defaultValue={burst} onChange={(e)=>setBurst(e)} style={{width: '100%'}}/>
        </Panel>
        <Panel header={<p>Burst Rate <FieldTimeOutlined /></p>} key="3" showArrow={false}>
            <p className='description'>How many seconds between each picture?</p>
            <InputNumber defaultValue={burstRate} onChange={(e)=>setBurstRate(e)} style={{width: '100%'}}/>
        </Panel>
      </Collapse>
      </Drawer>
        </div>
    </Card>)

};

export default Menu;