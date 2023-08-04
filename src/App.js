/* eslint-disable*/
import './App.css';
import React, { useState } from "react";
import CustomProTable from './table';
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch, Input } from "antd";


function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  if (status === "loading") {
    return null;
  }

  return (
    <div className="App">
      <div className="hdr-black">
        <h1>Acra Point</h1>
      </div>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
      <Input style={{ width: 300, marginTop: 30 }}
        placeholder="I will change with the theme!" />
      <div className='table'>
        <CustomProTable>
          
        </CustomProTable>
      </div>
      
    </div>
  );
}

export default App;
