import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './fonts/Jost-VariableFont_wght.ttf';
import './index.css';
import './styles/palette.css';
import './styles/Input.css';
import './styles/Profile.css';
import './styles/Home.css';
import "./styles/buttons.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
