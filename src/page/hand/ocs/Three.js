import Stats from "three/examples/jsm/libs/stats.module.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import * as echarts from "echarts";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

// import { withData } from "./WithData";
let container, oldRotationResArr = [0, 0];
let controls;
let renderer, cube, scene, camera
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;
let rightHand, rightHand11,
  rightHand12,
  rightHand13,
  rightHand21,
  rightHand22,
  rightHand23,
  rightHand31,
  rightHand32,
  rightHand33,
  rightHand41,
  rightHand42,
  rightHand43,
  rightHand51,
  rightHand52,
  rightHand53, res, fingerArr = new Array(5).fill(0), newArr = new Array(5).fill(0), rotateArr = new Array(2).fill(0), oldData = 0, fingerResArr, rotationResArr = [], rotatechartArr = [], rotationSmoothResArr = [0, 0], vlauex = -0.59, vlauey = -0.25, vlauez = 1.18
var option, data, timeTickId, timer, max;
function animate() {
  // console.log(first)
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
  let newDate = new Date().getTime()




  if (fingerResArr) {
    // console.log(fingerArr[0],res[6])

    // console.log(fingerArr)

    const flagValue = [15, 15, 15, 15, 15]
    if (rightHand12) {// 大拇指
      {
        rightHand11.rotation.x = -1.48 + Math.PI * 0 / 12 * (fingerArr[0] / flagValue[0])
        rightHand11.rotation.y = -0.38 + Math.PI * 0 / 12 * (fingerArr[0] / flagValue[0])
        rightHand11.rotation.z = 2.32 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0]) > 2.32 + Math.PI * 3 / 12 * (2) ? 2.32 + Math.PI * 3 / 12 * (2) : 2.32 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0])

        rightHand12.rotation.x = -0.18 + Math.PI * 0 / 12 * (fingerArr[0] / flagValue[0])
        rightHand12.rotation.y = 0.02 - Math.PI * 1 / 12 * (fingerArr[0] / flagValue[0]) < 0.02 - Math.PI * 1 / 12 * (2) ? 0.02 - Math.PI * 1 / 12 * (2) : 0.02 - Math.PI * 1 / 12 * (fingerArr[0] / flagValue[0])
        rightHand12.rotation.z = 0.15 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0]) > 0.15 + Math.PI * 3 / 12 * (2) ? 0.15 + Math.PI * 3 / 12 * (2) : 0.15 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0])

        rightHand13.rotation.x = -0.40 - Math.PI * 0 / 12 * (fingerArr[0] / flagValue[0])
        rightHand13.rotation.y = 0.02 - Math.PI * 0 / 12 * (fingerArr[0] / flagValue[0])
        rightHand13.rotation.z = -0.28 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0]) > -0.28 + Math.PI * 3 / 12 * (2) ? -0.28 + Math.PI * 3 / 12 * (2) : -0.28 + Math.PI * 3 / 12 * (fingerArr[0] / flagValue[0])

      }
      // console.log(rightHand11.rotation.z)

      // 21 [0.12,0.37,1.18] 22[-0.24,-0.01,0] 23 [0.19,0.05,0.06]
      { // 食指
        rightHand21.rotation.x = 0.12 + Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])
        rightHand21.rotation.y = 0.37 + Math.PI * 4 / 12 * (fingerArr[1] / flagValue[1]) > 0.37 + Math.PI * 4 / 12 * (2) ? 0.37 + Math.PI * 4 / 12 * (2) : 0.37 + Math.PI * 4 / 12 * (fingerArr[1] / flagValue[1])
        rightHand21.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])

        rightHand22.rotation.x = -0.24 + Math.PI * 3 / 12 * (fingerArr[1] / flagValue[1]) > -0.24 + Math.PI * 3 / 12 * (2) ? -0.24 + Math.PI * 3 / 12 * (2) : -0.24 + Math.PI * 3 / 12 * (fingerArr[1] / flagValue[1])
        rightHand22.rotation.y = -0.01 + Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])
        rightHand22.rotation.z = 0 + Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])

        rightHand23.rotation.x = 0.19 + Math.PI * 2 / 12 * (fingerArr[1] / flagValue[1]) > 0.19 + Math.PI * 2 / 12 * (2) ? 0.19 + Math.PI * 2 / 12 * (2) : 0.19 + Math.PI * 2 / 12 * (fingerArr[1] / flagValue[1])
        rightHand23.rotation.y = 0.05 - Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])
        rightHand23.rotation.z = 0.06 + Math.PI * 0 / 12 * (fingerArr[1] / flagValue[1])
      }

      // 31 [-0.59,-0.25,1.18] 32[ 0.39,-0.06,-0.25] 33[-0.41,-0.18,0.03]
      {// 中指
        rightHand31.rotation.x = -0.59 + Math.PI * 0 / 12 * (fingerArr[2] / flagValue[2])
        rightHand31.rotation.y = -0.25 + Math.PI * 5 / 12 * (fingerArr[2] / flagValue[2]) > -0.25 + Math.PI * 5 / 12 * (2) ? -0.25 + Math.PI * 5 / 12 * (2) : -0.25 + Math.PI * 5 / 12 * (fingerArr[2] / flagValue[2])
        rightHand31.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[2] / flagValue[2])

        rightHand32.rotation.x = 0.39 + Math.PI * 3 / 12 * (fingerArr[2] / flagValue[2]) > 0.39 + Math.PI * 3 / 12 * (2) ? 0.39 + Math.PI * 3 / 12 * (2) : 0.39 + Math.PI * 3 / 12 * (fingerArr[2] / flagValue[2])
        rightHand32.rotation.y = -0.06 - Math.PI * 1 / 12 * (fingerArr[2] / flagValue[2]) < -0.06 - Math.PI * 1 / 12 * (2) ? -0.06 - Math.PI * 1 / 12 * (2) : -0.06 - Math.PI * 1 / 12 * (fingerArr[2] / flagValue[2])
        rightHand32.rotation.z = -0.25 + Math.PI * 1 / 12 * (fingerArr[2] / flagValue[2]) > -0.25 + Math.PI * 1 / 12 * (2) ? -0.25 + Math.PI * 1 / 12 * (2) : -0.25 + Math.PI * 1 / 12 * (fingerArr[2] / flagValue[2])

        rightHand33.rotation.x = -0.41 + Math.PI * 2 / 12 * (fingerArr[2] / flagValue[2]) > -0.41 + Math.PI * 2 / 12 * (2) ? -0.41 + Math.PI * 2 / 12 * (2) : -0.41 + Math.PI * 2 / 12 * (fingerArr[2] / flagValue[2])
        rightHand33.rotation.y = -0.18 - Math.PI * 0 / 12 * (fingerArr[2] / flagValue[2])
        rightHand33.rotation.z = 0.03 + Math.PI * 0 / 12 * (fingerArr[2] / flagValue[2])
      }

      // 41 [-1.02,0.27,0.10] 42[0.13,-0.05,0.14] 43[-0.05,0.05,0.04]
      // 无名指指
      {
        rightHand41.rotation.x = -1.02 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3]) > -1.02 + Math.PI * 3 / 12 * (2) ? -1.02 + Math.PI * 3 / 12 * (2) : -1.02 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3])
        rightHand41.rotation.y = 0.27 + Math.PI * 0 / 12 * (fingerArr[3] / flagValue[3])
        rightHand41.rotation.z = 0.10 - Math.PI * 2 / 12 * (fingerArr[3] / flagValue[3]) < 0.10 - Math.PI * 2 / 12 * (2) ? 0.10 - Math.PI * 2 / 12 * (2) : 0.10 - Math.PI * 2 / 12 * (fingerArr[3] / flagValue[3])

        rightHand42.rotation.x = 0.13 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3]) > 0.13 + Math.PI * 3 / 12 * (2) ? 0.13 + Math.PI * 3 / 12 * (2) : 0.13 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3])
        rightHand42.rotation.y = -0.05 + Math.PI * 0 / 12 * (fingerArr[3] / flagValue[3])
        rightHand42.rotation.z = 0.14 - Math.PI * 1 / 12 * (fingerArr[3] / flagValue[3]) < 0.14 - Math.PI * 1 / 12 * (2) ? 0.14 - Math.PI * 1 / 12 * (2) : 0.14 - Math.PI * 1 / 12 * (fingerArr[3] / flagValue[3])

        rightHand43.rotation.x = -0.05 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3]) > -0.05 + Math.PI * 3 / 12 * (2) ? -0.05 + Math.PI * 3 / 12 * (2) : -0.05 + Math.PI * 3 / 12 * (fingerArr[3] / flagValue[3])
        rightHand43.rotation.y = 0.05 - Math.PI * 1 / 12 * (fingerArr[3] / flagValue[3]) < 0.05 - Math.PI * 1 / 12 * (2) ? 0.05 - Math.PI * 1 / 12 * (2) : 0.05 - Math.PI * 1 / 12 * (fingerArr[3] / flagValue[3])
        rightHand43.rotation.z = 0.04 - Math.PI * 0 / 12 * (fingerArr[3] / flagValue[3])
      }

      // 51 [-1.41,0.91,0.35] 52[0.24,-0.04,-0.36] 53[-0.16,-0.19,0.18]
      // 小拇指
      {
        rightHand51.rotation.x = -1.41 + Math.PI * 4 / 12 * (fingerArr[4] / flagValue[4]) > -1.41 + Math.PI * 4 / 12 * (2) ? -1.41 + Math.PI * 4 / 12 * (2) : -1.41 + Math.PI * 4 / 12 * (fingerArr[4] / flagValue[4])
        rightHand51.rotation.y = 0.91 - Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4]) < 0.91 - Math.PI * 3 / 12 * (2) ? 0.91 - Math.PI * 3 / 12 * (2) : 0.91 - Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4])
        rightHand51.rotation.z = 0.35 - Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4]) < 0.35 - Math.PI * 3 / 12 * (2) ? 0.35 - Math.PI * 3 / 12 * (2) : 0.35 - Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4])

        rightHand52.rotation.x = 0.24 + Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4]) > 0.24 + Math.PI * 3 / 12 * (2) ? 0.24 + Math.PI * 3 / 12 * (2) : 0.24 + Math.PI * 3 / 12 * (fingerArr[4] / flagValue[4])
        rightHand52.rotation.y = -0.04 + Math.PI * 0 / 12 * (fingerArr[4] / flagValue[4])
        rightHand52.rotation.z = -0.36 + Math.PI * 0 / 12 * (fingerArr[4] / flagValue[4])

        rightHand53.rotation.x = -0.16 + Math.PI * 1 / 12 * (fingerArr[4] / flagValue[4]) > -0.16 + Math.PI * 1 / 12 * (2) ? -0.16 + Math.PI * 1 / 12 * (2) : -0.16 + Math.PI * 1 / 12 * (fingerArr[4] / flagValue[4])
        rightHand53.rotation.y = -0.19 - Math.PI * 0 / 12 * (fingerArr[4] / flagValue[4])
        rightHand53.rotation.z = 0.18 + Math.PI * 0 / 12 * (fingerArr[4] / flagValue[4])

      }

    }
  }
  if (rotationResArr) {

    if (rightHand) {
      rightHand.rotation.x = 3.06 + Math.PI * (1 / 3) - Math.PI * (rotationResArr[2] / 180)
      rightHand.rotation.y = -0.55 - Math.PI - Math.PI * (rotationResArr[1] / 180)
      // rightHand.rotation.z = 0 + Math.PI * 0 / 12 * (fingerArr[4] / flagValue[4])

    }

  }
  oldData = newDate

  // fingerArr = new Array(5).fill(90)
  // 11 [-1.48 ,-0.38 , 2.32]  12 [-0.18,0.02,0.15] 13[-0.40,0.02,-0.28]
  // 编写初始化状态
  if (rightHand12 && false) {
    {
      // rightHand11.rotation.x = -1.48+Math.PI * 2 / 12 * (fingerArr[0] / 40)
      // rightHand12.rotation.z = Math.PI * 2 / 12 * (fingerArr[0] / 40)
      // rightHand12.rotation.y = Math.PI * 1 / 12 * (fingerArr[0] / 40)
      // rightHand13.rotation.z = Math.PI * 2 / 12 * (fingerArr[0] / 40)
      // rightHand13.rotation.y = -Math.PI * 2 / 12 * (fingerArr[0] / 40)
      rightHand11.rotation.x = -1.48 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand11.rotation.y = -0.38 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand11.rotation.z = 2.32 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

      rightHand12.rotation.x = -0.18 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand12.rotation.y = 0.02 - Math.PI * 1 / 12 * (fingerArr[0] / 40)
      rightHand12.rotation.z = 0.15 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

      rightHand13.rotation.x = -0.40 - Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand13.rotation.y = 0.02 - Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand13.rotation.z = -0.28 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

    }


    // 21 [0.12,0.37,1.18] 22[-0.24,-0.01,0] 23 [0.19,0.05,0.06]
    { // 食指
      rightHand21.rotation.x = 0.12 + Math.PI * 0 / 12 * (fingerArr[1] / 40)
      rightHand21.rotation.y = 0.37 + Math.PI * 3 / 12 * (fingerArr[1] / 40)
      rightHand21.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[1] / 40)

      rightHand22.rotation.x = -0.24 + Math.PI * 3 / 12 * (fingerArr[1] / 40)
      rightHand22.rotation.y = -0.01 + Math.PI * 0 / 12 * (fingerArr[1] / 40)
      rightHand22.rotation.z = 0 + Math.PI * 0 / 12 * (fingerArr[1] / 40)

      rightHand23.rotation.x = 0.19 + Math.PI * 2 / 12 * (fingerArr[1] / 40)
      rightHand23.rotation.y = 0.05 - Math.PI * 0 / 12 * (fingerArr[1] / 40)
      rightHand23.rotation.z = 0.06 + Math.PI * 0 / 12 * (fingerArr[1] / 40)
    }

    // 31 [-0.59,-0.25,1.18] 32[ 0.39,-0.06,-0.25] 33[-0.41,-0.18,0.03]
    {// 中指
      rightHand31.rotation.x = -0.59 + (1.11 + 0.59) / 2.25 * (fingerArr[2] / 40)
      rightHand31.rotation.y = -0.25 + (0.45 + 0.25) / 2.25 * (fingerArr[2] / 40)
      rightHand31.rotation.z = 1.18 + (-0.82 - 1.18) / 2.25 * (fingerArr[2] / 40)

      rightHand32.rotation.x = 0.39 + (1.31 - 0.39) / 2 * (fingerArr[2] / 40)
      rightHand32.rotation.y = -0.06 + (-0.45 + 0.06) / 2 * (fingerArr[2] / 40)
      rightHand32.rotation.z = -0.25 + (-0.72 + 0.25) / 2 * (fingerArr[2] / 40)

      rightHand33.rotation.x = -0.41 + (0.11 + 0.41) / 2 * (fingerArr[2] / 40)
      rightHand33.rotation.y = -0.18 + (0.15 + 0.18) / 2 * (fingerArr[2] / 40)
      rightHand33.rotation.z = 0.03 + (-0.22 - 0.03) / 2 * (fingerArr[2] / 40)

    }

    // 41 [-1.02,0.27,0.10] 42[0.13,-0.05,0.14] 43[-0.05,0.05,0.04]
    // 无名指指
    {
      rightHand41.rotation.x = -1.02 + Math.PI * 2 / 12 * (fingerArr[3] / 40)
      rightHand41.rotation.y = 0.27 - Math.PI * 1 / 12 * (fingerArr[3] / 40)
      rightHand41.rotation.z = 0.10 - Math.PI * 2 / 12 * (fingerArr[3] / 40)

      rightHand42.rotation.x = 0.13 + Math.PI * 3 / 12 * (fingerArr[3] / 40)
      rightHand42.rotation.y = -0.05 + Math.PI * 0 / 12 * (fingerArr[3] / 40)
      rightHand42.rotation.z = 0.14 - Math.PI * 1 / 12 * (fingerArr[3] / 40)

      rightHand43.rotation.x = -0.05 + Math.PI * 2 / 12 * (fingerArr[3] / 40)
      rightHand43.rotation.y = 0.05 - Math.PI * 1 / 12 * (fingerArr[3] / 40)
      rightHand43.rotation.z = 0.04 - Math.PI * 0 / 12 * (fingerArr[3] / 40)
    }

    // 51 [-1.41,0.91,0.35] 52[0.24,-0.04,-0.36] 53[-0.16,-0.19,0.18]
    // 小拇指
    {
      rightHand51.rotation.x = -1.41 + Math.PI * 3 / 12 * (fingerArr[4] / 40)
      rightHand51.rotation.y = 0.91 - Math.PI * 3 / 12 * (fingerArr[4] / 40)
      rightHand51.rotation.z = 0.35 - Math.PI * 2 / 12 * (fingerArr[4] / 40)

      rightHand52.rotation.x = 0.24 + Math.PI * 3 / 12 * (fingerArr[4] / 40)
      rightHand52.rotation.y = -0.04 + Math.PI * 0 / 12 * (fingerArr[4] / 40)
      rightHand52.rotation.z = -0.36 + Math.PI * 0 / 12 * (fingerArr[4] / 40)

      rightHand53.rotation.x = -0.16 + Math.PI * 1 / 12 * (fingerArr[4] / 40)
      rightHand53.rotation.y = -0.19 - Math.PI * 0 / 12 * (fingerArr[4] / 40)
      rightHand53.rotation.z = 0.18 + Math.PI * 0 / 12 * (fingerArr[4] / 40)

    }
  }
  if (rightHand11) { }






};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  container = document.getElementById(`canvas1`);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);


  const loader = new FBXLoader();

  loader.load('/model/5.fbx', function (gltf) {
    const hand = gltf

    // scene.add(gltf.scene);
    // 大拇指三个关节
    rightHand = hand.getObjectByName('Bone003')

    rightHand11 = hand.getObjectByName('Bone11')
    rightHand12 = hand.getObjectByName('Bone12')
    rightHand13 = hand.getObjectByName('Bone13')

    // 食指三个关节
    rightHand21 = hand.getObjectByName('Bone21')
    rightHand22 = hand.getObjectByName('Bone22')
    rightHand23 = hand.getObjectByName('Bone23')

    // 中指三个关节
    rightHand31 = hand.getObjectByName('Bone31')
    rightHand32 = hand.getObjectByName('Bone32')
    rightHand33 = hand.getObjectByName('Bone33')

    // 无名指三个关节
    rightHand41 = hand.getObjectByName('Bone41')
    rightHand42 = hand.getObjectByName('Bone42')
    rightHand43 = hand.getObjectByName('Bone43')

    // 小拇指三个关节
    rightHand51 = hand.getObjectByName('Bone51')
    rightHand52 = hand.getObjectByName('Bone52')
    rightHand53 = hand.getObjectByName('Bone53')



    gltf.rotation.x = - Math.PI * 1 / 3;
    gltf.rotation.y = - Math.PI / 6;
    gltf.rotation.z = - Math.PI / 6;
    gltf.position.y = -20;
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

  camera.position.z = 100;

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



}
/**
 * 收到传感器数据转化为模型需要的数据
 * @param {*} res 
 */
function threeAni(res) {
  if (res && res[0] == 1) {
    fingerResArr = [...res]
    const realArr = [fingerResArr[6], fingerResArr[3], fingerResArr[2], fingerResArr[1], fingerResArr[4]]
    // console.log(realArr)
    for (let i = 0; i < realArr.length; i++) {
      newArr[i] = newArr[i] + (realArr[i] - newArr[i]) / 5
      newArr[i] = Math.round(newArr[i] * 100) / 100
    }
    // console.log(fingerArr)
    fingerArr = [...newArr]
    for (let i = 0; i < realArr.length; i++) {
      if (i == 0 || i == 4) {
        fingerArr[i] = fingerArr[i] > 20 ? 20 : fingerArr[i]
      } else {
        fingerArr[i] = fingerArr[i] > 30 ? 30 - 10 : fingerArr[i] - 10
        fingerArr[i] = fingerArr[i] < 10 ? 0 : fingerArr[i]

      }
      fingerArr[i] = Math.round(fingerArr[i] * 100) / 100
    }
  } else {
    rotationResArr = [...res]
    rotatechartArr = [...res]
    for (let i = 1; i < rotationResArr.length; i++) {
      if (rotationResArr[i] - rotationSmoothResArr[i - 1] > 300) {
        rotationResArr[i] = rotationResArr[i] - 360
      }
      if (rotationResArr[i] - rotationSmoothResArr[i - 1] < -300) {
        rotationResArr[i] = rotationResArr[i] + 360
      }
      rotationSmoothResArr[i - 1] = rotationSmoothResArr[i - 1] + (rotationResArr[i] - rotationSmoothResArr[i - 1]) / 10
    }
    rotationResArr = [2, ...rotationSmoothResArr]

  }
}

function initChartsGauge(props) {
  let option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },

    series: [
      {
        min: -180,
        max: 180,
        axisLine: {
          // show :false,
          lineStyle: {
            color: [[1, "#65d4df"]],
          },
        },
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
          width: 60,
          itemStyle: {
            color: {
              x: 1,
              y: 0.8,
              x2: 0,
              y2: 0.3,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0,0,233,0.2)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,0,233,0.4)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        pointer: {
          // 仪表盘指针。
          show: true, // 是否显示指针,默认 true。
          length: "20%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
          width: 5, // 指针宽度,默认 8。
          offsetCenter: [0, "-44%"],
        },
        detail: {
          // valueAnimation: true,
          formatter: "{value}",
          color: "#eee",
          // show : false,
          offsetCenter: [0, 0],
        },
        title: {
          color: "#aaa",
        },
        data: [
          {
            value: props.value,
            name: props.name,
          },
        ],
      },

      {
        name: "Line",
        type: "pie", // 圆圈
        clockWise: false,
        radius: ["25%", "29%"],
        center: [
          // 圆心
          "50%",
          "50%",
        ],
        z: 11,
        tooltip: {
          show: false,
        },
        label: {
          show: false,
        },
        animation: false,
        data: [
          {
            value: 100,
            itemStyle: {
              color: "rgba(0,0,233,0.8)",
            },
          },
        ],
      },
      // {
      //   name: "Line",
      //   type: "pie", // 圆圈
      //   clockWise: false,
      //   radius: ["16%", "22%"],
      //   center: [
      //     // 圆心
      //     "50%",
      //     "50%",
      //   ],
      //   z: 11,
      //   tooltip: {
      //     show: false,
      //   },
      //   label: {
      //     show: false,
      //   },
      //   animation: false,

      //   data: [
      //     {
      //       value: 100,
      //       itemStyle: {
      //         color: {
      //           x: 1,
      //           y: 0.8,
      //           x2: 0,
      //           y2: 0.3,
      //           colorStops: [
      //             {
      //               offset: 0.8,
      //               color: "rgba(0,0,233,0.5)", // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: "rgba(0,0,233,0.8)", // 100% 处的颜色
      //             },
      //           ],
      //           global: false, // 缺省为 false
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  };

  option && props.myChart.setOption(option);

  // window.addEventListener("resize", function () {
  //   props.myChart.resize();
  // });
}


function createPolarGauge() {
  option = {
    angleAxis: {
      show: false,
      max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
      type: 'value',
      startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
      splitLine: {
        show: false //隐藏坐标
      }
    },
    barMaxWidth: 18, //圆环宽度
    radiusAxis: { //隐藏坐标
      show: false,
      type: 'category',
    },
    polar: { //设置圆环位置和大小
      center: ['50%', '50%'],
      radius: '296'
    },
    series: [{
      type: 'bar',
      data: [{ //上层圆环，用于显示真实数据
        value: data.num,
        itemStyle: {
          color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1, //从左到右 0-1
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#CD48AE' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#2CABFC' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
          shadowBlur: 10
        }
      }],
      barGap: '-100%', //柱间距离,用来将上下两层圆环重合
      coordinateSystem: 'polar', //类型，极坐标
      roundCap: true, //顶端圆角
      z: 2 //圆环层级，和zindex相似
    }, { //下层圆环，用于显示最大值
      type: 'bar',
      data: [{
        value: max,
        itemStyle: {
          color: '#265195',
          shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
          shadowBlur: 5,
          shadowOffsetY: 2
        }
      }],
      barGap: '-100%', //柱间距离,用来将上下两层圆环重合
      coordinateSystem: 'polar', //类型，极坐标
      roundCap: true, //顶端圆角
      z: 1 //圆环层级，和zindex相似
    },
    { //仪表盘
      type: 'gauge',
      radius: '95%',
      startAngle: 210, //起始角度，同极坐标
      endAngle: -30, //终止角度，同极坐标
      max: max,
      splitNumber: 5, //分割线个数（除原点外）
      axisLine: { // 坐标轴线
        show: false
      },
      pointer: {
        show: false
      },
      axisLabel: {
        // 坐标轴数字
        textStyle: {
          fontSize: 8,
          color: "#13B5FC"
        },

      },
      axisTick: { // 坐标轴标记
        length: 10,
        lineStyle: {
          color: "#13B5FC"
        }
      },
      splitLine: { // 分隔线
        length: 5,
        lineStyle: {
          width: 1,
        }
      },
      title: { //标题，显示'馆藏量'
        textStyle: {
          color: '#fff',
          shadowColor: '#fff',
          fontSize: 30
        },
        offsetCenter: ["0", '-35%'] //位置偏移
      },
      detail: { //仪表盘数值
        formatter: function (params) {
          var name = data.num.toString()
          var list = ''
          for (var i = 0; i < name.length; i++) {
            list += '{value|' + name[i] + '}' //每个数字用border隔开
            if (i !== name.length - 1) {
              list += '{margin|}' //添加margin值
            }
          }
          return [list]
        },
        offsetCenter: ["0", '5%'],
        rich: { //编辑富文本样式
          value: {
            width: 34,
            height: 42,
            borderColor: '#02A0F0',
            borderWidth: 2,
            borderRadius: 5,
            lineHeight: 1000,
            fontSize: 36,
            padding: [0, 0, 4, 0],
            color: '#fff',
            shadowColor: 'rgb(2,157,239)',
            shadowBlur: 5
          },
          margin: {
            width: 8,
            height: 42,
          }
        }

      },
      data: [{
        value: data.num,
        name: data.name
      }]
    }
    ]
  }
  // timeTick()
}

/**
 * 收到传感器数据将2dcharts数据渲染
 * @param {*} res 
 */
function chartAni(res) {

}

class Canvas extends React.Component {
  constructor() {
    super()
    this.state = {
      handData : []
    }


  }



  componentDidMount() {
    // three
    init()
    animate()
    // const myChart1 = echarts.init(document.getElementById(`myChart1`));
    const myChart2 = echarts.init(document.getElementById(`myChart2`));
    const myChart3 = echarts.init(document.getElementById(`myChart3`));

    const ws = new WebSocket(" ws://192.168.31.217:19999");
    const that = this
    ws.onopen = () => {
      // connection opened
      console.info("connect success");
    };
    let i = 0
    ws.onmessage = (e) => {
      i++
      res = JSON.parse(e.data).data
      threeAni(res)
      // chartAni(res)
      // console.log(rotatechartArr)
      if (i / 10 == 1) {
        // setOption(rotatechartArr[1])
        console.log(111)
        // initChartsGauge({
        //   // yData: [1, 2, 3, 4, 5],
        //   // xData: [],
        //   // index: 0 + 1,
        //   value: rotatechartArr[1],
        //   name: "反应速度",
        //   myChart: myChart1,
        // });
        that.setState({
          handData : fingerArr
        })
        // console.log(that.state.handData)
        initChartsGauge({
          value: rotatechartArr[1],
          name: "综合压力",
          myChart: myChart2,
        });

        initChartsGauge({
          value: rotatechartArr[2],
          name: "稳定程度",
          myChart: myChart3,
        });
        i = 0
      }
    };

    ws.onerror = (e) => {
      // an error occurred
    };
    ws.onclose = (e) => {
      // connection closed
    };
    console.log('componentDidMount')
  }

  render() {
    return (
      <>
        {/* <div style={{position : 'fixed' }}>
        <button onClick={() => {vlauex+=0.1}}>x</button>
        <button onClick={() => {vlauey+=0.1}}>y</button>
        <button onClick={() => {vlauez+=0.1}}>z</button>
        <button onClick={() => {vlauex-=0.1}}>x</button>
        <button onClick={() => {vlauey-=0.1}}>y</button>
        <button onClick={() => {vlauez-=0.1}}>z</button>
        <button onClick={() => {console.log(vlauex,vlauey,vlauez)}}>log</button>
      </div> */}
        <div
          style={{ width: "100%", height: "100%" }}
          id={`canvas1`}
        ></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            color: "#65d4df",
            alignItems: "center",
            position: 'fixed',
            right: 0,
            top: 0,
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {/* <div id="myChart1" style={{ width: 450, height: 450 }}></div> */}
          <div style={{ display: 'flex' }}>
            <div id="myChart2" style={{ width: 400, height: 400 }}></div>
            <div id="myChart3" style={{ width: 400, height: 400 }}></div>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <BarChair arr={this.state.handData} />
          </div>

        </div>

      </>
    )
  }
}

function BarChair(props) {
  const colorArr = ["#dd6a2a", "#e8d551", "#65af68", "#80d0f2", "#94d2dd"];
  const handArr = ["拇指", "食指", "中指", "无名指", "小指"];
  // const colorArr = ["#dd6a2a", "#e8d551", "#65af68", "#80d0f2"];
  // const handArr = ["向左", "向右", "向上", "向下",];
  useEffect(() => {

  },[props.arr])
  return (
    <div style={{ display: "flex", flex: 1, height: "100%", padding: "0 10%" }}>
      {props.arr.map((a, index) => {
        return (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#aaa" }}>{handArr[index]}</span>
            <div
              style={{
                width: "30px",
                backgroundColor: "rgba(101 ,212 ,223,0.1)",
                height: "100%",
                borderRadius: "15px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  transition : 'all 1s',
                  height: `${(a / 20) * 100}%`,
                  backgroundColor: `${colorArr[index]}`,
                  borderRadius: "15px",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Canvas

