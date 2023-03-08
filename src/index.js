import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './page/home/Home';
import Serial from './page/serial/Serial';
import Item1 from './page/items/item1/Item1';
import Hand from './page/hand/Hand';
import Ocs from './page/hand/ocs/Three'
import Fishing from './page/fishing/Fishing copy';
import Demo from './page/demo/Demo';
import Orange from './page/orange/Orange';
import Canvas from './page/canvas/Canvas';
import Canvas1 from './page/canvas copy/Canvas';
import Fish from './page/fish/Fish';
import Orange2d from './page/orange/Orange2d';
import Orange3d from './page/orange/Orange copy';
import Report from './page/echarts/Echarts';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="serial" element={<Serial />} />
      <Route path="item1" element={<Item1 />} />
      {/* <Route path="hand" element={<Hand />} /> */}
      <Route path="hand" element={<Ocs />} />
      <Route path="fish" element={<Fishing />} />
      <Route path="demo" element={<Demo />} />
      <Route path="orange" element={<Orange />} />
      <Route path="orange2d" element={<Orange2d />} />
      <Route path="orange3d" element={<Orange3d />} />
      <Route path="canvas" element={<Canvas />} />
      <Route path="canvas1" element={<Canvas1 />} />
      <Route path="fi" element={<Fish />} />
      <Route path="echarts" element={<Report />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
