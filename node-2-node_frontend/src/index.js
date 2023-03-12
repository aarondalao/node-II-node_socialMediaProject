/*
    notes:

    resources: 
    https://create-react-app.dev/docs/adding-custom-environment-variables/
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Router>
         {/* TODO: find a workaround to make .env variables work */}
         {/* <----- does not work due to create-react-app restrictions */}
         <GoogleOAuthProvider clientId ={ process.env.REACT_APP_GOOGLE_API_TOKEN }> 
         {/* <GoogleOAuthProvider clientId="%REACT_APP_GOOGLE_API_TOKEN%"> */}
            <App />
        </GoogleOAuthProvider>
    </Router>
);