// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// //import Hello from './Hello.js';
// // import App from './App';
import * as serviceWorker from './serviceWorker';
// // import { import } from '@babel/types';

// //ReactDOM.render(<Hello/>, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

import "./css/style.css"    
import React from "react";
import{ render} from "react-dom";
import Router from "./components/Router";
render(<Router/>,document.querySelector("#root"));
serviceWorker.unregister();