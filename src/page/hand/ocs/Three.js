import Stats from "three/examples/jsm/libs/stats.module.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

// import { withData } from "./WithData";
let container;
let controls;
let renderer, cube, scene, camera
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

function animate() {
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  container = document.getElementById(`canvas1`);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);


  const loader = new FBXLoader();

  loader.load('/model/Samba Dancing.fbx', function (gltf) {

    console.log(gltf)
    // scene.add(gltf.scene);
    scene.add(gltf);
  }, undefined, function (error) {

    console.error(error);

  });

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);
  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 200, 200);
  scene.add(dirLight);
  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(200, 10, 0);

  camera.position.z = 5;

  controls = new TrackballControls(camera, renderer.domElement);
  controls.dynamicDampingFactor = 0.1;
  controls.domElement = container;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
    MIDDLE: THREE.MOUSE.ZOOM,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  controls.keys = [
    ALT_KEY, // orbit
    CTRL_KEY, // zoom
    CMD_KEY, // pan
  ];
  console.log('open')


}



class Canvas extends React.Component {
  constructor() {
    super()
  }



  componentDidMount() {
    init()
    animate()
    console.log('componentDidMount')
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        id={`canvas1`}
      ></div>
    )
  }
}

export default Canvas

// const Canvas = React.forwardRef((props, refs) => {
//   let container;
//   let controls;
//   let renderer, cube, scene, camera

//   const ALT_KEY = 18;
//   const CTRL_KEY = 17;
//   const CMD_KEY = 91;

//   function animate() {
//     requestAnimationFrame(animate);
//     controls.update()
//     renderer.render(scene, camera);
//   };

//   function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const loader = new GLTFLoader();

//     loader.load('/model/child.glb', function (gltf) {

//       scene.add(gltf.scene);

//     }, undefined, function (error) {

//       console.error(error);

//     });

//     const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
//     hemiLight.position.set(0, 200, 0);
//     scene.add(hemiLight);
//     const dirLight = new THREE.DirectionalLight(0xffffff);
//     dirLight.position.set(0, 200, 200);
//     scene.add(dirLight);
//     const dirLight1 = new THREE.DirectionalLight(0xffffff);
//     dirLight1.position.set(200, 10, 0);

//     camera.position.z = 5;

//     controls = new TrackballControls(camera, renderer.domElement);
//     controls.dynamicDampingFactor = 0.1;
//     controls.domElement = container;
//     controls.mouseButtons = {
//       LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
//       MIDDLE: THREE.MOUSE.ZOOM,
//       RIGHT: THREE.MOUSE.ROTATE,
//     };
//     controls.keys = [
//       ALT_KEY, // orbit
//       CTRL_KEY, // zoom
//       CMD_KEY, // pan
//     ];

//   }

//   useEffect(() => {
//     // 靠垫数据

//     // init();
//     // animate();



//     init()
//     animate();


//     return () => { };
//   }, []);
//   return (
//     <div>
//       <div
//         style={{ width: "100%", height: "100%" }}
//         id={`canvas${props.index}`}
//       ></div>
//     </div>
//   );
// });
// export default Canvas;
