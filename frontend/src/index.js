import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WorkoutContextProvider} from '../src/context/WorkoutContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutContextProvider>
     <App />
    </WorkoutContextProvider>
    {/* //WorkoutContextProvider likely initializes a context with a certain state and provides methods or values related to the workout context.
Components within the WorkoutContextProvider can access and update this shared state or use the provided functionality. */}
  </React.StrictMode>
);


