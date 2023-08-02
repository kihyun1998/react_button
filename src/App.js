/* eslint-disable*/
import './App.css';
import React, { useState } from "react";
import CustomRangePicker from './CustomRangePicker';
import CustomProTable from './table';


function App() {


  return (
    <div className="App">
      <div className="hdr-black">
        <h1>Acra Point</h1>
      </div>
      <div className='filter'>
        <div className='time'>
          <div className='des'>
            생성 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div className='des'>
            로그인 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div className='des'>
            로그아웃 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div className='des'>
            HearBeat 시간
          </div>
          <CustomRangePicker/>
        </div>
      </div>

      <div className='table'>
        <CustomProTable/>
      </div>
      
    </div>
  );
}

export default App;
