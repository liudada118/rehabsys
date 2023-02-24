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
  rightHand53, res, fingerArr = new Array(5).fill(0)

function animate() {
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);

  if (res && res[0] == 1) {
    const realArr = [res[6], res[3], res[2], res[1], res[4]]
   
    for (let i = 0; i < realArr.length; i++) {
      fingerArr[i] = fingerArr[i] + (realArr[i] - fingerArr[i]) / 10
    }

    if (!rightHand12) {// 大拇指
      {
       
        rightHand11.rotation.x = -1.48 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
        rightHand11.rotation.y = -0.38 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
        rightHand11.rotation.z = 2.32 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

        rightHand12.rotation.x = -0.18 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
        rightHand12.rotation.y = 0.02 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
        rightHand12.rotation.z = 0.15 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

        rightHand13.rotation.x = -0.40 - Math.PI * 2 / 12 * (fingerArr[0] / 40)
        rightHand13.rotation.y = 0.02 - Math.PI * 3 / 12 * (fingerArr[0] / 40)
        rightHand13.rotation.z = -0.28 + Math.PI * 2 / 12 * (fingerArr[0] / 40)


      }
     

      // 21 [0.12,0.37,1.18] 22[-0.24,-0.01,0] 23 [0.19,0.05,0.06]
      { // 食指
        rightHand21.rotation.x = 0.12 + Math.PI * 0 / 12 * (fingerArr[1] / 60)
        rightHand21.rotation.y = 0.37 + Math.PI * 4 / 12 * (fingerArr[1] / 60)
        rightHand21.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[1] / 60)

        rightHand22.rotation.x = -0.24 + Math.PI * 3 / 12 * (fingerArr[1] / 60)
        rightHand22.rotation.y = -0.01 + Math.PI * 0 / 12 * (fingerArr[1] / 60)
        rightHand22.rotation.z = 0 + Math.PI * 0 / 12 * (fingerArr[1] / 60)

        rightHand23.rotation.x = 0.19 + Math.PI * 3 / 12 * (fingerArr[1] / 60)
        rightHand23.rotation.y = 0.05 - Math.PI * 0 / 12 * (fingerArr[1] / 60)
        rightHand23.rotation.z = 0.06 + Math.PI * 0 / 12 * (fingerArr[1] / 60)
      }

      // 31 [-0.59,-0.25,1.18] 32[ 0.39,-0.06,-0.25] 33[-0.41,-0.18,0.03]
      {// 中指
        rightHand31.rotation.x = -0.59 + Math.PI * 0 / 12 * (fingerArr[2] / 60)
        rightHand31.rotation.y = -0.25 + Math.PI * 5 / 12 * (fingerArr[2] / 60)
        rightHand31.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[2] / 60)

        rightHand32.rotation.x = 0.39 + Math.PI * 3 / 12 * (fingerArr[2] / 60)
        rightHand32.rotation.y = -0.06 + Math.PI * 0 / 12 * (fingerArr[2] / 60)
        rightHand32.rotation.z = -0.25 + Math.PI * 0 / 12 * (fingerArr[2] / 60)

        rightHand33.rotation.x = -0.41 + Math.PI * 3 / 12 * (fingerArr[2] / 60)
        rightHand33.rotation.y = -0.18 - Math.PI * 0 / 12 * (fingerArr[2] / 60)
        rightHand33.rotation.z = 0.03 + Math.PI * 0 / 12 * (fingerArr[2] / 60)
      }

      // 41 [-1.02,0.27,0.10] 42[0.13,-0.05,0.14] 43[-0.05,0.05,0.04]
      // 无名指指
      {
        rightHand41.rotation.x = -1.02 + Math.PI * 5 / 12 * (fingerArr[3] / 60)
        rightHand41.rotation.y = 0.27 + Math.PI * 0 / 12 * (fingerArr[3] / 60)
        rightHand41.rotation.z = 0.10 - Math.PI * 3 / 12 * (fingerArr[3] / 60)

        rightHand42.rotation.x = 0.13 + Math.PI * 3 / 12 * (fingerArr[3] / 60)
        rightHand42.rotation.y = -0.05 + Math.PI * 0 / 12 * (fingerArr[3] / 60)
        rightHand42.rotation.z = 0.14 - Math.PI * 1 / 12 * (fingerArr[3] / 60)

        rightHand43.rotation.x = -0.05 + Math.PI * 3 / 12 * (fingerArr[3] / 60)
        rightHand43.rotation.y = 0.05 - Math.PI * 0 / 12 * (fingerArr[3] / 60)
        rightHand43.rotation.z = 0.04 - Math.PI * 1 / 12 * (fingerArr[3] / 60)
      }

      // 51 [-1.41,0.91,0.35] 52[0.24,-0.04,-0.36] 53[-0.16,-0.19,0.18]
      // 小拇指
      {
        rightHand51.rotation.x = -1.41 + Math.PI * 6 / 12 * (fingerArr[4] / 40)
        rightHand51.rotation.y = 0.91 - Math.PI * 3 / 12 * (fingerArr[4] / 40)
        rightHand51.rotation.z = 0.35 - Math.PI * 3 / 12 * (fingerArr[4] / 40)

        rightHand52.rotation.x = 0.24 + Math.PI * 3 / 12 * (fingerArr[4] / 40)
        rightHand52.rotation.y = -0.04 + Math.PI * 0 / 12 * (fingerArr[4] / 40)
        rightHand52.rotation.z = -0.36 + Math.PI * 0 / 12 * (fingerArr[4] / 40)

        rightHand53.rotation.x = -0.16 + Math.PI * 3 / 12 * (fingerArr[4] / 40)
        rightHand53.rotation.y = -0.19 - Math.PI * 0 / 12 * (fingerArr[4] / 40)
        rightHand53.rotation.z = 0.18 + Math.PI * 0 / 12 * (fingerArr[4] / 40)

      }
    }
  } else if (res && res[0] == 2) {



  }


  fingerArr = [60]
  // 11 [-1.48 ,-0.38 , 2.32]  12 [-0.18,0.02,0.15] 13[-0.40,0.02,-0.28]
  if (rightHand12) {
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
      rightHand12.rotation.y = 0.02 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand12.rotation.z = 0.15 + Math.PI * 3 / 12 * (fingerArr[0] / 40)

      rightHand13.rotation.x = -0.40 - Math.PI * 2 / 12 * (fingerArr[0] / 40)
      rightHand13.rotation.y = 0.02 - Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand13.rotation.z = -0.28 + Math.PI * 2 / 12 * (fingerArr[0] / 40)

      console.log(-1.48 + Math.PI * 0 / 12 * (fingerArr[0] / 40), rightHand11.rotation)
    }
    // console.log(rightHand11.rotation.z)

    // 21 [0.12,0.37,1.18] 22[-0.24,-0.01,0] 23 [0.19,0.05,0.06]
    { // 食指
      rightHand21.rotation.x = 0.12 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand21.rotation.y = 0.37 + Math.PI * 4 / 12 * (fingerArr[0] / 40)
      rightHand21.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

      rightHand22.rotation.x = -0.24 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand22.rotation.y = -0.01 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand22.rotation.z = 0 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

      rightHand23.rotation.x = 0.19 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand23.rotation.y = 0.05 - Math.PI * 0/ 12 * (fingerArr[0] / 40)
      rightHand23.rotation.z = 0.06 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
    }

    // 31 [-0.59,-0.25,1.18] 32[ 0.39,-0.06,-0.25] 33[-0.41,-0.18,0.03]
    {// 中指
      rightHand31.rotation.x = -0.59 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand31.rotation.y = -0.25 + Math.PI * 5 / 12 * (fingerArr[0] / 40)
      rightHand31.rotation.z = 1.18 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

      rightHand32.rotation.x = 0.39 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand32.rotation.y = -0.06 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand32.rotation.z = -0.25 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

      rightHand33.rotation.x = -0.41 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand33.rotation.y = -0.18 - Math.PI * 0/ 12 * (fingerArr[0] / 40)
      rightHand33.rotation.z = 0.03 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
    }

    // 41 [-1.02,0.27,0.10] 42[0.13,-0.05,0.14] 43[-0.05,0.05,0.04]
    // 无名指指
    {
      rightHand41.rotation.x = -1.02 + Math.PI * 5 / 12 * (fingerArr[0] / 40)
      rightHand41.rotation.y = 0.27 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand41.rotation.z = 0.10 - Math.PI * 3 / 12 * (fingerArr[0] / 40)

      rightHand42.rotation.x = 0.13 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand42.rotation.y = -0.05 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand42.rotation.z = 0.14 - Math.PI * 1 / 12 * (fingerArr[0] / 40)

      rightHand43.rotation.x = -0.05 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand43.rotation.y = 0.05 - Math.PI * 0/ 12 * (fingerArr[0] / 40)
      rightHand43.rotation.z = 0.04 - Math.PI * 1 / 12 * (fingerArr[0] / 40)
    }

    // 51 [-1.41,0.91,0.35] 52[0.24,-0.04,-0.36] 53[-0.16,-0.19,0.18]
    // 小拇指
    {
      rightHand51.rotation.x = -1.41 + Math.PI * 6 / 12 * (fingerArr[0] / 40)
      rightHand51.rotation.y = 0.91 - Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand51.rotation.z = 0.35 - Math.PI * 3 / 12 * (fingerArr[0] / 40)

      rightHand52.rotation.x = 0.24 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand52.rotation.y = -0.04 + Math.PI * 0 / 12 * (fingerArr[0] / 40)
      rightHand52.rotation.z = -0.36 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

      rightHand53.rotation.x = -0.16 + Math.PI * 3 / 12 * (fingerArr[0] / 40)
      rightHand53.rotation.y = -0.19 - Math.PI * 0/ 12 * (fingerArr[0] / 40)
      rightHand53.rotation.z = 0.18 + Math.PI * 0 / 12 * (fingerArr[0] / 40)

    }
  }
  if (rightHand11) { }
  // console.log(rightHand53.rotation)





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

    //  rightHand11.rotation.z = -Math.PI*6/ 6
    // rightHand11.rotation.y = -Math.PI*2/ 6




    // rightHandIndex3 = hand.getObjectByName('mixamorigRightHandIndex3')
    // rightHandIndex4 = hand.getObjectByName('mixamorigRightHandIndex4')
    // mixamorigRightHandMiddle1 = hand.getObjectByName('mixamorigRightHandMiddle1')

    gltf.rotation.x = - Math.PI * 1 / 3
    gltf.rotation.y = - Math.PI / 6
    gltf.rotation.z = - Math.PI / 6
    gltf.position.y = -20
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
  console.log('open')


}



class Canvas extends React.Component {
  constructor() {
    super()

    const ws = new WebSocket(" ws://192.168.31.217:19999");
    ws.onopen = () => {
      // connection opened
      console.info("connect success");
    };

    ws.onmessage = (e) => {
      res = JSON.parse(e.data).data
      // console.log(res)



    };

    ws.onerror = (e) => {
      // an error occurred
    };
    ws.onclose = (e) => {
      // connection closed
    };

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
