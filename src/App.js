import React, {useState} from 'react';
import Capture from './components/Capture';
import Menu from './components/Menu';
import {Drawer} from 'antd';
import './App.css';
// import "antd/dist/antd.css";

const formats = [{val:'.png', name: 'PNG'}, {val:'.jpeg', name: 'JPEG'}, {val:'.jpg', name: 'JPG'}, {val:'.tiff', name: 'TIFF'}]

function App() {

  const [format, setFormat] = useState('.png')
  const [burst, setBurst] = useState(5)
  const [burstRate, setBurstRate] = useState(1)

  return (
    <div className="App">
      <Menu 
        setFormat={setFormat} 
        burst={burst}
        setBurst={setBurst}
        format={format} 
        burstRate={burstRate}
        setBurstRate={setBurstRate}
        formats={formats}/>
      <Capture format={format} burst={burst} burstRate={burstRate}/>
    </div>
  );
}

export default App;
