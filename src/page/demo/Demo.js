import Stats from "three/examples/jsm/libs/stats.module.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry'
// import {} from 'three/examples/jsm/'
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

// import { withData } from "./WithData";
let container;
let controls;
let renderer, cube, scene, camera
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

// function animate() {
//   requestAnimationFrame(animate);
//   // controls.update()
//   renderer.render(scene, camera);
// };
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update()
  renderer.render(scene, camera);
};

function buildFish(){
  var texture = THREE.ImageUtils.loadTexture("img/fishDemo.png")
  const geometry = new THREE.PlaneGeometry(30, 15, 2, 1);
  const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,
    map: texture,
    overdraw: true,
    // alphaMap: chungeAlphaTexture, // 设置透明纹理
    transparent: true, // 允许材质透明
    side: THREE.DoubleSide
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  cube = buildFish()

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

  animate();

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


