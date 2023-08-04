import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const theme = {
  dark : 'antd/dist/antd.dark.css',
  light : '',
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={theme} defaultTheme='light'>
      <App />
    </ThemeSwitcherProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
