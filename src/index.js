import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import {BrowserRouter} from 'react-router-dom';
import './styles/colors.css';

document.body.classList.add('default-font');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
