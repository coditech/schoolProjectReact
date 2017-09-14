import React from "react";
import ReactDOM from 'react-dom';
import App from './component/App';
import {HashRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.min.css';
ReactDOM
    .render(
        (
            <HashRouter>

                <App />
            </HashRouter>
        ),
        document.getElementById('root'));
