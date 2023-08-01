/* eslint-disable*/
import './App.css';
import React, { useState } from "react";
import CustomRangePicker from './CustomRangePicker';

function App() {


  return (
    <div className="App">
      <div className="hdr-black">
        <h1>상단바</h1>
      </div>
      <div className='filter'>
        <div className='time'>
          <div>
            생성 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div>
            로그인 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div>
            로그아웃 시간
          </div>
          <CustomRangePicker/>
        </div>
        <div className='time'>
          <div>
            HearBeat 시간
          </div>
          <CustomRangePicker/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
