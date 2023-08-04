/* eslint-disable*/
import './App.css';
import React, { useState } from "react";
import CustomProTable from './table';



function App() {
  return (
    <div className="App">
      <div className="hdr-black">
        <h1>Acra Point</h1>
      </div>

      <div className='table'>
        <CustomProTable/>
      </div>
      
    </div>
  );
}

export default App;
